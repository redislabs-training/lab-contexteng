#!/bin/bash

: ${DOMAIN?"Please provide domain in DOMAIN env variable. For localhost use 'nip.io': 'export DOMAIN=\"nip.io\"'"}
: ${HOSTNAME?"Please provide vm hostname HOSTNAME env variable. For localhost use '127.0.0.1': 'export HOSTNAME=\"127.0.0.1\"'"}
: ${GENAI_WKSHP_OPENAI_API_KEY?"Please provide GENAI_WKSHP_OPENAI_API_KEY env variable with your OpenAI API key"}

export DOMAIN=$DOMAIN
export HOSTNAME=$HOSTNAME
export HOST_IP=$(hostname -I | awk '{print $1}')
export LITELLM_MASTER_KEY=sk-super-secret-key-for-ps
export GENAI_WKSHP_OPENAI_API_KEY=$GENAI_WKSHP_OPENAI_API_KEY

# Handle Vertex SA key if provided
if [[ -n $VERTEX_SA_KEY ]]; then
  echo $VERTEX_SA_KEY > vertex_sa_in.txt
  cat vertex_sa_in.txt | base64 -d > vertex_sa.json
  if [ $? -ne 0 ]; then
     mv vertex_sa_in.txt vertex_sa.json
  fi
  rm vertex_sa_in.txt
fi

# Start containers
docker-compose up -d

echo "Waiting for litellm to be ready..."
timeout="${LITELLM_READY_TIMEOUT:-100}"
start_ts=$(date +%s)

while true; do
  if sudo docker exec litellm wget -qO- 'http://localhost:4000/' >/dev/null 2>&1; then
    echo "litellm is ready."
    break
  else
    echo "litellm not ready yet..."
  fi
 
  now_ts=$(date +%s)
  if [ $((now_ts - start_ts)) -ge "$timeout" ]; then
    echo "ERROR: litellm not ready after ${timeout}s" >&2
    exit 1
  fi

  sleep 2
done

echo "All services started. Access the page at http://${HOSTNAME}"