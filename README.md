- front: react
  - lib: element-react, axios
  - note: should `npm i` first
  - toStart: `npm start`
- back: python: 2.7
  - lib: flask
  - toStart:
    1. `pip install -r requirements.txt`
    2. `python shutdown.py`
- client: python: 2.7
  - buildToEXE: use `PyInstaller`
  - note: mind x86 & x64