from flask import Flask, render_template, request, redirect
from werkzeug.utils import secure_filename
import json
import os

SOUND_DIR = 'resources/sounds/'

app = Flask(__name__)

def saveJSON():
    with open('custom.json','wb') as f:
        json.dump(customs,f)
    return redirect('/commands')

with open('custom.json') as raw:
    customs = json.load(raw)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/commands')
def commands():
    sound_files = os.listdir(SOUND_DIR)
    return render_template('commands.html', commands=customs, sounds=sound_files)

@app.route('/update', methods=['POST'])
def updateCommand():
    if request.form['name'] and request.form['file']:
        customs[request.form['name']] = request.form['file']
    return redirect('/commands')

@app.route('/delete', methods=['POST'])
def delCommand():
    if request.form['name']:
        customs.pop(request.form['name'])
    return redirect('/commands')

@app.route('/upload', methods=['POST'])
def uploadFile():
    file = request.files['file']
    fname = secure_filename(file.filename)
    file.save(os.path.join(SOUND_DIR, fname))
    return redirect('/commands')

@app.route('/save', methods=['POST'])
def saveJSON():
    with open('custom.json','wb') as f:
        json.dump(customs,f)
    return redirect('/commands')
