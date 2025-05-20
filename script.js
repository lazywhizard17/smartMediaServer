const body = document.querySelector('body')

let currentFolder = ''
let previousFolder = ''
let currentFolderPath = ''
let previousFolderPath = ''
let mainFolderPath = 'public/media'


let previousFolderArray = []

const getCurrentFolder = function(){
    const request1 = new XMLHttpRequest()
    request1.addEventListener('readystatechange', (e)=>{
        if(e.target.readyState === 4)
        {
            currentFolder = JSON.parse(e.target.response)
            console.log(currentFolder)
            mainFunction()
        }
    })
    request1.open('GET','http://192.168.29.3:3000/getcurrentfolder')
    request1.send()
}

const postCurrentFolder = function(){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', (e) => {
        if (e.target.readyState === 4){
            const response = JSON.parse(e.target.responseText);
            console.log("Server responded:", response);
        }
    });
    xhr.open("POST", "http://192.168.29.3:3000/postcurrentfolder", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ "currentfolder": currentFolder }));
}


const mainFunction = function(){
    postCurrentFolder()

    if(currentFolder!=='main')
    {
        // For previous folder
        if(previousFolderArray[previousFolderArray.length-1]==='main')
        {
            goBackDiv = document.createElement('div')
            goBackDiv.addEventListener('click', ()=>{
                body.innerHTML = ""
                currentFolder = 'main'
                previousFolderArray.pop()
                mainFunction()
            })
            goBackDiv.style.border = '2px solid #aaa';
            goBackDiv.style.borderRadius = '8px';
            goBackDiv.style.padding = '12px';
            goBackDiv.style.backgroundColor = '#fafafa';
            goBackDiv.style.textAlign = 'center';
            goBackDiv.style.cursor = 'pointer';
            goBackDiv.style.transition = '0.2s'; 
            goBackDiv.style.display = 'inline-block'; 
            goBackDiv.style.margin = '10px'; 
            goBackDiv.style.width = '120px'; 
            goBackDiv.style.boxSizing = 'border-box'; 

            goBackDiv.addEventListener('mouseover', function() {
            goBackDiv.style.backgroundColor = '#e6e6e6';
            goBackDiv.style.borderColor = '#777';
            });

            goBackDiv.addEventListener('mouseout', function() {
            goBackDiv.style.backgroundColor = '#fafafa';
            goBackDiv.style.borderColor = '#aaa';
            });

            const img = document.createElement('img');
            img.src = '1.jpg'; 
            img.style.width = '80px';
            img.style.height = '80px';
            img.style.objectFit = 'contain';
            img.style.marginBottom = '8px';

            const p = document.createElement('p');
            p.textContent = "Go back";
            p.style.margin = '0';
            p.style.fontSize = '14px';
            p.style.color = '#333';

            goBackDiv.appendChild(img);
            goBackDiv.appendChild(p);
            body.appendChild(goBackDiv)
            
        }
        else
        {
            goBackDiv = document.createElement('div')
            goBackDiv.textContent = '📁Go Back'
            goBackDiv.addEventListener('click', ()=>{
                currentFolderPath = currentFolderPath.replace(`/${currentFolder}`,"")
                currentFolder = previousFolderArray[previousFolderArray.length - 1]
                body.innerHTML = ""
                previousFolderArray.pop()
                mainFunction()
            })
            body.appendChild(goBackDiv)
        }
        // Actual contents of the clicked folder
        const request1 = new XMLHttpRequest()
        request1.addEventListener('readystatechange', (e)=>{
            if(e.target.readyState === 4)
            {
                const folderContentArray = JSON.parse(e.target.response)
		console.log(typeof(folderContentArray))                
                for(let i = 0; i<folderContentArray.length; i++)
                {

                    const folderContent = folderContentArray[i]
                    if(folderContent.type === "folder")
                    {
                        const folderDiv = document.createElement('div')
                        folderDiv.addEventListener('click', ()=>{
                            body.innerHTML = ""
                            previousFolderArray.push(currentFolder)
                            currentFolder = folderContent.name
                            currentFolderPath = currentFolderPath + `/${currentFolder}`
                            mainFunction()
                        })   
                        folderDiv.style.border = '2px solid #aaa';
                        folderDiv.style.borderRadius = '8px';
                        folderDiv.style.padding = '12px';
                        folderDiv.style.backgroundColor = '#fafafa';
                        folderDiv.style.textAlign = 'center';
                        folderDiv.style.cursor = 'pointer';
                        folderDiv.style.transition = '0.2s'; 
                        folderDiv.style.display = 'inline-block'; 
                        folderDiv.style.margin = '10px'; 
                        folderDiv.style.width = '120px'; 
                        folderDiv.style.boxSizing = 'border-box'; 

                        folderDiv.addEventListener('mouseover', function() {
                        folderDiv.style.backgroundColor = '#e6e6e6';
                        folderDiv.style.borderColor = '#777';
                        });

                        folderDiv.addEventListener('mouseout', function() {
                        folderDiv.style.backgroundColor = '#fafafa';
                        folderDiv.style.borderColor = '#aaa';
                        });

                        const img = document.createElement('img');
                        img.src = '1.jpg'; 
                        img.style.width = '80px';
                        img.style.height = '80px';
                        img.style.objectFit = 'contain';
                        img.style.marginBottom = '8px';

                        const p = document.createElement('p');
                        p.textContent = `${folderContent.name}`;
                        p.style.margin = '0';
                        p.style.fontSize = '14px';
                        p.style.color = '#333';

                        folderDiv.appendChild(img);
                        folderDiv.appendChild(p);
                        body.appendChild(folderDiv)
                    }
                    else if(folderContent.type === "video")
                    {
                        const video = document.createElement('video')
                        video.controls = true
			folderContentURL = folderContent.url
			folderContentURL = folderContentURL.replace("./", "")
                        video.height = '150'
                        video.width = '150'
                        video.src = folderContentURL
                        body.appendChild(video)
                    }
                    else if(folderContent.type === "image")
                    {
                        const imgDiv = document.createElement('img')
			folderContentURL = folderContent.url
			folderContentURL = folderContentURL.replace("./", "")
                        imgDiv.height = "150"
			imgDiv.width = "150"
			imgDiv.src = folderContentURL
                        body.appendChild(imgDiv)
                    }
                    
                }
            }
        })
        request1.open('GET', `http://192.168.29.3:3000/folder?folderpath=${currentFolderPath}`)
        request1.send()
    }
    else if (currentFolder === 'main')
    {
        const request1 = new XMLHttpRequest()
        request1.addEventListener('readystatechange', (e)=>{
            if(e.target.readyState === 4)
            {
                const mainFolderList = JSON.parse(e.target.response)
                for(let i = 0; i<mainFolderList.length; i++)
                {
                    const folder = mainFolderList[i]
                    const folderDiv = document.createElement('div')
                    folderDiv.textContent = `📁${folder.name}`
                    folderDiv.addEventListener('click', ()=>{
                       body.innerHTML = ""
                       previousFolderArray.push('main')
                       currentFolder = folder.name
                       currentFolderPath = mainFolderPath + `/${currentFolder}`
                       mainFunction()
                    })
		    body.appendChild(folderDiv)
                }
            }
        })
        request1.open('GET', 'http://192.168.29.3:3000/main')
        request1.send()
    }
}


getCurrentFolder()
