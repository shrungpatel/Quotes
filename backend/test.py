'''
This script is used to test if the the quotes API is reachable and returns data correctly.
'''

import requests

response = requests.get("https://zenquotes.io/api/quotes/keyword=happiness")
print(response.json().pretty())