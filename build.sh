export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install jq -y

# docker-plugin
apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
