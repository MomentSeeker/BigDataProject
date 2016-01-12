__author__ = 'MissLili'
#coding: utf-8
import pandas as pd
DATA_READY_URL = "/Users/lichaochen/Documents/BigData/landDataset/data_ready.csv"
DATA_URL= "/Users/lichaochen/Documents/BigData/landDataset/dataset.csv"
data = pd.read_csv(DATA_URL, sep='|')
data1 = data[-data['土地自定义编号'.decode('utf-8')].isnull()]
data2 = data1[-(data1['位置X1'.decode('utf-8')]==' ')]
data3 = data2.iloc[:,[0,6,7]]
data3.columns=['id','x','y']
data3.id = data3.id.astype(int)
data3 = data3.set_index('id')
data3.astype(float)
data3.set_index('id')
#plt.scatter(data4.x, data4.y, c='grey')
data4 = data3[(data3.x<123) & (data3.x>114) & (data3.y>30) & (data3.y<40)]
#plt.scatter(data4.x, data4.y, c='grey')
data3.to_csv("/Users/lichaochen/Documents/BigData/landDataset/dataset_ready_xy.csv",sep='|', index=False)