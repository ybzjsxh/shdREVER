from flask import Flask, session, redirect, url_for, escape, request, render_template, json
import hashlib
from myLogger import myLogger
from wakeOnLan import wakeOnLan
import sqlite3
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import common

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'jose'  # token

def authenticate(pw):
    hpw = hashlib.md5(pw).hexdigest()
    if hpw == 'a6ec51f044f37104dbef3a539673b78f':
        return hpw
    return False


# 注册JWT
jwt = JWTManager(app)
DEVICES = []

DB = './device.db'


# def dbInit():
#     cx = sqlite3.connect("./device.db")
#     cur = cx.cursor()
#     sql = """CREATE TABLE device (
#         id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
#         ip TEXT NOT NULL,
#         name TEXT NOT NULL,
#         mac TEXT NOT NULL,
#         close INTEGER NOT NULL);
#         """
#     cur.execute(sql)
#     cur.close()

def checkDevice(ip, mac):
    cx = sqlite3.connect(DB)
    cur = cx.cursor()
    sql = 'SELECT ip FROM device WHERE ip = "{0}" AND mac = "{1}"'.format(
        ip, mac)
    cur.execute(sql)
    if cur.fetchall() == []:
        return False
    return True


def checkCloseState(ip, name, mac, close):
    print DEVICES
    if {"ip": ip, "name": name, "mac": mac, "close": close} in DEVICES:
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


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        # if not request.is_json:
        #     return jsonify({"msg": "Missing JSON in request"}), 400
        print(request.data)
        data = (request.get_json())['pass'].encode('utf8')
        print(data)
        # if hpw == '2e2d68cdf956ab08b44a7843b277d371':
        if authenticate(data):
            access_token = create_access_token(auth="auto")
            return jsonify(common.trueReturn(access_token, 'logined')), 200
        return jsonify(common.falseReturn('', 'wrong password')), 403
    return jsonify(common.falseReturn('', 'wrong method')), 403


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
        mac = request.args.get('mac').encode('ascii')
        cx = sqlite3.connect(DB)
        cur = cx.cursor()
        if checkDevice(ip, mac):
            return json.dumps({'code': 500, 'msg': 'device already exist!'})
        else:
            sql = 'INSERT INTO device VALUES (null,"{0}","{1}","{2}",0)'.format(
                ip, name, mac)
            cur.execute(sql)
            cx.commit()
            cur.close()
            cx.close()
            print 'register device: ', name, ip, mac
            myLogger.info('register device: {0} {1} {2}'.format(ip, name, mac))
            return json.dumps({"code": 200, "msg": "register ok"})
    return json.dumps({"code": 500, "msg": 'wrong method'})


# transfer dict into json
def dict_fac(cur, row):
    d = {}
    for index, col in enumerate(cur.description):
        d[col[0]] = row[index]
    return d


@app.route('/getAllDevice')
def getAllDevice():
    if request.method == 'GET':
        # print request.headers.get('User-Agent)
        # print DEVICES
        # myLogger.info(DEVICES)
        cx = sqlite3.connect(DB)
        cx.row_factory = dict_fac
        cur = cx.cursor()
        sql = 'SELECT * FROM device'
        cur.execute(sql)
        DEVICES = cur.fetchall()
        cur.close()
        cx.close()
        return json.dumps({'code': 200, 'msg': 'ok', 'data': DEVICES})


@app.route('/closeDevice')
def closeDevice():
    if request.method == 'GET':
        try:
            ip = request.args.get('ip').encode('ascii')
            name = request.args.get('name').encode('ascii')
            print 'closing device ', name
            if 1:
                cx = sqlite3.connect(DB)
                cur = cx.cursor()
                sql = 'UPDATE device SET close = 1 WHERE ip = "{0}"'.format(ip)
                cur.execute(sql)
                cx.commit()
                cur.close()
                cx.close()
                myLogger.info('closing device: {0}'.format(name))
                return json.dumps({"code": 200, "msg": "ok"})
        except Exception, e:
            myLogger.error(e)
            return json.dumps({"code": 500, "msg": "InternalError"})
    return json.dumps({"code": 500, "msg": 'wrong method'})


@app.route('/closeAll')
def closeAll():
    if request.method == 'GET':
        jwt = get_jwt_identity()
        print(jwt)
        if jwt:
            cx = sqlite3.connect(DB)
            cur = cx.cursor()
            sql = 'UPDATE device SET close = 1'
            cur.execute(sql)
            cx.commit()
            cur.close()
            cx.close()
            myLogger.info('closing all!')
            return jsonify({"code": 200, "msg": "ok"})
        return jsonify(common.falseReturn('', 'need jwt_token'))
    return jsonify(common.falseReturn('', 'wrong method'))


@app.route('/clearDevice')
def clearDevice():
    if request.method == 'GET':
        try:
            ip = request.args.get('ip').encode('ascii')
            name = request.args.get('name').encode('ascii')
            print 'clearing device ', name
            if 1:
                myLogger.info('clearing device: {0}'.format(name))
                cx = sqlite3.connect(DB)
                cur = cx.cursor()
                sql = 'DELETE FROM device where ip = "{0}"'.format(ip)
                cur.execute(sql)
                cx.commit()
                cur.close()
                cx.close()
                return json.dumps({"code": 200, "msg": "ok"})
        except Exception, e:
            myLogger.error(e)
            return json.dumps({"code": 500, "msg": "InternalError"})
    return json.dumps({"code": 500, "msg": 'wrong method'})


@app.route('/checkState')
def checkState():
    if request.method == 'GET':
        ip = request.args.get('ip').encode('ascii')
        name = request.args.get('name').encode('ascii')
        mac = request.args.get('mac').encode('ascii')
        close = request.args.get('close').encode('ascii')

        if not checkCloseState(ip, name, mac, close):
            return json.dumps({"code": 1})
        return json.dumps({"code": 0})  # not exist, shutdown
    return json.dumps({"code": 500, "msg": 'wrong method'})


@app.route('/wakeDevice')
def wakeDevice():
    if request.method == 'GET':
        try:
            ip = request.args.get('ip').encode('ascii')
            name = request.args.get('name').encode('ascii')
            raw_mac = request.args.get('mac').encode('ascii')
            mac = wakeOnLan.format_mac(raw_mac)
            send_data = wakeOnLan.create_magic_packet(mac)
            wakeOnLan.send_magic_packet(send_data)
            cx = sqlite3.connect(DB)
            cur = cx.cursor()
            sql = 'UPDATE device SET close = 0 where ip = "{0}"'.format(ip)
            cur.execute(sql)
            cx.commit()
            cur.close()
            cx.close()
            myLogger.info('waking device {0}'.format(name))
            return json.dumps({"code": 200, "mac": mac})
        except Exception, e:
            print e
            myLogger.error(e)
            return json.dumps({"code": 500, "msg": str(e)})


# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=False)
