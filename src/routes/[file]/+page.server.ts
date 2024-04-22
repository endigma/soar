import { S3 } from '$lib/server/storage';
import { env } from '$env/dynamic/private';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

export async function load(e) {
	const metadata = await S3.send(
		new HeadObjectCommand({ Bucket: env.BUCKET_NAME, Key: e.params.file })
	);

	const url = await getSignedUrl(
		S3,
		new GetObjectCommand({ Bucket: env.BUCKET_NAME, Key: e.params.file }),
		{
			expiresIn: 3600
		}
	);

	return { url, metadata };
}
