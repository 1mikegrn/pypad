import pytest

from cherrypy.test.helper import CPWebCase
from pypad.__main__ import setup_server


@pytest.mark.usefixtures("login_user")
class TestFileSystem(CPWebCase):
    setup_server = staticmethod(setup_server)
    def test_filesystem_walk(self):
        cookie = self.login_user("fizz@example.com", "fizz")
        headers = [("Cookie", cookie)]
        self.getPage("/api/filesystem", method="GET", headers=headers)
        assert self.body == b"[]"

