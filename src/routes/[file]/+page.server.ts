import { getObject } from '$lib/server/storage';

export async function load(e) {
	let obj = await getObject(e.params.file);
	obj.Body = undefined;
	return obj;
}
