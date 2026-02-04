export LAB_MODE=ws
npm run build
cp -r ./doc/ ./dist/client/
cp -r ./dist/ ./ws/
rm -rf ./dist

unset LAB_MODE
npm run build
cp -r ./doc/ ./dist/client/
cp -r ./dist/ ./all/
rm -rf ./dist