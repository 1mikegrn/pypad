import { createEffect, createSignal, onMount } from "solid-js"
import ExitButton from "./SVG/ExitButton"
import state from "../pages/state"

import css from "./ConfigMenu.module.css"

function ConfigMenu() {

    const [right, setRight] = createSignal(-1*window.menuSize())
    const [display, setDisplay] = createSignal("none")

    let pad, text, file

    const [padConfig, setPadConfig] = createSignal(
            `{\n"background-color": "#121212"\n}`
    )

    let textConfig = {
        "font-family": "'Fira Code', serif, sans-serif",
        "color": "#f5f5f5",
        "font-size": "22px"
    }

    const [filename, setFilename] = createSignal(
        `notes.txt`
    )

    state.config.text.get = () => textConfig
    state.config.text.set = (item) => {textConfig = item}
    state.config.pad = padConfig

    function updatePad() {
        setPadConfig(pad.value)
        localStorage.setItem("padConfig", pad.value)
    }
    function updateText() {
        try {
            let txt = JSON.parse(text.value)
            localStorage.setItem("textConfig", text.value)
            textConfig = txt
            state.cursor.style.update(txt)
        }
        catch {

        }
    }
    function updateFilename() {
        setFilename(file.value)
    }

    onMount(loadConfig)
    function loadConfig() {
        let pad_config = localStorage.getItem("padConfig")
        let text_config = localStorage.getItem("textConfig")
        if (!pad_config) {
            pad_config = padConfig()
        }
        if (!textConfig) {
            text_config = textConfig
        }
        setPadConfig(pad_config)
        textConfig = text_config
    }

    const MenuStyle = () => ({
        "right": `${right()}px`,
        "display": `${display()}`,
        "width": `${window.menuSize()}px`
    })

    state.menus.config.toggle = toggleMenu
    state.menus.config.display = display
    function toggleMenu() {
        let interval
        let target
        if (display() === "flex") {
            target = -1*Number(MenuStyle().width.slice(0,-2))
            interval = setInterval(() => setRight(v=>v-15), 1)
            state.input.listen(true)
            createEffect(() => {
                if (right() <= target) {
                    clearInterval(interval)
                    setRight(target)
                    setDisplay("none")
                }
            })
        }

        else {
            setDisplay("flex")
            target = 0
            interval = setInterval(() => setRight(v=>v+15), 1)
            state.input.listen(false)
            createEffect(() => {
                if (right() >= target) {
                    clearInterval(interval)
                    setRight(target)
                }
            })
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key == "=" && event.ctrlKey == true) {

            console.log("grow")
            event.preventDefault()
        }
        else if (event.key == "-" && event.ctrlKey == true) {
            console.log("shrink")
            event.preventDefault()
        }
    })

    let menu = (
        <div style={MenuStyle()} class={css.Menu}>
            <ExitButton class={css.ExitButton} onClick={toggleMenu}/>
            <input ref={file} onChange={updateFilename} class={css.Filename} type="text" name="name" placeholder="filename" value={filename()} />
            <textarea ref={pad} onChange={updatePad} class={css.PadConfig} rows="5" placeholder="background (JSON)">{padConfig()}</textarea>
            <textarea ref={text} onChange={updateText} class={css.TextConfig} rows="5" placeholder="text (JSON)">{JSON.stringify(textConfig)}</textarea>
        </div>
    )

    return menu
}

export default ConfigMenu
