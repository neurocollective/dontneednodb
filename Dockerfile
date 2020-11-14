FROM node:12

COPY index.js .
COPY data_model ./data_model/

RUN apt-get update -y && apt-get install build-essential -y --no-install-recommends && make install && apt-get uninstall build-essential -y 

CMD ["node", "index.js"]