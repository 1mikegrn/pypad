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
            toggleMain: () => {},
            toggleLogin: () => {},
            toggleConfig: () => {},
        },
        filesystem: {
            set: () => {},
        }
    }
}

const state = createRoot(createState)
export default state
