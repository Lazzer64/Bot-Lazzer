from flask import Flask, render_template, request, redirect
import json

app = Flask(__name__)

with open('custom.json') as raw:
    customs = json.load(raw)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/commands')
def commands():
    return render_template('commands.html', commands=customs)

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

@app.route('/save', methods=['POST'])
def saveJSON():
    with open('custom.json','wb') as f:
        json.dump(customs,f)
    return redirect('/commands')
