import { writable } from "svelte/store";

function createStore() {
    const { subscribe, set, update } = writable([])
    const url = "/service/lectureSchedule/Courses"

    async function readData() {
        const res = await fetch(url)
        const json = await res.json();
        if (res.ok) {
            set(json.value);
        } else {
            throw new Error(json.error.message)
        }
    }

    return {
        subscribe,
        get: readData,
        create: async (course) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(course)
            })
            if (res.ok) {
                await readData()
            } else {
                const json = await res.json()
                throw new Error(json.error.message)
            }
        },
        delete: async (ID: string) => {
            const res = await fetch(url + `('${ID}')`, {
                method: 'DELETE'
            })
            if (res.ok) {
                await readData()
            } else {
                const json = await res.json()
                throw new Error(json.error.message)
            }
        }
    }
}

export const store = createStore();