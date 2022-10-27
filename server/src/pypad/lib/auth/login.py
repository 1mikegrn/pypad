from pypad.lib.auth import credentials, sessions

def login_user(email, password):
    token = credentials.tokenize(email, password)
    sessions.create(token, email)
    return token

