import cherrypy

from pypad.lib.filesystem import walk_filesystem
from pypad.lib.auth import sessions


@cherrypy.expose
class Filesystem:

    @cherrypy.tools.json_out()
    def GET(self):
        session = sessions.get(cherrypy.request.cookie["token"])
        return walk_filesystem(session["email"])

