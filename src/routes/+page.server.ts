import { upload } from '$lib/server/storage.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async upload(e) {
		const data = await e.request.formData();

		const file = data.get('file') as File;

		if (!file.name || file.name == 'undefined') {
			console.log('no file');
			return fail(500, { error: true, message: 'You must provide a file' });
		}

		const key = await upload(file);

		redirect(303, `/${key}`);
	}
};
