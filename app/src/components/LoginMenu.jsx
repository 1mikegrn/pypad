import { createEffect, createSignal } from "solid-js"
import ExitButton from "./SVG/ExitButton"

import state from "../pages/state"

import css from "./LoginMenu.module.css"

function LoginMenu() {

    let email, password

    const [right, setRight] = createSignal(-1*window.menuSize())
    const [display, setDisplay] = createSignal("none")

    const MenuStyle = () => ({
        "right": `${right()}px`,
        "display": `${display()}`,
        "width": `${window.menuSize()}px`
    })

    state.menus.login.display = display
    state.menus.login.toggle = toggleMenu
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

    async function submitLogin() {

        let body = new FormData()
        body.append('email', email.value)
        body.append('password', password.value)

        let status = await fetch(
            "/api/login",
            {
                method: "POST",
                body: body
            }
        )
        .then(response => response.status)
        .catch(res => console.log(res))

        if (status == 204) {
            toggleMenu()
            state.menus.main.toggle()
        }
        else {
            console.log(status)
            console.log("credentials rejected")
        }
    }

    let menu = (
        <div style={MenuStyle()} class={css.Menu}>
            <ExitButton class={css.ExitButton} onClick={toggleMenu}/>
            <input ref={email} class={css.UserInput} type="text" placeholder="username"/>
            <input ref={password} class={css.UserInput} type="password" placeholder="password"/>
            <h2 onClick={submitLogin} class={css.Button}>Sign In</h2>
        </div>
    )

    return menu
}

export default LoginMenu
