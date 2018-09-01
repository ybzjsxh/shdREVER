from flask import Flask, session, redirect, url_for, escape, request, render_template, json
import hashlib
from myLogger import myLogger

app = Flask(__name__)

DEVICES = []


def checkCloseState(ip, name):
    print DEVICES
    if {"ip": ip, "name": name} in DEVICES:
        return False  # exist do not shutdown
    return True  # not exist


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
            return '{"code": 200, "msg": "logined"}'
        return 'wrong password'
    return 'get is the method'


@app.route('/logout')
def logout():
    if request.method == 'GET':
        # remove the username from the session if it's there
        session.pop('pass', None)
        return redirect(url_for('index'))


@app.route('/register')
def register():
    if request.method == 'GET':
        name = request.args.get('name').encode('ascii')
        ip = request.args.get('ip').encode('ascii')
        if {"ip": ip, "name": name} in DEVICES:
            return json.dumps({'code': 500, 'msg': 'device already exist!'})
        else:
            print 'register device: ', name, ip
            myLogger.info('register device: {0} {1}'.format(ip, name))
            DEVICES.append({"ip": ip, "name": name})
            return '{"code": 200, "msg": "register ok"}'


@app.route('/getAllDevice')
def getAllDevice():
    if request.method == 'GET':
        # print request.headers.get('User-Agent)
        # print DEVICES
        # myLogger.info(DEVICES)
        return json.dumps(DEVICES)


@app.route('/closeDevice')
def closeDevice():
    if request.method == 'GET':
        try:
            index = int(request.args.get('index').encode('ascii'))
            print 'closing device at', index
            if DEVICES[index]:
                myLogger.info('closing device: {0}'.format(DEVICES[index]))
                del DEVICES[index]
                return '{"code": 200}'
        except Exception, e:
            myLogger.error(e)
            return '{"code": 500, "msg": "InternalError"}'


@app.route('/closeAll')
def closeAll():
    if request.method == 'GET':
        if DEVICES != []:
            del DEVICES[:]
            myLogger.info('closing all!')
            return '{"code": 200}'
        return json.dumps({'code': 503, 'msg': 'no device yet'})


@app.route('/checkState')
def checkState():
    if request.method == 'GET':
        ip = request.args.get('ip').encode('ascii')
        name = request.args.get('name').encode('ascii')

        if checkCloseState(ip, name) == False:
            return '{"code": 1}'
        return '{"code": 0}'  # not exist, shutdown


# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=False)