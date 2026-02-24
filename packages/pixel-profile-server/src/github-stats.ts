import { CONSTANTS, parseArray, parseBoolean, parseString } from './utils';
import { clamp, fetchStats, renderStats } from 'pixel-profile';

export const getStatsCard = async (req: Request) => {
	const urlparams = new URLSearchParams(req.url);
	const {
		background,
		cache_seconds = `${CONSTANTS.CARD_CACHE_SECONDS}`,
		color,
		exclude_repo,
		hide = '',
		include_all_commits,
		pixelate_avatar,
		screen_effect,
		show,
		//username,
		theme,
		avatar_border,
		dithering
	} = Object.fromEntries(urlparams.entries());
	const username = "dtpu"; // hardcode my own username so other people can't use this

	const res = new Response();
	res.headers.set('Content-Type', 'image/png');

	try {
		const showStats = parseArray(show);
		const includeAllCommits = parseBoolean(include_all_commits);

		const stats: Parameters<typeof renderStats>[0] = await fetchStats(
			typeof username === 'string' ? username : '',
			includeAllCommits,
			parseArray(exclude_repo),
			showStats.includes('prs_merged') || showStats.includes('prs_merged_percentage'),
			showStats.includes('discussions_started'),
			showStats.includes('discussions_answered')
		);

		let cacheSeconds = clamp(
			parseInt(parseString(cache_seconds) ?? '0', 10),
			CONSTANTS.SIX_HOURS,
			CONSTANTS.ONE_DAY
		);

		cacheSeconds = process.env.CACHE_SECONDS
			? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
			: cacheSeconds;

		res.headers.set(
			'Cache-Control',
			`max-age=${cacheSeconds / 2}, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`
		);

		const options = {
			background: parseString(background),
			color: parseString(color),
			hiddenStatsKeys: hide ? parseArray(hide) : undefined,
			includeAllCommits,
			pixelateAvatar: parseBoolean(pixelate_avatar),
			theme: parseString(theme),
			screenEffect: parseBoolean(screen_effect),
			avatarBorder: parseBoolean(avatar_border),
			dithering: parseBoolean(dithering)
		};

		const result = await renderStats(stats, options);

		return new Response(new Uint8Array(result), {
			headers: res.headers
		});
	} catch (err) {
		console.log(err);
		return Response.error();
	}
}
