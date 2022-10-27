import cherrypy

from pypad.lib.filesystem import serve_file
from pypad.lib.auth import sessions
from pypad.settings import APP_SETTINGS

@cherrypy.expose
class Files:

    _cp_config = {
        "tools.staticdir.on": True,
        "tools.staticdir.dir": APP_SETTINGS.filepaths.fs_root,
    }

    def GET(self, path):
        session = sessions.get(cherrypy.request.cookie["token"])
        try:
            return serve_file(session, path)
        except FileNotFoundError:
            raise cherrypy.HTTPError(500, "Internal Server Error")

    def PUT(self, data):
        session = sessions.get(cherrypy.request.cookie["token"])

        cherrypy.response.status = 201
        pass

