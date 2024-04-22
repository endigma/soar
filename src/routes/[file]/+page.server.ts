import { getObjectMetadata, getObjectSignedURL } from '$lib/server/storage';

export async function load(e) {
	const metadata = await getObjectMetadata(e.params.file);
	const presignedURL = await getObjectSignedURL(e.params.file);

	return { presignedURL, metadata };
}
