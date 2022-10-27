import cherrypy

from pypad.api.filesystem import Filesystem
from pypad.api.login import Login


@cherrypy.expose
class Api:
    login = Login()
    filesystem = Filesystem()

