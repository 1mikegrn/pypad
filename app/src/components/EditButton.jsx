import { createSignal } from "solid-js"
import css from "./EditButton.module.css"
import state from "../pages/state"

function EditButton() {

    const [pos, setPos] = createSignal(0)
    state.input.set = setPos

    const TextStyle = () => ({
        top: `${pos()}px`,
    })

    let text_input
    let button = (
        <div class={css.EditButton}>
            <textarea style={TextStyle()} class={css.Input} ref={text_input} type="text" name="" value="" />
        </div>
    )

    text_input.addEventListener("input", (event) => {
        text_input.value = " "
    })

    button.addEventListener('click', (event) => {
        text_input.focus()
    })

    return button
}

export default EditButton
