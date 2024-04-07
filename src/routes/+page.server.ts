import { listObjects } from '$lib/server/storage.js';

export async function load(event) {
	return await listObjects();
}
