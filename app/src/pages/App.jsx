import Pad from "../components/Pad"
import MenuFactory from "../components/Menu"
import EditButton from "../components/EditButton"

function App() {
    const [Menu, MenuButton] = MenuFactory()
    return (
        <>
        <Pad />
        <Menu />
        <MenuButton />
        <EditButton />
        </>
    )
}

export default App
