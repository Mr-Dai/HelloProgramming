from flask import Flask, g

app = Flask(__name__)
app.config['SERVER_NAME'] = 'localhost:9000'
app.config['DEBUG'] = True

@app.url_value_preprocessor
def get_site(endpoint, values):
    g.site = values.pop('subdomain')

@app.route('/', subdomain="<subdomain>")
def index():
    return g.site

if __name__ == '__main__':
    app.run(port=9000)
