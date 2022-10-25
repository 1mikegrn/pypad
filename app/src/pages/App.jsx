import Pad from "../components/Pad"
import MenuFactory from "../components/Menu"
import state from "./state"

function App() {
    const [Menu, MenuButton] = MenuFactory()
    return (
        <>
        <Pad state={state}/>
        <Menu state={state}/>
        <MenuButton />
        </>
    )
}

export default App
