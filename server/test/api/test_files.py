import base64
import os
from urllib.parse import urlencode

import pytest

from cherrypy.test.helper import CPWebCase
from pypad.__main__ import setup_server


@pytest.mark.usefixtures("login_user")
class TestFileIO(CPWebCase):
    setup_server = staticmethod(setup_server)
    def test_fileio(self):
        cookie = self.login_user("buzz@example.com", "buzz")

        text = b"this is a file\n"
        text = base64.b64encode(text)

        path = b"folder/file.txt"

        body = {
            b"path": path,
            b"text": text
        }

        body = urlencode(body)

        headers = [("Cookie", cookie)]

        self.getPage(
            "/api/files",
            method="PUT",
            headers=headers,
            body=body,
        )

        assert self.status_code == 204

    def test_fileio_out(self):

        cookie = self.login_user("this@example.com", "this")
        headers = [("Cookie", cookie)]

        text=b"the fileio_out file\n"
        path = "file.txt"

        filedir = os.path.join(self.tempdir, "this@example.com")
        os.makedirs(filedir, exist_ok=True)

        filepath = os.path.join(filedir, path)
        with open(filepath, 'wb') as f:
            f.write(text)

        path = urlencode({b"path": path})

        self.getPage(
            f"/api/files?{path}",
            method="GET",
            headers=headers,
        )

        assert self.body == text

