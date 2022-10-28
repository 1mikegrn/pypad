import json
import os
import secrets

from pypad.logging import logger
from pypad.settings import APP_SETTINGS
from .hashing import hash_password

CREDENTIALS = None
def get_credentials():
    global CREDENTIALS
    if CREDENTIALS is None:
        users = os.environ.get("PYPAD_USERS")
        passwords = os.environ.get("PYPAD_PASSWORDS")
        if not users and not passwords:
            CREDENTIALS = _credentials_from_file()
        else:
            CREDENTIALS = _credentials_from_env(users, passwords)
    return CREDENTIALS


def tokenize(email, password):
    creds = get_credentials()
    user_secrets = creds.get(email, None)
    if user_secrets is None:
        raise MissingRecord

    pwhash, salt = user_secrets
    given_hash, _ = hash_password(password, salt)

    if given_hash != pwhash:
        raise InvalidPassword

    return secrets.token_urlsafe(64)


def _credentials_from_env(users, passwords):
    users = users.split(',')
    passwords = passwords.split(',')
    os.environ["PYPAD_USERS"] = ""
    os.environ["PYPAD_PASSWORDS"] = ""

    hashes = (
        (usr, *hash_password(pwd))
        for usr, pwd in zip(users, passwords)
    )

    _creds = {
        user: [pwhash, salt]
        for user, pwhash, salt in hashes
    }

    path = APP_SETTINGS.filepaths.credentials
    with open(path, 'w') as f:
        f.write(json.dumps(_creds))

    return _creds


def _credentials_from_file():
    path = APP_SETTINGS.filepaths.credentials
    with open(path, 'r') as f:
        return json.loads(f.read())


class MissingRecord(Exception):
    pass


class InvalidPassword(Exception):
    pass
