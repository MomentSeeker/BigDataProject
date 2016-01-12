__author__ = 'Lili'
#coding: utf-8
import urllib2
import urllib
import re
import xlrd
import xlwt
import json
import time
import socket
import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )

#向表格SheetName中输入一行数据，DataList为[]形式
def WriteExcelOneRow(ExcelFile,SheetName,DataList,RowNum):
    ColumnIndex = 0
    style = xlwt.XFStyle()
    font = xlwt.Font()
    font.name = 'SimSun'    # 指定“宋体”
    style.font = font
    for element in DataList:
        SheetName.write(RowNum,ColumnIndex,str(element).decode("UTF-8"))
        ColumnIndex += 1
    ExcelFile.save("e:/LandXY.xls")

class Spider:
    #初始化方法，定义一些变量
    def __init__(self):
        self.URLFileAddress = 'e:\MapJsonURL.txt'
        self.ExcelFile = xlwt.Workbook()
        self.Sheet = self.ExcelFile.add_sheet("Sheet")
    #传入某一页的索引获得页面代码
    def getPage(self,url):
        timeout = 10
        try :
            socket.setdefaulttimeout(timeout)#这里对整个socket层设置超时时间。后续文件中如果再使用到socket，不必再设置
            request = urllib2.urlopen(url)   #这里是要读取内容的url
            content = request.read().replace("\r\n","").replace("\\","")               #读取，一般会在这里报异常
            request.close()
            return content
        except urllib2.URLError,reason :
            return None
        except urllib2.HTTPError,code :
            return None
        except socket.error:
            return None
        except:
            return None
    #输入结果公告的地址，查询相关信息，写入到MyFile文件中，并查询是否有招标公告的链接，返回链接地址
    def getPageItems(self,url,RowIndex):
        MapJson = self.getPage(url)
        #print MapJson.decode("utf-8")
        if MapJson == None:
            ResultInformation = [' ',' ']
        elif MapJson == '':
            ResultInformation = [' ',' ']
        else:
            geo_info= json.loads(MapJson)         
            try:
                pointX = geo_info['pointList'][0]['x']
                if pointX == None:
                    pointX = ' '
            except:
                pointX = ' '
            try:
                pointY = geo_info['pointList'][0]['y']
                if pointY == None:
                    pointY = ' '
            except:
                pointY = ' '
            #print pointX
            #print pointY
            ResultInformation = [pointX,pointY]
        #print ResultInformation
        WriteExcelOneRow(self.ExcelFile,self.Sheet,ResultInformation,RowIndex)

    #类的入口函数
    def start(self):
        URLFile = file(self.URLFileAddress,'r')
        Title = ['位置X1','位置Y1']
        WriteExcelOneRow(self.ExcelFile,self.Sheet,Title,0)
        try:
            line = URLFile.readline()
            RowIndex = 1
            while line:
                self.getPageItems(line,RowIndex)
                RowIndex += 1
                line = URLFile.readline()
                print RowIndex
        finally:
            URLFile.close()
            self.ExcelFile.save("e:/LandXY.xls")

myModel = Spider()
myModel.start()