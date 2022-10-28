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
