import cherrypy

from pypad.api.root import Api


@cherrypy.expose
class Root:
    api = Api()

    def GET(self):
        with open("/home/pypad/code/app/dist/index.html", "r") as f:
            return f.read()

