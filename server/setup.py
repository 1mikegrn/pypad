from setuptools import setup, find_packages


def read_requirements(requirements_file_path):
    with open(requirements_file_path, "r") as f:
        data = f.readlines()
    data = (i[: i.find("#")] if "#" in i else i for i in data)
    data = (i.strip() for i in data if i.strip())
    data = [i for i in data if not i.startswith("-")]
    return data


setup(
    name="pypad",
    install_requires=read_requirements("requirements.txt"),
    package_data={"": ["*.txt"]},
    packages=find_packages(where="src"),
    package_dir={"": "src"},
)
