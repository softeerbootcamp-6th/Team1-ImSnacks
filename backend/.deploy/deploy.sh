#!/bin/bash

set -e

ERR_MSG=''

trap 'echo "Error occured: $ERR_MSG. Exiting deploy script."; exit 1' ERR

if sudo docker ps --filter "name=nyeoreumnagi-blue" --quiet | grep -E .; then
  RUN_TARGET="nyeoreumnagi-green"
  STOP_TARGET="nyeoreumnagi-blue"
  WAS_RUN_PORT=8081
  WAS_STOP_PORT=8080
else
  RUN_TARGET="nyeoreumnagi-blue"
  STOP_TARGET="nyeoreumnagi-green"
  WAS_RUN_PORT=8080
  WAS_STOP_PORT=8081
fi

echo "The $STOP_TARGET version is currently running on the server. Starting the $RUN_TARGET version."

DOCKER_COMPOSE_FILE="$RUN_TARGET-deploy.yml"
sudo docker-compose -f "$DOCKER_COMPOSE_FILE" pull || { ERR_MSG='Failed to pull docker image'; exit 1; }
sudo docker-compose -f "$DOCKER_COMPOSE_FILE" up -d || { ERR_MSG='Failed to start docker image'; exit 1; }
sleep 50

NGINX_ID=$(sudo docker ps --filter "name=nginx" --quiet)
NGINX_CONFIG="/etc/nginx/conf.d/default.conf"

sudo docker exec $NGINX_ID /bin/bash -c "sed -i 's/$STOP_TARGET:8080/$RUN_TARGET:8080/' $NGINX_CONFIG"
sudo docker exec $NGINX_ID /bin/bash -c "nginx -s reload" || { ERR_MSG='Failed to reload nginx'; exit 1; }

echo "Terminating the $STOP_TARGET applications."

STOP_CONTAINER_ID=$(sudo docker ps --filter "name=$STOP_TARGET" --quiet)
if [ -n "$STOP_CONTAINER_ID" ]; then
  sudo docker stop $STOP_CONTAINER_ID
  sudo docker rm $STOP_CONTAINER_ID
  sudo docker system prune -a
fi

rm .env

echo "Deployment success."
exit 0