# NTI_CTF_cakeClicker
a clicker game based ctf challenge

## How to run
1. install nodejs
2. run ```npm install``` to install necessary packages
3. (optional) edit index.js change lines 3 and 7 to whatever port you want. Remember you need root access to use port 80.
4. run ```node index.js```.

## Docker deployment
1. clone repo
2. build docker image ```docker build -t cake-clicker:latest .```
3. deploy container ```docker run -d --name cake -p 4000:4000 cake-clicker```