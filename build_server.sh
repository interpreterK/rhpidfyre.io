#!/bin/bash

#if your on Linux,
#sudo chmod +x build_server.sh

#start a local server and debug the browser production versions

cd ./src/
npm run build
cd ../

mv -f ./src/dist ./buildsrc
cd ./buildsrc

# firefox http://localhost:5173/dist/index.html &
# chromium http://localhost:5173/dist/index.html &
npm run dev

wait