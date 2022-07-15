import requests
import json
import sys
from flask import Flask, render_template, request, Response, redirect, url_for, make_response
import socket, random
import time
import requests

from downloader import GetDownloadOptions

SERVER_IP = "0.0.0.0"
PORT = 8000

app = Flask(__name__) 

urlxxx = "https://rr2---sn-apo3uxaxjvh03g-3c2e.googlevideo.com/videoplayback?expire=1657850110&ei=nnTQYumMIcWBpASgp4f4Bw&ip=188.239.111.186&id=o-ADUGisLRFgS66qpUd63141kjlSWTX2d8PKT44ClrpRfh&itag=22&source=youtube&requiressl=yes&mh=ZE&mm=31%2C29&mn=sn-apo3uxaxjvh03g-3c2e%2Csn-3c27snel&ms=au%2Crdu&mv=m&mvi=2&pl=23&initcwndbps=968750&spc=lT-Khl1PxjwBiM6m8G2RPagVyQlbcWw&vprv=1&mime=video%2Fmp4&ns=IKUhusG4hGM8rye5-ZTdkP8H&cnr=14&ratebypass=yes&dur=126.525&lmt=1508595610405642&mt=1657828151&fvip=18&fexp=24001373%2C24007246&c=WEB&rbqsm=fr&n=TlGT5TOngEmt7w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMkx-GqI20FlC3zYSxhlxwwKN9S9ryy2PsWDo6CPy5A0AiBxWgV4mNRLZf5aITeITXhZGeGkRA5QEj4tRd4ZqFLapw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgJLDLIi0I2X5LKCd0Zd7z6HQYzZikCU61Funj6iKMgjUCIQCDQ4CrIVSsg5hZVC7BNbQqjYJDX30xL49nN8OnEZhf2A%3D%3D&title=Sheldon%20%26%20Amy%20Date%20Night%20(TBBT%3A%20The%20Workplace%20Proximity)"

@app.route('/sss', methods=['GET'])
def proxy(*args, **kwargs):
    resp = requests.request(
        method='HEAD',
        url=urlxxx)
        # headers={key: value for (key, value) in request.headers if key != 'Host'},
        # data=request.get_data(),
        # cookies=request.cookies,
        # allow_redirects=False)

    print(resp)

    # excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    # excluded_headers = []
    headers = [(name, value) for (name, value) in resp.raw.headers.items()]
            #    if name.lower() not in excluded_headers]

    response = Response(resp.content, resp.status_code, headers)
    response.url = resp.url
    print(response.url)
    return response




@app.route('/')
def index():
    return render_template('index.html', server_ip=SERVER_IP)

@app.route('/diframe.html')
def indexDiframe():
    return render_template('diframe.html')

@app.route('/dv', methods=['POST'])
def reroute():
    url = request.json['value']
    return GetDownloadOptions(url)
    # print(name)
    # time.sleep(1)
    # data = GetRepositories(name)
    # print(data)
    # return {"data":"0"}


def main():
    app.config["CACHE_TYPE"] = "null"
    app.run(debug=True, host=SERVER_IP, port=PORT) 


if __name__ == "__main__":
    # pass
    main()


# from flask import Flask
# from requests import get

# app = Flask('__main__')
# SITE_NAME = 'https://google.com/'

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def proxy(path):
#   return get(f'{SITE_NAME}{path}').content

# app.run(host='0.0.0.0', port=8080)







