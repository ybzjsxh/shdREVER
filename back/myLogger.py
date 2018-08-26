#!/usr/bin/python
#-*-coding:utf-8-*-
#filename:myLogger.py

import re,logging,logging.handlers

class myLogger:

	@staticmethod
	def needPrint(needPrint):
		myLogger.needPrint = needPrint
		return

	@staticmethod
	def getLogger():
		logger = logging.getLogger()
		logger.setLevel(logging.DEBUG)
		rh = logging.handlers.TimedRotatingFileHandler('./log/net.log','D',1,15) #15days
		logger.addHandler(rh)
		fm = logging.Formatter('[%(asctime)s] %(filename)s-[line:%(lineno)d] %(levelname)s--%(message)s','%Y-%m-%d %H:%M:%S')
		rh.setFormatter(fm)
		return [logger,rh]

	@staticmethod
	def debug(txt):
		mlist = myLogger.getLogger()
		mlist[0].debug(txt)
		if myLogger.needPrint == True:
			print txt
		mlist[0].removeHandler(mlist[1])

	@staticmethod
	def warning(txt):
		mlist = myLogger.getLogger()
		mlist[0].warning(txt)
		if myLogger.needPrint == True:
			print txt
		mlist[0].removeHandler(mlist[1])


	@staticmethod
	def info(txt):
		mlist = myLogger.getLogger()
		mlist[0].info(txt)
		if myLogger.needPrint == True:
			print txt
		mlist[0].removeHandler(mlist[1])

	@staticmethod
	def error(txt):
		mlist = myLogger.getLogger()
		mlist[0].error(txt)
		if myLogger.needPrint == True:
			print txt
		mlist[0].removeHandler(mlist[1])

	@staticmethod
	def critical(txt):
		mlist = myLogger.getLogger()
		mlist[0].critical(txt)
		if myLogger.needPrint == True:
			print txt
		mlist[0].removeHandler(mlist[1])

myLogger.needPrint(False)
if __name__ == '__main__':
	myLogger.needPrint(True)
	myLogger.debug('1')
	myLogger.debug('2')
	myLogger.debug('3')
	myLogger.critical("test")
