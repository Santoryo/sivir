import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

export const pb = new PocketBase("https://api.brelshaza.com/")

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    currentUser.set(pb.authStore.model)
})

export async function getWishlist() {
		const resultList: any = await pb.collection('skins').getList(1, 50, {
			sort: 'created',
			expand: 'user',
		})

        console.log(resultList.items)
		return resultList.items;
}