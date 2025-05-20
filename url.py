import os
from pymongo import MongoClient

# Connect to MongoDB (default: localhost:27017)
client = MongoClient('mongodb://localhost:27017/')

# Create or switch to 'movieserver' database
db = client['mediaserver']

# Create or switch to 'link' collection
collection = db['urldatabase']

# Path to 'media' folder (make sure this is correct)
base_folder = os.path.join(os.path.dirname(__file__), 'public', 'media')

# Ensure media folder exists
if not os.path.exists(base_folder):
    print(f"Error: Folder {base_folder} does not exist!")
    exit()

# Flag to track if we insert anything
inserted = False

# Walk through all subdirectories and files inside the media folder
for root, dirs, files in os.walk(base_folder):
    for file in files:
        # Build relative path for the file
        full_path = os.path.relpath(os.path.join(root, file), os.path.join(os.path.dirname(__file__), 'public'))

        # Create the document
        document = {
            'name': file,
            'path': f'./{full_path.replace(os.sep, "/")}'  # Normalize path to use forward slashes
        }

        # Insert document into MongoDB (this will create the database)
        collection.insert_one(document)
        print(f"Inserting file: {file}")

        # Set flag to true since we inserted something
        inserted = True

# If no files were inserted, print a message
if not inserted:
    print("No media files were found to insert into MongoDB.")
else:
    print("All media files have been mapped and inserted into MongoDB.")
