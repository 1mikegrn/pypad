import { createSignal } from "solid-js"
import css from "./EditButton.module.css"
import state from "../pages/state"

function EditButton() {

    const [pos, setPos] = createSignal({left: 0, top: 0})
    state.input.set = setPos

    const TextStyle = () => ({
        left: `${pos().left}px`,
        top: `${pos().top}px`,
    })

    let text_input
    let button = (
        <div class={css.EditButton}>
            <input style={TextStyle()} class={css.Input} ref={text_input} type="text" name="" value="" />
        </div>
    )

    text_input.addEventListener("input", (event) => {
        console.log("change")
    })

    button.addEventListener('click', (event) => {
        text_input.focus()
    })

    return button
}

export default EditButton
