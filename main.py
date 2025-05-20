from flask import Flask, send_from_directory, jsonify, request
from pymongo import MongoClient
import os

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["mediaserver"]
collection = db["urldatabase"]
mainPath = "/home/gokula17/mediaServer/"

app = Flask(__name__)
currentFolder = "main"
folderList = []

# Below is for index.html and js
@app.route("/")
def func1():
    return send_from_directory("public","index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory("public", filename)

# Below are actual backend
@app.route("/getcurrentfolder")
def get_current_folder():
    return jsonify(currentFolder)

@app.route('/postcurrentfolder', methods=['POST'])
def receive_folder():
    data = request.get_json()  # Get JSON payload from client
    current_folder = data.get('currentfolder')  # Extract value

    return jsonify({'currentfolder': currentFolder})

@app.route("/folder")
def random_folder():
    folderPath = request.args.get('folderpath')
    folderContentArray = []
    folderContentArray2 = os.listdir(mainPath + f"/{folderPath}")
    for item in folderContentArray2:
        itemPath = os.path.join(folderPath, item)
        if os.path.isdir(itemPath):
            obj = {
                "name": item,
                "type": "folder",
                "url": itemPath
            }
            folderContentArray.append(obj)
        elif os.path.isfile(itemPath):
            _, ext = os.path.splitext(item)
            if ext == ".mp4":
                itemDataBase = collection.find_one({"name": item})
         
                obj = {
                    "name": item,
                    "type": "video",
                    "url": itemDataBase["path"]
                }
                folderContentArray.append(obj)
            if ext == ".jpg":
                itemDataBase = collection.find_one({"name": item})
            
                obj = {
                    "name": item,
                    "type": "image",
                    "url": itemDataBase["path"]
                }
                folderContentArray.append(obj)
            if ext == ".jpeg":
                itemDataBase = collection.find_one({"name": item})
          
                obj = {
                    "name": item,
                    "type": "image",
                    "url": itemDataBase["path"]
                }
            if ext == ".png":
                itemDataBase = collection.find_one({"name": item})
           
                obj = {
                    "name": item,
                    "type": "image",
                    "url": itemDataBase["path"]
                }
    print(folderContentArray)
    return jsonify(folderContentArray)

@app.route("/main")
def func2():
    cwd = os.getcwd()
    folderListArray= os.listdir('public/media')
  
    folderList = []
    for folderName in folderListArray:
        folderList.append({
            "name": folderName,
            "type": "folder",
            "url": f"./media/{folderName}"
        })
    return jsonify(folderList)


if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug= True, port = 3000)
