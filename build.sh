apt-get update
apt-get install jq -y

# docker-plgin
apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

apt install npm -y
npm install -g n
n stable

export PATH="$PATH"
npm install

bash create_dist.sh

