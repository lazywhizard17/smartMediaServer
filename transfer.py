import subprocess

cmd = [
    'scp',
    '-r',
    r'C:/Users/rybac/Downloads/media/toTransfer', # Could be any custom directory. 
    'gokula17@192.168.29.3:/home/gokula17/mediaServer/public/media/newAdditions/' # Could be any directory in ubuntu system. But it is just agreed upon to be newAdditions
]

result = subprocess.run(cmd, capture_output= True, text= True)

if result.returncode == 0:
    print("SCP successful!")
else:
    print("SCP failed!")
    print("Error output:", result.stderr)
