import { env } from '$env/dynamic/private';
import { S3 } from '$lib/server/storage.js';
import { Upload } from '@aws-sdk/lib-storage';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const actions: Actions = {
	async upload(e) {
		const data = await e.request.formData();

		const file = data.get('file') as File;

		if (!file.name || file.name == 'undefined') {
			console.log('no file');
			return fail(500, { error: true, message: 'You must provide a file' });
		}

		const key = nanoid() + '_' + file.name;

		const upload = new Upload({
			params: {
				Bucket: env.BUCKET_NAME,
				Key: key,
				Body: file,
				ContentType: file.type
			},
			client: S3
		});

		await upload.done();

		redirect(303, `/${key}`);
	}
};
