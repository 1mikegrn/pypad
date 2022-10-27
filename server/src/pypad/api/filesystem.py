import cherrypy

from pypad.lib.filesystem import walk_filesystem
from pypad.lib.auth import sessions


@cherrypy.expose
class Filesystem:

    @cherrypy.tools.json_out()
    def GET(self):
        token=cherrypy.request.cookie['token']
        session = sessions.get(token.value)
        return walk_filesystem(session["email"])

