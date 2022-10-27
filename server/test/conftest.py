import pytest
import tempfile

from unittest import mock
from urllib.parse import urlencode


@pytest.fixture(scope="class")
def login_user(request):
    def _login_user(self, email, password):
        body = {
            "email": email,
            "password": password
        }

        self.getPage(
            "/api/login",
            method="POST",
            body=urlencode(body)
        )

        return dict(self.headers)['Set-Cookie']

    request.cls.login_user = _login_user
    with (
        tempfile.TemporaryDirectory() as tempd,
        mock.patch("pypad.settings.APP_SETTINGS.filepaths.fs_root", new=tempd)
    ):
        request.cls.tempdir = tempd
        yield

