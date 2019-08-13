import socket
import SocketServer
import urllib
import urllib2
import time
import os
import uuid

svrIp = ''
config = []
url = ''
SVR_PORT = 8888
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) "
                         "Chrome/51.0.2704.103 Safari/537.36"}

print headers


def readConfig():
    f = open("config.txt")
    for line in f:
        config.append(line)
    f.close()


def register(ip, name, mac):
    url = 'http://'+svrIp.strip('\n')+':'+str(SVR_PORT)+'/register?name='+name+'&ip='+ip+'&mac='+mac
    print url
    request = urllib2.Request(url, headers=headers)
    response = urllib2.urlopen(request)


def get_host_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    finally:
        s.close()

    return ip


def get_host_mac():
    try:
        uid = uuid.UUID(int=uuid.getnode()).hex[-12:]
        mac = ':'.join([uid[i:i + 2] for i in range(0, 11, 2)])
        print mac
        return mac
    except Exception, e:
        raise ValueError('Maybe argument error ', e)


def checkState():
    url = 'http://'+svrIp.strip('\n')+':'+str(SVR_PORT)+'/checkState?name='+name+'&ip='+ip+'&mac='+mac
    while True:
        request = urllib2.Request(url, headers=headers)
        response = urllib2.urlopen(request)
        ret = response.read()
        if ret == '{"code": 1}':
            time.sleep(5)
        else:
            print 'shutdown...'
            if 'Windows' in name:
                command = config[2].strip('\n')
                os.popen(command)
            elif 'Linux' in name:
                command = config[3].strip('\r\n')
                os.popen(command)
            else:
                print 'bad name'
            break


if __name__ == "__main__":
    readConfig()
    svrIp = config[0].strip('\n')
    name = config[1].strip('\n')
    ip = get_host_ip()
    mac = get_host_mac()
    register(ip, name, mac)
    time.sleep(3)
    checkState()

