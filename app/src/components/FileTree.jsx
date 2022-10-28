import css from "./FileTree.module.css"
import Folder from "./Folder"

import { createStore } from "solid-js/store"

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

    return (
        <div class={css.FileTree}>
            <Folder name="Home" path="/" files={fileTree} expanded={false}/>
        </div>
    )
}

export default FileTree
