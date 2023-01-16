import json
import requests

data = {'input': 'testing java hadoop ruby scala'}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
response = requests.post('http://localhost:8000/predict', data=json.dumps(data), headers=headers)

print(response.json())