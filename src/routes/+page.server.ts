import { env } from '$env/dynamic/private';
import { S3 } from '$lib/server/storage.js';
import { Upload } from '@aws-sdk/lib-storage';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const actions: Actions = {
	async upload(e) {
		const file = (await e.request.formData()).get('file') as File;

		if (!file.name || file.name == 'undefined') {
			return fail(500, { error: true, message: 'You must provide a file' });
		}

		const key = nanoid() + '_' + file.name;

		const upload = new Upload({
			client: S3,
			params: {
				Bucket: env.BUCKET_NAME,
				Key: key,
				Body: file,
				ContentType: file.type //
			}
		});

		await upload.done();

		redirect(303, `/${key}`);
	}
};
