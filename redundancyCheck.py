import os, shutil
from pymongo import MongoClient

client = MongoClient("mongodb://192.168.29.3:27017/")
db = client["mediaserver"]
collection = db["urldatabase"]



mediaFolderPath = 'C:/Users/rybac/Downloads/media'
os.chdir(mediaFolderPath)
print(os.getcwd())

for file in os.listdir(mediaFolderPath):
    if not os.path.isdir(file):
        filePath = os.path.join(mediaFolderPath, file)
        result = collection.find_one({'name':file})
        if result is None:
            destinationPath = os.path.join(mediaFolderPath, 'toTransfer')
            shutil.move(filePath, destinationPath)
        else:
            print(file + " is already present in the server!")
            os.remove(filePath)
        