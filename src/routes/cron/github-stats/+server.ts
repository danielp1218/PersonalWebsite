import { dev } from '$app/environment';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

const imageURL =
	'https://pixel-profile.vercel.app/api/github-stats?username=dtpu&dithering=true&include_all_commits=true&pixelate_avatar=false&theme=fuji&color=%23ffffffFF&hide=issues';

const RETRIES = 4;

export const GET = async (req) => {
	const fullURL = new URL(req.url);
	for (let attempt = 1; attempt <= RETRIES; attempt++) {
		try {
			const res = await fetch(`${imageURL}`);
			if (res.ok) {
				const imageFile = await res.arrayBuffer();
				return await uploadToBlob(imageFile);
			} else {
				console.log(`Attempt ${attempt} failed: Received status ${res.status}`);
			}
		} catch (error) {
			console.log(`Attempt ${attempt} failed:`, error);
		}
	}
	return new Response('Failed to fetch GitHub stats image after multiple attempts.', {
		status: 500
	});
};

// Note: url is uploaded to https://yzm0cfbfopzjsgx7.public.blob.vercel-storage.com/dtpu/github-stats.png
const uploadToBlob = async (imageFile: ArrayBuffer) => {
	try {
		const response = await fetch('https://blob.vercel-storage.com/dtpu/github-stats.png', {
			method: 'PUT',
			body: imageFile,
			headers: {
				authorization: `Bearer ${BLOB_READ_WRITE_TOKEN}`,
				'x-api-version': '7',
				'x-cache-control-max-age': '86400',
				'x-content-type': 'image/png',
				'x-allow-overwrite': '1',
				'x-add-random-suffix': '0'
			}
		});
		if (!response.ok) {
			const text = await response.text();
			throw new Error(`Blob API returned ${response.status}: ${text}`);
		}
		const { url } = (await response.json()) as { url: string };
		return new Response(
			'Cron job executed: GitHub stats image uploaded to Vercel Blob Storage at ' + url,
			{ status: 200 }
		);
	} catch (error) {
		console.log('Error uploading image to Vercel Blob Storage:', error);
		return new Response(`Error uploading image to Vercel Blob Storage: ${error}`, { status: 500 });
	}
};
