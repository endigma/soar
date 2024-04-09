import { env } from '$env/dynamic/private';
import { nanoid } from 'nanoid';
import {
	S3Client,
	ListBucketsCommand,
	ListObjectsV2Command,
	GetObjectCommand
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const S3 = new S3Client({
	region: env.AWS_REGION,
	endpoint: env.AWS_ENDPOINT_URL_S3,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY
	},
	forcePathStyle: true
});

export async function getBuckets() {
	return await S3.send(new ListBucketsCommand());
}

export async function getObject(key: string) {
	return await S3.send(new GetObjectCommand({ Bucket: env.BUCKET_NAME, Key: key }));
}

export async function listObjects() {
	return await S3.send(new ListObjectsV2Command({ Bucket: env.BUCKET_NAME }));
}

export async function upload(file: File) {
	const key = nanoid();
	const upload = new Upload({
		params: {
			Bucket: env.BUCKET_NAME,
			Key: key,
			Body: file,
			ContentType: file.type
		},
		client: S3
	});

	upload.on('httpUploadProgress', (progress) => {
		console.log(progress);
	});

	await upload.done();

	return key;
}
