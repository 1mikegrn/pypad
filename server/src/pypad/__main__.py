import cherrypy

from .root import Root

CONFIG = {
    "/": {
        "request.dispatch": cherrypy.dispatch.MethodDispatcher(),
        "tools.staticdir.on": True,
        "tools.staticdir.dir": "/home/pypad/code/app/dist",
    },
}


def setup_server():
    cherrypy.tree.mount(root=Root(), script_name="/", config=CONFIG)


def main():
    cherrypy.config.update({
        "server.socket_host": "0.0.0.0",
        "server.socket_port": 31060,
    })
    setup_server()
    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == "__main__":
    main()
