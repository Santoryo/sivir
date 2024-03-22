import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

export const pb = new PocketBase("https://data.brelshaza.com/")

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    currentUser.set(pb.authStore.model)
	getWishlist()
	validate(pb.authStore.model?.id)
})

export async function getWishlist() {
		const resultList: any = await pb.collection('skins').getList(1, 50, {
			sort: 'created',
			expand: 'user',
		})
		return resultList.items;
}

export async function validate(userId: string)
{
	await fetch('https://api.brelshaza.com/v3/data/authenticate/' + userId);
	

	return null;

	
}