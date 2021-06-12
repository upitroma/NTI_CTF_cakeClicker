FROM alpine:latest
RUN apk update; apk upgrade; apk add nodejs npm; 
COPY index.js package.json /root/
COPY public/ /root/public/
RUN cd /root/; npm install;
EXPOSE 4000
CMD cd /root/; node index.js

