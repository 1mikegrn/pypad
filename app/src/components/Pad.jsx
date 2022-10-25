import { Index } from "solid-js"
import { createStore } from "solid-js/store"
import css from "./Pad.module.css"

function Pad() {
    const [text, setText] = createStore(
        [
            {
                on: true,
                end: true,
                data: <></>
            },
            {
                on: false,
                end: true,
                data: <>&nbsp;</>
            },
        ]
    )

    function insertText(char) {
        if (char.length > 1) {
            return special_char(char)
        }
        if (char == " ") {
            return _insertText(<>&nbsp;</>)
        }
        return _insertText(char)
    }

    function _insertText(char, opts={}) {
        let options = Object.assign({}, opts)
        let idx = text.findIndex(item => item.on === true)
        setText(idx, 'on', false)
        setText(col => {
            let next = idx+1
            let head = col.slice(0, next)
            let tail = col.slice(next)
            let insert = {on: true, data: char}
            if (options?.text) {
                insert.text = options.text
            }
            return [...head, insert, ...tail]
        })
    }

    function special_char(char) {
        switch (char) {
            case "Backspace":
                backspace_char()
                break
            case "Delete":
                delete_char()
                break
            case "Enter":
                _insertText(<br />, {text: "\n"})
                break
            case "ArrowLeft":
                move_cursor("left")
                break
            case "ArrowRight":
                move_cursor("right")
                break
            case "Tab":
                _insertText(<>&nbsp;&nbsp;&nbsp;&nbsp;</>, {text: "\t"})
                break
        }
    }

    function move_cursor(dir) {
        let idx = text.findIndex(item => item.on === true)
        if ((idx === 0 && dir === "left")||(idx === text.length - 2 && dir === "right")) {
            return
        }
        setText(idx, "on", false)
        switch (dir) {
            case "left":
                idx -= 1
                break
            case "right":
                idx += 1
                break
        }
        setText(idx, "on", true)
    }

    function delete_char() {
        let idx = text.findIndex(item => item.on === true)
        idx = idx + 1
        if (text[idx]?.end) {
            return
        }

        setText(col => {
            let head = col.slice(0, idx)
            let tail = idx >= col.length ? [] : col.slice(idx+1)
            return [...head, ...tail]
        })
    }

    function backspace_char() {
        let idx = text.findIndex(item => item.on === true)
        if (text[idx]?.end) {
            return
        }
        setText(col => {
            let head = col.slice(0, idx)
            let tail = idx >= col.length ? [] : col.slice(idx+1)
            return [...head, ...tail]
        })
        setText(idx - 1, 'on', true)
    }

    function setIndex(idx) {
        setText(item => item.on, 'on', false)
        setText(idx, 'on', true)
    }

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey || event.metaKey) {
            return
        }
        event.preventDefault()
        insertText(event.key)
    })

    function updateIndex(index) {
        return function() {
            setIndex(index)
        }
    }

    let items = {}
    function listen(event) {
        let index = 1
        for (let t of text) {
            let item = items[index]
            if (item) {
                if (t.on) {
                    // thin bar
                    // item.style.boxShadow = "inset 2px 0px 0px -0px #E0E0E0"

                    // box
                    item.style.boxShadow = "inset 0px 0px 1px 1px #E0E0E0"
                }
                else {
                    item.style.boxShadow = "inset 0 0 0 0 #E0E0E0"
                }
            }
            index += 1
        }
    }

    document.addEventListener('keydown', listen)
    document.addEventListener('click', listen)

    return (
        <div class={css.Pad}>
            <Index each={text}>
                {(item, index) => {
                    let ref
                    let res = (
                        <span ref={ref} onClick={updateIndex(index-1)}>{item().data}</span>
                    )
                    items[index] = ref
                    return res

            }}
            </Index>
        </div>
    )
}

export default Pad

