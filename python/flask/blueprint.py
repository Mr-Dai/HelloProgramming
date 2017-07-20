from flask import Flask
import user

app = Flask(__name__)
app.register_blueprint(user.bp)

app.config['DEBUG'] = True

if __name__ == '__main__':
    app.run(port=9000)
