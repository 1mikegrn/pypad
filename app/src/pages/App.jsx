import Pad from "../components/Pad"
import MenuFactory from "../components/Menu"
import EditButton from "../components/EditButton"

import { Show } from "solid-js"

function App() {
    const [Menu, MenuButton] = MenuFactory()
    return (
        <>
        <Pad />
        <Menu />
        <MenuButton />
            <EditButton />
        <Show when={window.navigator.userAgentData?.mobile}>
            <EditButton />
        </Show>
        </>
    )
}

export default App
