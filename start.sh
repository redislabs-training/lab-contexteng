#!/bin/bash

: ${DOMAIN?"Please provide domain in DOMAIN env variable.  This will be the domain used for provisioned vms. For localhost use 'nip.io': 'export DOMAIN=\"nip.io\"'"}
: ${HOSTNAME?"Please provide vm hostname HOSTNAME env variable. For localhost use '127.0.0.1': 'export HOSTNAME=\"127.0.0.1\"'"}

export DOMAIN=$DOMAIN
export HOSTNAME=$HOSTNAME
export HOST_IP=$(hostname -I | awk '{print $1}')

export LITELLM_MASTER_KEY=sk-super-secret-key-for-ps

if [[ -n $VERTEX_SA_KEY ]];
then
  echo $VERTEX_SA_KEY > vertex_sa_in.txt
  cat vertex_sa_in.txt | base64 -d > vertex_sa.json
  if [ $? -ne 0 ]; then
     mv vertex_sa_in.txt vertex_sa.json
  fi
  rm vertex_sa_in.txt
fi

rm -rf ./dist
if [ "$LAB_MODE" = "ws" ]; then
  cp -r ./ws/ ./dist/
  export MATERIALS_PATH=ws
  echo "Copied ./ws to ./dist/"
else
  cp -r ./all/ ./dist/
  export MATERIALS_PATH=university
  echo "Copied ./all to ./dist/"
fi

docker-compose up -d --scale jupyter=0 --scale docs=0

echo "Waiting for litellm to be ready (healthcheck)..."
timeout="${LITELLM_READY_TIMEOUT:-100}"
start_ts=$(date +%s)

while true; do
  if sudo docker exec litellm wget -qO- 'http://localhost:4000/' >/dev/null 2>&1; then
    echo "litellm is ready."
    break
  else
    echo "litellm not ready"
  fi
 
  now_ts=$(date +%s)
  if [ $((now_ts - start_ts)) -ge "$timeout" ]; then
    echo "ERROR: litellm not ready after ${timeout}s" >&2
    exit 1
  fi

  sleep 1
done

sudo docker exec litellm wget 'http://localhost:4000/key/generate' \
--header "Authorization: Bearer $LITELLM_MASTER_KEY" \
--header 'Content-Type: application/json' \
--post-data '{"max_budget":1}'

sudo docker cp litellm:/app/generate .

export LITELLM_API_KEY=$(cat generate | jq '.key' | tr -d '"')

docker-compose up -d jupyter docs

wait $!