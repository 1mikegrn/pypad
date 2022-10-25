import { createRoot } from "solid-js"

function createState() {
    return {
        text: {
            get: null,
            set: null,
        }
    }
}

const state = createRoot(createState)
export default state
