from flask import Flask, request, send_file, redirect
import json
import os
import sketchNetwork

app = Flask(__name__, static_path = '/static')

@app.route("/sketch", methods=["POST", "GET"])
def sketch():
	# import pdb; pdb.set_trace()
	print request.data
	print request.form
	print request.get_json()
	# json_data = json.loads(request.data)
	# make neurel net, pass in data
	return "3"

@app.route("/")
def root():
	return redirect('static/sketch.html')

if __name__ == "__main__":
	app.run(debug=True)


