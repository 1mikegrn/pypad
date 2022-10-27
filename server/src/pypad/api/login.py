import cherrypy

from pypad.lib.auth.login import login_user
from pypad.lib.auth.credentials import MissingRecord, InvalidPassword

@cherrypy.expose
class Login:

    def POST(self, email, password):
        try:
            token = login_user(email, password)
        except MissingRecord:
            raise cherrypy.HTTPError(400, "the specified record does not exist")
        except InvalidPassword:
            raise cherrypy.HTTPError(400, "incorrect password")
        cherrypy.response.cookie["token"] = token
        cherrypy.response.cookie["token"]["Path"] = "/"
        cherrypy.response.status = 204
