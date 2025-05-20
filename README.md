Basically the project follows a specific directory structure.
Basic directory with some relevant nomenclature like "mediaServer" 
mediaServer -> [main.py, venv (virtual environment), public, url.py]
public -> [folderIcon.jpg, index.html, media, script.js]
media -> [all media from user (might be in folders or no folders at all), newAdditions folder]

main.py is the server software, written in python using Flask

venv is the virtual environment necessary for the main.py file to work, as it depends on user added frameworks

url.py is the python program used to connect to the mongodb database and add the name and URI of the media present in the 'media' folder (inside 'public' folder). This is necessary as the frontend queries this directly)

newAdditions is the directory that the user would add new media in HIS/HER WINDOWS MACHINE. The directory is filled IF user adds any content to a folder called 'media' in their downloads folder. 
transfer.py is the python program that uses 'scp' to transfer files from 'toTransfer' folder, to the 'newAdditions' directory.
The above directory structure is just the way I had worked. All the naming conventions and directory structure are ABSTRACT and are perfectly fine to change. The code must be changed with regards to whatever changes were made.
The code in transfer.py has local IP address that was assigned statically using the ROUTER INTERFACE.

redundancyCheck.py is the python program that checks for ALREADY AVAILABLE files in the server and deletes them from the 'media' folder and adds the new ones to the 'toTransfer' folder. 
This folder is acted upon, by the transfer.py which then transfers files from windows -> ubuntu machine, as mentioned earlier.
