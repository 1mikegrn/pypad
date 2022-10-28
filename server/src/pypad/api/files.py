import cherrypy

from pypad.lib.filesystem import serve_file, write_file
from pypad.lib.auth import sessions

@cherrypy.expose
class Files:

    def GET(self, path):
        token=cherrypy.request.cookie["token"]
        session = sessions.get(token.value)
        try:
            return serve_file(session, path)
        except FileNotFoundError:
            raise cherrypy.HTTPError(404, "File Not Found")

    def PUT(self, path, text):
        token=cherrypy.request.cookie["token"]
        session = sessions.get(token.value)
        write_file(session, path, text)
        cherrypy.response.status = 204

