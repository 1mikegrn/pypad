import os
import re


from pypad.settings import APP_SETTINGS


def serve_file(session, path):
    root = APP_SETTINGS.filepaths.fs_root
    user = session["email"]

    filepath = os.path.join(
        root, user, path
    )

    if not os.path.isfile(filepath):
        raise FileNotFoundError

    with open(filepath, 'rb') as f:
        return f.read()


def makedirs(user, *args):
    root = APP_SETTINGS.filepaths.fs_root
    user_dir = os.path.join(root, user, *args)
    os.makedirs(user_dir, exist_ok=True)


def walk_filesystem(user):
    root = APP_SETTINGS.filepaths.fs_root
    user_dir = os.path.join(root, user)
    return _walk_filesystem(user_dir)


def _walk_filesystem(user_dir):
    try:
        name_and_path = (
            (name, os.path.join(user_dir, name))
            for name in os.listdir(user_dir)
        )
        return sorted(
            [
                {
                    "name": name,
                    "files": _walk_filesystem(path),
                    "path": _truncate_fs(path),
                }
                if os.path.isdir(path)
                else {"name": name, "path": _truncate_fs(path)}
                for name, path in name_and_path
            ],
            key=_sort_files,
        )
    except FileNotFoundError:
        return []


def _sort_files(item):
    "key to make folders sort before files"

    if "files" in item:
        return " " + item['name']
    return item['name']


def _truncate_fs(user_dir):
    root = APP_SETTINGS.filepaths.fs_root
    regex = re.search(rf"{root}/(.*?)/(.*)", user_dir)
    return regex.group(2)
