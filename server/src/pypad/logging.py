import json
import logging
import sys
from .settings import APP_SETTINGS

logger = logging.getLogger("pypad")
sh = logging.StreamHandler(sys.stdout)
logger.addHandler(sh)

if APP_SETTINGS.stage != "PROD":
    logger.setLevel(logging.INFO)
else:
    logger.setLevel(logging.WARNING)


def log_fn(fn):
    last_message = None
    def _wrapper(*args, **kwargs):
        nonlocal last_message
        try:
            message = json.dumps({"fn": fn.__name__, "args": args, "kwargs": kwargs})
        except TypeError: # args/kwargs not json serializable TODO: iteratively build
            message = json.dumps({"fn": fn.__name__})
        if message != last_message:
            logger.info(message)
            last_message = message
        return fn(*args, **kwargs)
    return _wrapper
