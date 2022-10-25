import { createEffect, createSignal } from "solid-js"
import css from "./Menu.module.css"

import state from "../pages/state"

function MenuFactory() {
    let menu, menu_button

    const screenWidth = () => {
        return screen.width <= 480? screen.width : 400
    }

    const [right, setRight] = createSignal(-1*screenWidth())
    const [display, setDisplay] = createSignal("none")

    const MenuStyle = () => ({
        "right": `${right()}px`,
        "display": `${display()}`,
        "width": `${screenWidth()}px`
    })

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
        console.dir(menu)
    }

    function Menu() {
        menu = (
            <div style={MenuStyle()} class={css.Menu}>
                <div class={css.Buttons}>
                    <h2 class={css.Button}>Login</h2>
                    <h2 class={css.Button}>Save</h2>
                </div>
            </div>
        )
        return menu
    }


    function MenuButton() {
        menu_button = (
            <div class={css.MenuButton}>
            </div>
        )
        menu_button.addEventListener('click', toggleMenu)
        return menu_button
    }

    return [Menu, MenuButton]
}

export default MenuFactory
