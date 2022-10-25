import cherrypy


@cherrypy.expose
class Root:
    def GET(self):
        with open("/home/pypad/code/app/dist/index.html", "r") as f:
            return f.read()

