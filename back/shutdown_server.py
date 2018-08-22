from flask import Flask, session, redirect, url_for, escape, request, render_template, json
import hashlib

app = Flask(__name__)

devices = {}
states = {}


def checkCloseState(ip):
    ret = states[ip]
    if ret == 0:
        return False
    return True


@app.route('/')
@app.route('/index')
def index():
    if request.method == 'GET':
        # if 'username' in session:
        #     return 'Logged in as %s' % escape(session['username'])
        # return 'You are not logged in'
        return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # print json.loads(request.data)
        data = json.loads(request.data)
        hpw = hashlib.md5(data['pass']).hexdigest()
        if hpw == '2e2d68cdf956ab08b44a7843b277d371':
            session['password'] = data['pass']
            return '{"code":1}'
        return 'wrong password'
    return 'get is the method'


@app.route('/logout')
def logout():
    if request.method == 'GET':
        # remove the username from the session if it's there
        session.pop('password', None)
        return '{"code":0}'


@app.route('/register')
def register():
    if request.method == 'GET':
        name = request.args.get('name').encode('ascii')
        address = request.args.get('ip').encode('ascii')
        print name, address
        devices[address] = name
        states[address] = 0
        print devices
        return '{"code":1}'


@app.route('/getAllDevice')
def getAllDevice():
    if request.method == 'GET':
        request.headers.set("content-type", "text/plain")
        return devices


@app.route('/closeDevice')
def closeDevice():
    if request.method == 'GET':
        address = request.args.get("ip").encode('ascii')
        print 'close device='+address
        return '{"code":1}'


@app.route('/closeAll')
def closeAll():
    if request.method == 'GET':
        for i in devices:
            print 'close device='+i
            states[i] = 1
        return '{"code":1}'


@app.route('/checkState')
def checkState():
    if request.method == 'GET':
        cip = request.args.get('ip')
        print cip
        if checkCloseState(cip) == False:
            return '{"code":0}'
        else:
            del devices[cip]
            return '{"code":1"}'


# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)
