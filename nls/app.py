from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/test")
def hello():
	return "<p>Your username is " + request.args.get("user") + ", your password is " + request.args.get("pass") + "</p>"

if __name__ == "__main__":
	app.run(threaded=True)
