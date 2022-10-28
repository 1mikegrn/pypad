import { createEffect, createSignal } from "solid-js"
import FileTree from "./FileTree"

import css from "./Menu.module.css"

import state from "../pages/state"

function MenuFactory() {
    let menu, menu_button

    const [right, setRight] = createSignal(-1*window.menuSize())
    const [display, setDisplay] = createSignal("none")

    const MenuStyle = () => ({
        "right": `${right()}px`,
        "display": `${display()}`,
        "width": `${window.menuSize()}px`
    })

    state.menus.main.toggle = toggleMenu
    state.menus.main.display = display
    function toggleMenu() {
        let interval
        let target
        if (display() === "flex") {
            target = -1*Number(MenuStyle().width.slice(0,-2))
            interval = setInterval(() => setRight(v=>v-15), 1)
            createEffect(() => {
                if (right() <= target) {
                    clearInterval(interval)
                    setRight(target)
                    setDisplay("none")
                }
            })
        }
        else {
            state.filesystem.update()
            setDisplay("flex")
            target = 0
            interval = setInterval(() => setRight(v=>v+15), 1)
            createEffect(() => {
                if (right() >= target) {
                    clearInterval(interval)
                    setRight(target)
                }
            })
        }
    }

    function toggleLogin() {
        toggleMenu()
        state.menus.login.toggle()
    }

    function toggleConfig() {
        toggleMenu()
        state.menus.config.toggle()
    }

    function toggleMenuButton() {
        let check = false
        for (let m in state.menus) {
            if (state.menus[m].display() != "none") {
                state.menus[m].toggle()
                check = true
            }
        }
        if (!check) {
            toggleMenu()
        }
    }

    function Menu() {
        menu = (
            <div style={MenuStyle()} class={css.Menu}>
                <div class={css.Buttons}>
                    <h2 onClick={toggleLogin} class={css.Button}>Login</h2>
                    <h2 onClick={toggleConfig} class={css.Button}>Config</h2>
                    <h2 class={css.Button}>Save</h2>
                </div>
                <FileTree />
            </div>
        )
        return menu
    }


    function MenuButton() {
        menu_button = (
            <div class={css.MenuButton}>
            </div>
        )
        menu_button.addEventListener('click', toggleMenuButton)
        return menu_button
    }

    return [Menu, MenuButton]
}

export default MenuFactory
