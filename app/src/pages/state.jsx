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
        cursor: {
            style: {
                update: () => {},
            }
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
            text: {
                get: () => {},
                set: () => {},
            }
        }
    }
}

const state = createRoot(createState)
export default state
