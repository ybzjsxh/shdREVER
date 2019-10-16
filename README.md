# shutdown device manager

## front: react

- lib: element-react, axios
- note: should `npm i` first
- toStart: `npm start`

## front_mirrorx: react

- lib: antd
- state_management: mirrorx

## front_umi: react

- lib: antd, umi
- state_management: dva

## back: python ~~2.7~~ 3.6

- lib: flask, flask_jwt_extended
- toStart:
  1. `pip install -r requirements.txt`
  2. `python shutdown.py`

## back_node: nodejs

- lib: koa socket.io
- db: MongoDB

## client: python: 2.7

- buildToEXE: use `PyInstaller`
- note: mind x86 & x64

## client_node: nodejs

- lib: pkg socket.io-client
