#coding: utf-8
import pandas as pd
import numpy as np
import MySQLdb
import json
import collections
import datetime
import time
from sklearn.neighbors import NearestNeighbors
from flask import Flask, jsonify, render_template, request

global DATA_XY_URL
global data
DATA_XY_URL ="static/dataset_ready_xy.csv"
data = pd.read_csv(DATA_XY_URL, sep='|')

#输入的list表格以及想要取的name，构成一个类，便于转换为json形式
class Land(object): 
    def __init__(self,name,List):
        self.name = name
        length = len(List)
        self.data = []
        for i in range(0,length):
            self.data.append(List[i])

#输入为经纬度构成的二维列表，返回离输入地点最近的20个土地的简略json信息
def QuryNearLand(QuryXY):   
    data1 = data.set_index('id')
    nbrs = NearestNeighbors(n_neighbors=20, algorithm='ball_tree').fit(data1)
    distances, indices = nbrs.kneighbors(QuryXY)
    #indices[0] 是取第一个点的所有20个邻居，我们应用中替换成我们新选的那个点。
    group1 = indices[0]
    data1 = data1.reset_index()
    datagp1 = data1[data1.index.isin(group1)]
    print datagp1
    dataJson = datagp1.to_json(orient = 'records')
    return dataJson

#根据id查找数据库，获得该土地编号对应土地的交易信息
def QuryMySQL(id):
    try:
        conn = MySQLdb.connect(host='localhost',user='root',passwd='lyx',port=3306,charset='utf8')
        cur = conn.cursor()
        conn.select_db('Query')
        sql = "select * from resultsheet where id="+str(id)
        cur.execute(sql)
        results = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()
        for r in results:
            return r
    except MySQLdb.Error,e:
        print "Mysql Error %d: %s" % (e.args[0], e.args[1])

#计算输入的土地中各种类型土地的数目、初始价和成交价的平均值、最大值、最小值和方差，并以json形式输出
def CountSatistic(LandList):
    CommericalLandAmount = 0   #商住土地的数量初始化
    IndustryLandAmount = 0
    ResidentLandAmount = 0
    OthersLandAmount = 0
    CommericalBidList = []     #商住土地招标公告列表初始化
    CommericalDealList = []    #商住土地结果公告列表初始化
    IndustryBidList = []
    IndustryDealList = []
    ResidentBidList = []
    ResidentDealList = []
    OthersBidList = []
    OthersDealList = []
    AmountList = []    #各类土地数量列表初始化
    BidMeanList = []
    BidMaxList = []
    BidMinList = []
    BidVarList = []
    DealMeanList = []
    DealMaxList = []
    DealMinList = []
    DealVarList = []
    length = len(LandList)
    for i in range(0,length):
        if LandList[i][12] == ur'商住':
            CommericalBidList.append(float(LandList[i][15]))
            CommericalDealList.append(float(LandList[i][17]))
            CommericalLandAmount += 1
        elif LandList[i][12] == ur'工业':
            IndustryBidList.append(float(LandList[i][15]))
            IndustryDealList.append(float(LandList[i][17]))
            IndustryLandAmount += 1
        elif LandList[i][12] == ur'住宅':
            ResidentBidList.append(float(LandList[i][15]))
            ResidentDealList.append(float(LandList[i][17]))
            ResidentLandAmount += 1
        else:
            OthersBidList.append(float(LandList[i][15]))
            OthersDealList.append(float(LandList[i][17]))
            OthersLandAmount += 1
    AmountList.append(CommericalLandAmount)
    AmountList.append(IndustryLandAmount)
    AmountList.append(ResidentLandAmount)
    AmountList.append(OthersLandAmount)
    if CommericalLandAmount == 0:
        BidMeanList.append(0)
        BidMaxList.append(0)
        BidMinList.append(0)
        BidVarList.append(0)
        DealMeanList.append(0)
        DealMaxList.append(0)
        DealMinList.append(0)
        DealVarList.append(0)
    else:
        CommericalBidarr = np.array(CommericalBidList)
        CommericalDealarr = np.array(CommericalDealList)
        BidMeanList.append(np.mean(CommericalBidarr))
        DealMeanList.append(np.mean(CommericalDealarr))
        BidMaxList.append(np.max(CommericalBidarr))
        DealMaxList.append(np.max(CommericalDealarr))
        BidMinList.append(np.min(CommericalBidarr))
        DealMinList.append(np.min(CommericalDealarr))
        BidVarList.append(np.var(CommericalBidarr))
        DealVarList.append(np.var(CommericalDealarr))
    if IndustryLandAmount == 0:
        BidMeanList.append(0)
        BidMaxList.append(0)
        BidMinList.append(0)
        BidVarList.append(0)
        DealMeanList.append(0)
        DealMaxList.append(0)
        DealMinList.append(0)
        DealVarList.append(0)
    else:
        IndustryBidarr = np.array(IndustryBidList)
        IndustryDealarr = np.array(IndustryDealList)
        BidMeanList.append(np.mean(IndustryBidarr))
        DealMeanList.append(np.mean(IndustryDealarr))
        BidMaxList.append(np.max(IndustryBidarr))
        DealMaxList.append(np.max(IndustryDealarr))
        BidMinList.append(np.min(IndustryBidarr))
        DealMinList.append(np.min(IndustryDealarr))
        BidVarList.append(np.var(IndustryBidarr))
        DealVarList.append(np.var(IndustryDealarr))
    if ResidentLandAmount == 0:
        BidMeanList.append(0)
        BidMaxList.append(0)
        BidMinList.append(0)
        BidVarList.append(0)
        DealMeanList.append(0)
        DealMaxList.append(0)
        DealMinList.append(0)
        DealVarList.append(0)
    else:
        ResidentBidarr = np.array(ResidentBidList)
        ResidentDealarr = np.array(ResidentDealList)
        BidMeanList.append(np.mean(ResidentBidarr))
        DealMeanList.append(np.mean(ResidentDealarr))
        BidMaxList.append(np.max(ResidentBidarr))
        DealMaxList.append(np.max(ResidentDealarr))
        BidMinList.append(np.min(ResidentBidarr))
        DealMinList.append(np.min(ResidentDealarr))
        BidVarList.append(np.var(ResidentBidarr))
        DealVarList.append(np.var(ResidentDealarr))
    if OthersLandAmount == 0:
        BidMeanList.append(0)
        BidMaxList.append(0)
        BidMinList.append(0)
        BidVarList.append(0)
        DealMeanList.append(0)
        DealMaxList.append(0)
        DealMinList.append(0)
        DealVarList.append(0)
    else:
        OthersBidarr = np.array(OthersBidList)
        OthersDealarr = np.array(OthersDealList)
        BidMeanList.append(np.mean(OthersBidarr))
        DealMeanList.append(np.mean(OthersDealarr))
        BidMaxList.append(np.max(OthersBidarr))
        DealMaxList.append(np.max(OthersDealarr))
        BidMinList.append(np.min(OthersBidarr))
        DealMinList.append(np.min(OthersDealarr))
        BidVarList.append(np.var(OthersBidarr))
        DealVarList.append(np.var(OthersDealarr))

    AmountClass = Land('Amount',AmountList)
    AmountJson = json.dumps(AmountClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    BidMeanClass = Land('BidMean',BidMeanList)
    BidMeanJson = json.dumps(BidMeanClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    BidMaxClass = Land('BidMax',BidMaxList)
    BidMaxJson = json.dumps(BidMaxClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    BidMinClass = Land('BidMin',BidMinList)
    BidMinJson = json.dumps(BidMinClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    BidVarClass = Land('BidVar',BidVarList)
    BidVarJson = json.dumps(BidVarClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    DealMeanClass = Land('DealMean',DealMeanList)
    DealMeanJson = json.dumps(DealMeanClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    DealMaxClass = Land('DealMax',DealMaxList)
    DealMaxJson = json.dumps(DealMaxClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    DealMinClass = Land('DealMin',DealMinList)
    DealMinJson = json.dumps(DealMinClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    DealVarClass = Land('DealVar',DealVarList)
    DealVarJson = json.dumps(DealVarClass, ensure_ascii=False,encoding='utf-8',default=lambda obj: obj.__dict__)
    LandSatisticList = '['+AmountJson+','+BidMeanJson+','+BidMaxJson+','+BidMinJson+','+BidVarJson+','+DealMeanJson+','+DealMaxJson+','+DealMinJson+','+DealVarJson+']'
    #LandSatisticJson = json.loads(LandSatisticList)
    return LandSatisticList

def getScatterResult (LandJson):
    CommerceList = []
    IndustryList = []
    ResidentList = []
    OthersList = []
    length = len(LandJson)
    Json = json.loads(LandJson)
    for OneLand in Json:
        # str = '2012/11/19'
        deal_time1_str = str(OneLand['deal_time1'])
        size = float(OneLand['size'])
        deal_price_average = float(OneLand['deal_price_average'])
        # ［日期，每平方米价格，总面积］
        land = [deal_time1_str, deal_price_average, size]
        if OneLand['purpose'] == ur'商住':
            CommerceList.append(land)
        elif OneLand['purpose'] == ur'工业':
            IndustryList.append(land)
        elif OneLand['purpose'] == ur'住宅':
            ResidentList.append(land)
        else:
            OthersList.append(land)
        categary = collections.OrderedDict()
        categary["commerce"] = CommerceList
        categary["industry"] = IndustryList
        categary["house"] = ResidentList
        categary["others"] = OthersList
        json_str = json.dumps(categary, ensure_ascii=False, encoding='utf-8')
        #json_obj = json.loads(json_str)
    return json_str

def ColorList(LandInform):
    # TargetColorList中的颜色配置分别为商住、工业、住宅、其他
    TargetColorList = ['rgba(155,202,99,1)','rgba(155,202,99,0.5)','rgba(96,192,221,1)','rgba(96,192,221,0.5)','rgba(243,164,59,1)','rgba(243,164,59,0.5)','rgba(252,206,16,1)','rgba(252,206,16,0.5)']
    BidPriceColorList = []
    DealPriceColorList = []
    LandJson = json.loads(LandInform)
    for OneLand in LandJson:
        if OneLand['purpose'] == ur'商住':
            BidPriceColorList.append(TargetColorList[0])
            DealPriceColorList.append(TargetColorList[1])
        elif OneLand['purpose'] == ur'工业':
            BidPriceColorList.append(TargetColorList[2])
            DealPriceColorList.append(TargetColorList[3])
        elif OneLand['purpose'] == ur'住宅':
            BidPriceColorList.append(TargetColorList[4])
            DealPriceColorList.append(TargetColorList[5])
        else:
            BidPriceColorList.append(TargetColorList[6])
            DealPriceColorList.append(TargetColorList[7])
    #print BidPriceColorList
    BidPriceColor = Land('BidPriceColor',BidPriceColorList)
    BidPriceColorJson = json.dumps(BidPriceColor ,default=lambda obj: obj.__dict__)
    DealPriceColor = Land('DealPriceColor',DealPriceColorList)
    DealPriceColorJson = json.dumps(DealPriceColor ,default=lambda obj: obj.__dict__)
    ColorJson = '['+BidPriceColorJson+','+DealPriceColorJson+']'
    return ColorJson

#输入经纬度，返回20个地块的信息json和统计值json
def QueryXYNearLand(PositionX,PositionY):
    PositionArry = np.array([PositionX,PositionY])
    NearLand = QuryNearLand(PositionArry)
    NearLandDict = json.loads(NearLand)
    NearLandList = []
    for i in range(0,20):
        id = NearLandDict[i]['id']
        OneLand = QuryMySQL(id)
        NearLandList.append(OneLand)
    NearLandDF = pd.DataFrame(NearLandList,columns=['id','land_id','notice_id','land_name','region','location','X1','Y1','X2','Y2','size','deal_type','purpose','rent_period','bid_price','bid_price_average','deal_price','deal_price_average','notice_time1','notice_time2','deal_time','deal_time1','bid_company_id','bid_company','condition','deposit','bid_extent','bid_extent1','bid_extent2','bid_type','FAR','FR','density','inv_strengh','map_url','notice_url'])
    #print NearLandDF
    dataJson = NearLandDF.to_json(orient = 'records')
    LandSatisticJson = CountSatistic(NearLandList)
    json_obj = json.loads(dataJson)
    LandDataJson = json.dumps(json_obj,ensure_ascii=False)
    #print type(LandDataJson)
    ScatterResult = getScatterResult(LandDataJson)
    ColorJson = ColorList(LandDataJson)
    return dataJson,LandSatisticJson,ScatterResult,ColorJson
#dataJson,LandSatisticJson,ScatterResult,BidPriceColorList,DealPriceColorList = QueryXYNearLand(118.804586,32.093429)
#print ScatterResult
#print BidPriceColorList,DealPriceColorList

#dataJson,LandSatisticJson = QueryXYNearLand(110,50)
#Scatter,Bar= QueryPicture(110,50)
#print dataJson
#print LandSatisticJson
#print Scatter
#print Bar

app = Flask(__name__)

@app.route('/hello')
def hello():
    return 'hello world!'

#接收地图数据并传输数据
@app.route('/_add_data')
def add_data():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    A = np.array([a,b])
    NearLand = QuryNearLand(A)
    return NearLand

#接收土地用地类型分析图数据并传输数据
@app.route('/_add_line')
def add_line():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    dataJson,LandSatisticJson,ScatterResult,ColorJson = QueryXYNearLand(a,b)
    print LandSatisticJson
    return LandSatisticJson

@app.route('/_add_all')
def add_all():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    dataJson,LandSatisticJson,ScatterResult,ColorJson= QueryXYNearLand(a,b)
    return dataJson

@app.route('/_add_scatter')
def add_scatter():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    dataJson,LandSatisticJson,ScatterResult,ColorJson = QueryXYNearLand(a,b)
    print ScatterResult
    return ScatterResult

@app.route('/_add_bar')
def add_bar():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    dataJson,LandSatisticJson,ScatterResult,ColorJson = QueryXYNearLand(a,b)
    return ColorJson

@app.route('/')
#加载主页面
def index():
    return render_template('map.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port = 8080)    #host='0.0.0.0',port = 8080)
    app.debug = True
