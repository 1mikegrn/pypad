import os
from urllib.parse import urlencode

import pytest

from cherrypy.test.helper import CPWebCase
from pypad.__main__ import setup_server


class TestLogin(CPWebCase):
    setup_server = staticmethod(setup_server)

    def test_simple_login(self):
        body = {
            "email": "fizz@example.com",
            "password": "fizz"
        }

        self.getPage(
            "/api/login",
            method="POST",
            body=urlencode(body)
        )

        assert self.status_code == 204

