import socket
import SocketServer
import urllib
import urllib2
import time
import os

svrIp = ''
config = []
url = ''
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"}


def readConfig():
    f = open("config.txt")
    for line in f:
        config.append(line)
    f.close()


def register(myip, name):
    url = 'http://'+svrIp.strip('\n')+':8888/register?name='+name+'&ip='+myip
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


def checkState():
    url = 'http://'+svrIp.strip('\n')+':8888/checkState?name='+name+'&ip='+myip
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
    myip = get_host_ip()
    register(myip, name)
    time.sleep(3)
    checkState()

