import css from "./FileTree.module.css"
import Folder from "./Folder"

import state from "../pages/state"

import { createStore } from "solid-js/store"
import { onMount } from "solid-js"

function FileTree() {
    const [fileTree, setFileTree] = createStore(
        [
          {
            name: "user", path: "/user",
            files: [
              {
                name: "test_folder",
                path: "/user/folder",
                files: [
                  {
                    name: "test1.file",
                    path: "/user/folder/test1.file"
                  },
                  {
                    name: "test2.file",
                    path: "/user/folder/test2.file"
                  }
                ]
              }
            ]
          }
        ]
    )

    state.filesystem.update = update
    async function update() {
        let resp = await fetch(
            "/api/filesystem",
            {
                method: "GET",
                credentials: "include",
            }
        )
        .then(resp => resp.json())
        .catch(resp => {
            setFileTree([])
            console.log(resp)
        })

        if (resp) {
            setFileTree(resp)
        }
    }

    onMount(update)

    return (
        <div class={css.FileTree}>
            <Folder name="Home" path="/" files={fileTree} expanded={false}/>
        </div>
    )
}

export default FileTree
