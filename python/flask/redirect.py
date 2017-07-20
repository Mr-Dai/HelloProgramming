from flask import Flask, request, url_for
import flask

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route("/hello/")
def hello():
    return "Hello, World!"

@app.route("/redirect/")
def redirect():
    path = request.args.get("path", url_for('hello'))
    code = request.args.get("code", 301)
    return flask.redirect(path, code=code)


if __name__ == "__main__":
    app.run(port=9000)
