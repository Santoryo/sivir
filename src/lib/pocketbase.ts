import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'
import { POCKETBASE } from '$env/static/private'

export const pb = new PocketBase("https://api.brelshaza.com/")

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    currentUser.set(pb.authStore.model)
})