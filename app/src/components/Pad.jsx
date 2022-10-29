import { createSignal, Index, onMount } from "solid-js"
import { createStore } from "solid-js/store"
import css from "./Pad.module.css"

import state from "../pages/state"


function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}


function Pad() {
    const [listen, setListen] = createSignal(true)
    const [text, setText] = createStore(
        [
            {
                on: false,
                first: true,
                data: <span onClick={updateIndex}></span>,
                style: null,
                char: "",
            },
            {
                on: true,
                last: true,
                data: <span onClick={updateIndex}>&nbsp;</span>,
                style: null,
                char: "\n"
            },
        ]
    )

    state.text.get = () => text
    state.text.set = setText
    state.input.listen = setListen

    function insertText(char) {
        if (char.length > 1) {
            return special_char(char)
        }
        if (char == " ") {
            return _insertText(<>&nbsp;</>, char)
        }
        return _insertText(char, char)
    }

    function _insertText(data, char, style=state.config.text.get()) {

        let idx = text.findIndex(item => item.on === true)
        let tag = <span style={style} onClick={updateIndex}>{data}</span>
        setText(col => {
            let next = idx
            let head = col.slice(0, next)
            let tail = col.slice(next)
            let insert = {on: false, data: tag, char: char, style: style}
            let res = [...head, insert, ...tail]
            return res
        })
        _localDumps(text)
    }

    function _localDumps(res) {
        let str = JSON.stringify(res.map(e=>[e.char, e.style]))
        localStorage.setItem("text", str)
    }

    function _loadString(arr=localStorage.getItem("text")) {
        if (!arr) return
        let str = JSON.parse(arr).slice(1, -1)

        let char, style
        for ([char, style] of str) {
            switch (char) {
                case "\n":
                    _insertText(<br />, char, style)
                    break
                case "\t":
                    _insertText(<>&nbsp;&nbsp;&nbsp;&nbsp;</>, char, style)
                    break
                default:
                    _insertText(char, char, style)
            }
        }
        state.config.text.set(style)
        updateCursorFromSettings(style)
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
                _insertText(<br />, "\n")
                break
            case "ArrowLeft":
                move_cursor("left")
                break
            case "ArrowRight":
                move_cursor("right")
                break
            case "Tab":
                _insertText(<>&nbsp;&nbsp;&nbsp;&nbsp;</>, "\t")
                break
        }
    }

    function move_cursor(dir) {
        let idx = text.findIndex(item => item.on === true)
        if ((idx === 1 && dir === "left")||(idx === text.length - 1 && dir === "right")) {
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
        if (text[idx+1]?.last) {
            return
        }

        setText(col => {
            let head = col.slice(0, idx+1)
            let tail = idx >= col.length ? [] : col.slice(idx+2)
            return [...head, ...tail]
        })
        _localDumps(text)
    }

    function backspace_char() {
        let idx = text.findIndex(item => item.on === true)
        if (text[idx-1]?.first) {
            return
        }
        setText(col => {
            let head = col.slice(0, idx-1)
            let tail = idx >= col.length ? [] : col.slice(idx)
            return [...head, ...tail]
        })
        setText(idx - 1, 'on', true)
        _localDumps(text)
    }

    function setIndex(idx) {
        setText(item => item.on, 'on', false)
        setText(idx, 'on', true)
    }


    function updateIndex(event) {
        let index = text.findIndex(item => item.data == event.target)
        setIndex(index)
    }

    function updateCursor(event) {
        setText((text) => {
            for (let t of text) {
                if (t.on) {
                    t.data.style.boxShadow = "inset 0px 0px 1px 1px #E0E0E0"
                    let { top } = getOffset(t.data)
                    state.input.set(top)
                }
                else {
                    t.data.style.boxShadow = "inset 0 0 0 0 #E0E0E0"
                }
            }
            return text
        })
    }

    state.cursor.style.update = updateCursorFromSettings
    function updateCursorFromSettings(settings) {
        if (settings) {
            setText(item => item.last, item => {
                for (let [key, val] of Object.entries(settings)) {
                    item.data.style[key] = val
                }
                return item
            })
        }
    }


    function background() {
        let config, user_config

        config = {
            "min-height": "100vh",
            "min-width": "100vw"
        }

        try {
            user_config = JSON.parse(state.config.pad())
        }
        catch {
            user_config = {}
        }

        return Object.assign(user_config, config)
    }

    function listenAndInsert(event) {
        if (event.ctrlKey || event.metaKey || !listen()) {
            return
        }

        if (event.key == "Tab") {
            event.preventDefault()
        }

        insertText(event.key)
    }

    onMount(_loadString)
    document.addEventListener('keydown', updateCursor)
    document.addEventListener('click', updateCursor)
    document.addEventListener("keydown", listenAndInsert)
    return (
        <div class={css.Pad} style={background()}>
            <For each={text}>
                {(item) => {
                    return item.data
            }}
            </For>
        </div>
    )
}

export default Pad

