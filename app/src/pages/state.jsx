import { createRoot } from "solid-js"
import { createStore } from "solid-js/store"

function createStores() {
    const [updateHook, setUpdateHook] = createStore(() => {})

    return {
        hooks: {
            update: {
                get: () => updateHook,
                set: (item) => setUpdateHook(item),
            }
        }
    }
}

const state = createRoot(createStores)
export default state
