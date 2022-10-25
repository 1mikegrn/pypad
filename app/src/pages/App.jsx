import Pad from "../components/Pad"
import MenuFactory from "../components/Menu"

function App() {
    const [Menu, MenuButton] = MenuFactory()
    return (
        <>
        <Pad />
        <Menu />
        <MenuButton />
        </>
    )
}

export default App
