### install nodejs, npm, python and require (sudo required, already installed on the server).
`sudo curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -`
`sudo apt-get install nodejs`
`node --version`
`npm --version`

### install react and python requirements.
```
git clone https://github.com/stormliucong/concept-recommeder-react-flask-app
npm install
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## start flask api and react app.
```
npm start
npm run start-api
```

## you can view it in your local browser by creating two SSH tunnels.
```
ssh -L 3000:localhost:3000 username@hostname -N
```
```
ssh -L 5000:localhost:5000 username@hostname -N
```
