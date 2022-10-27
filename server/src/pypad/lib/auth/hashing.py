import hashlib
import secrets


def hash_password(password, salt=None):
    if salt is None:
        salt = secrets.token_hex(8)

    hasher = hashlib.blake2b(salt=bytes(salt, "utf-8"), digest_size=32)
    hasher.update(password.encode())
    pwhash = hasher.hexdigest()
    return pwhash, salt

