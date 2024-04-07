import { getObject } from '$lib/server/storage.js';
import { error, json } from '@sveltejs/kit';

export async function GET(event) {
	try {
		const object = await getObject(event.params.file);

		event.setHeaders({
			...(object.ContentType && { 'Content-Type': object.ContentType }),
			...(object.ContentLength && { 'Content-Length': object.ContentLength.toString() })
		});

		return new Response(await object.Body?.transformToByteArray());
	} catch (e) {
		return error(500, String(e));
	}
}
