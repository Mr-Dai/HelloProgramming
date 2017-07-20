from flask import Flask

app = Flask(__name__)

app.config['DEBUG'] = True


@app.route("/hello/<name>/")
def hello(name="World"):
    return "Hello, %s!" % name

if __name__ == "__main__":
    app.run(port=9000)
