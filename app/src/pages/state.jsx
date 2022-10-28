import { createRoot } from "solid-js"

function createState() {
    return {
        text: {
            get: () => {},
            set: () => {},
            insert: () => {},
        },
        input: {
            set: () => {},
            listen: () => {},
        },
        menus: {
            main: {
                toggle: () => {},
                display: () => {}
            },
            login: {
                toggle: () => {},
                display: () => {}
            },
            config: {
                toggle: () => {},
                display: () => {}
            },
        },
        filesystem: {
            update: () => {},
        },
        config: {
            pad: () => {},
            text: () => {},
        }
    }
}

const state = createRoot(createState)
export default state
