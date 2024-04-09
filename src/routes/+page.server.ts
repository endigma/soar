import { listObjects, upload } from '$lib/server/storage.js';
import { fail, type Actions, type LoadEvent } from '@sveltejs/kit';

export async function load(event: LoadEvent) {
	return await listObjects();
}

export const actions: Actions = {
	async upload(e) {
		const data = await e.request.formData();

		const file = data.get('file') as File;

		if (!file.name || file.name == 'undefined') {
			return fail(500, { error: true, message: 'You must provide a file' });
		}

		try {
			const key = await upload(file);

			return { success: true, key };
		} catch (e) {
			if (e instanceof Error) {
				return fail(500, { error: true, message: e.message });
			} else {
				return fail(500);
			}
		}
	}
};
