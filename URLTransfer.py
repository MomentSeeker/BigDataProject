__author__ = 'Lili'
#coding: utf-8

import urllib2
import urllib
import re
from bs4 import BeautifulSoup


class Spider:
    #初始化方法，定义一些变量
    def __init__(self):
        self.URLFileAddress = 'e:\MapURL.txt'
        self.MyFileAddress = 'e:\MapJsonURL.txt'

    def WritePage(self):
        URLFile = file(self.URLFileAddress,'r')
        #lines = URLFile.readlines()
        MyFile = file(self.MyFileAddress,'w')
        #for line in lines:
        #   self.getPageItems(line,MyFile)
        line = URLFile.readline()
        print line
        while line:
            re_str = '.*?xzq=(.*?)&dkid=(.*?)&x=.*?'
            re_pat = re.compile(re_str,re.S)
            search_ret = re_pat.findall(line)
            if search_ret:
                for item in search_ret:
                    q = item[0]
                    dkid = item[1]
                    #print q
                    #print dkid
                    MapJsonURL = 'http://www.landjs.com/web/getData.aspx?GGDK_GUID='+dkid+'&xzq_dm='+q
                    #print MapJasonURL
            MyFile.write(MapJsonURL+'\n')
            MyFile.flush()
            line = URLFile.readline()
        URLFile.close()
        MyFile.close()


myModel = Spider()
myModel.WritePage()