import { env } from '$env/dynamic/private';
import { nanoid } from 'nanoid';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const S3 = new S3Client({
	region: env.AWS_REGION,
	endpoint: env.AWS_ENDPOINT_URL_S3,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY
	},
	forcePathStyle: true
});

export async function getObjectSignedURL(key: string) {
	return await getSignedUrl(S3, new GetObjectCommand({ Bucket: env.BUCKET_NAME, Key: key }), {
		expiresIn: 3600
	});
}

export async function getObjectMetadata(key: string) {
	return await S3.send(new HeadObjectCommand({ Bucket: env.BUCKET_NAME, Key: key }));
}

export async function upload(file: File) {
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

	return key;
}
