FROM node:14

COPY ./package.json /myfolder/
WORKDIR /myfolder/
RUN npm install

COPY . /myfolder/

CMD npm start