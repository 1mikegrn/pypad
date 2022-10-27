import os

from types import SimpleNamespace


APP_SETTINGS=SimpleNamespace(
    filepaths=SimpleNamespace(
        credentials=os.environ.get(
            "PYPAD_CREDENTIALS",
            "/home/pypad/credentials.json"
        ),
        fs_root=os.environ.get(
            "PYPAD_FS_ROOT",
            "/home/pypad/data"
        )
    ),
    sessions=SimpleNamespace(
        time_expiry=int(os.environ.get(
            "PYPAD_SESSION_TIMEOUT",
            "3600"
        ))
    )
)

