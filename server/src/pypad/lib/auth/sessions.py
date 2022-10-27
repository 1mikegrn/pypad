import time

from pypad.settings import APP_SETTINGS


SESSIONS = {}


def get(token):
    session = SESSIONS.get(token, None)
    if session is None:
        raise InvalidToken

    if session["time"] + APP_SETTINGS.sessions.time_expiry < time.time():
        raise TokenTimeout

    session["time"] = time.time()
    SESSIONS[token] = session

    return session


def create(token, email):
    session = {
        "time": time.time(),
        "email": email,
    }

    SESSIONS[token] = session
    return session


class InvalidToken(Exception):
    pass


class TokenTimeout(Exception):
    pass
