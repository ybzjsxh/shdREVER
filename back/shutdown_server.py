from flask import Flask, session, redirect, url_for, escape, request, render_template, json
import hashlib
from myLogger import myLogger

app = Flask(__name__)

devices = []


def checkCloseState(ip):
    print devices
    ret = devices[ip]
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
        devices.append({"ip":address, "name": name, "state": 0})
        return '{"code":1}'


@app.route('/getAllDevice')
def getAllDevice():
    if request.method == 'GET':
        print request.headers.get('User-Agent')
        # print devices
        myLogger.info(devices)
        return json.dumps(devices)


@app.route('/closeDevice')
def closeDevice():
    if request.method == 'GET':
        ip = request.args.get("ip").encode('ascii')
        name = request.args.get("name").encode('ascii')
        print 'close device=' + ip
        print devices
        try:
            devices.remove({"ip":ip,"name":name,"state":0})
        except ValueError, e:
            return json.dumps({'err':{'code': 404,'msg':"device not exist!"}})
        print devices
        return json.dumps('{"code":1}')


@app.route('/closeAll')
def closeAll():
    if request.method == 'GET':
        # for i in devices:
        #     print 'close device='+i
        #     states[i] = 1
        # return '{"code":1}'
        devices = []
        print devices

        return json.dumps(devices)


@app.route('/checkState')
def checkState():
    if request.method == 'GET':
        cip = request.args.get('ip')
        print cip
        if checkCloseState(cip) == False:
            return json.dumps(devices)
        else:
            del devices[cip]
            return '{"code":1"}'

@app.route('/logoutDevice')
def logoutDevice():
    if request.method == 'GET':
        address = request.args.get('ip').encode('ascii')
        name = request.args.get('name').encode('ascii')
        if {"ip": address, "name": name, "state": 0} in devices:
            devices.remove({"ip": address,"name": name, "state": 0})
            return '{code:"1"}'
        return '{code: "0"}'



# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)
