FROM alpine:latest

#update and install
RUN apk update; apk upgrade; apk add nodejs npm; 

#copy file from repo
COPY index.js package.json /root/
COPY public/ /root/public/

#install npm packages
RUN cd /root/; npm install;

#start server on startup
EXPOSE 4000
CMD cd /root/; node index.js

