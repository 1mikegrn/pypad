import css from "./EditButton.module.css"
function EditButton() {

    let text_input
    let button = (
        <div class={css.EditButton}>
            <input class={css.Input} ref={text_input} type="text" name="" value="" />
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
