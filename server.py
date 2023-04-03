import requests
import json
import sys
from flask import Flask, render_template, request, Response, redirect, url_for, make_response
import socket, random
import time
import requests

from downloader import GetDownloadOptions

SERVER_IP = "0.0.0.0"
PORT = 8080

app = Flask(__name__) 


@app.route('/')
def index():
    return render_template('index.html', server_ip=SERVER_IP)
    #return render_template('index.html')


@app.route('/dv', methods=['POST'])
def reroute():
    url = request.json['value']
    return GetDownloadOptions(url)


def main():
    app.config["CACHE_TYPE"] = "null"
    app.run(debug=True, host=SERVER_IP, port=PORT)
    app.run(debug=True)


if __name__ == "__main__":
    main()
