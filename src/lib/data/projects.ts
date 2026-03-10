export type Project = {
	title: string;
	subTitle?: string; // optional subtitle (next to title)
	oneLiner?: string; // if no one-liner, uses description instead
	description: string; // content
	link?: string; // link to hosted website or demo
	github?: string; // link to github repo
	devpost?: string; // link to devpost
	tech: string[]; // technologies used
	thumbnail: string; // thumbnail image URL
	fullImage?: string; // full image URL for modal
	video?: string; // video URL, will take precedence over fullImage
	imageFilter?: boolean;
	gridSize: '1x1' | '2x1' | '1x2' | '2x2';
};

const projects: Project[] = [
	{
		title: 'FlowBoard',
		subTitle: 'Second Place @ HackWestern 2025',
		oneLiner: '👨‍🎨 The ergonomic way to storyboard.',
		description: 'Draw motion instructions on an interactive canvas, and FlowBoard transforms your sketches into context-aware video clips. Uses Google Vertex AI (Veo 3.1 & Gemini 2.5) to generate videos frame-by-frame with seamless merging.',
		link: 'https://flowboard.tech',
		github: 'https://github.com/austinjiann/FlowBoard',
		devpost: 'https://devpost.com/software/flowboard-bdpqzg',
		tech: ['TypeScript', 'Python', 'Vertex AI', 'Google Cloud', 'Tldraw', 'Supabase', 'Redis'],
		thumbnail: '/images/projects/flowboard.gif',
		video: '/videos/projects/flowboard.mp4',
		gridSize: '2x1'
	},
	
	{
		title: 'Pindex',
		subTitle: 'Polymarket Track Winner @ NexHacks 2026',
		oneLiner: 'Bet on anything? Pindex bets on everything.',
		description:
			'Agentic dependency analysis for Polymarket. Pindex finds correlated prediction markets that impact your positions, visualizes relationships as interactive D3 graphs, and lets you accept or reject dependencies with impact analysis — all as a floating Chrome extension overlay.',
		link: 'https://www.pindex.tech',
		github: 'https://github.com/dtpu/Pindex',
		tech: ['WXT', 'Hono', 'Cloudflare Workers', 'OpenAI', 'Next.js'],
		thumbnail: '/images/projects/pindex.gif',
		video: '/videos/projects/pindex.mp4',
		gridSize: '1x2'
	},
	{
		title: 'Maatchaa',
		subTitle: 'Finalist @ HackTheNorth 2025',
		oneLiner: 'Match your content to the right sponsors',
		description:
			'Maatchaa automatically matches Shopify products with trending YouTube Shorts. Businesses can browse potential creator partnerships, tinder style. Uses multi-modal embeddings for videos and AI-generated visuals for product sets.',
		link: 'https://maatchaa.co/',
		github: 'https://github.com/StockerMC/Maatchaa',
		devpost: 'https://devpost.com/software/maatchaa',
		tech: ['Next.js', 'Python', 'YouTube API', 'Cohere', 'Gemini', 'Pinecone'],
		thumbnail: '/images/projects/maatchaa.gif',
		fullImage: '/images/projects/maatchaa.png',
		gridSize: '1x1'
	},
	{
		title: 'Mr. Goose',
		subTitle: '1st Overall @ JamHacks 2025',
		oneLiner: 'A coding copilot that actually helps you learn.',
		description:
			'Built as a VSCode extension, Mr. Goose uses LLMs to provide context-aware hints to developers stuck on coding problems. Mr. Goose uses smart routing between multiple chat models based on the complexity of a certain problem.',
		github: 'https://github.com/Skilled5041/jamhacks-2025',
		tech: ['Typescript', 'VSCode Extension API', 'OpenAI', 'Gemini', 'Websockets'],
		thumbnail: '/images/projects/mrgoose.gif',
		fullImage: '/images/projects/mrgoose.png',
		gridSize: '1x2'
	},
	{
		title: 'Dime Defender',
		subTitle: 'Finalist @ HackTheNorth 2024',
        oneLiner: 'Extension to forcibly stop shopping sprees!',
		description: 'Chrome extension that interjects when users make impulsive purchases online. Uses 2 interactive, vocal AI agents to debate the pros and cons of the purchase.',
		github: 'https://github.com/aryanp05/hackthenorth24',
        devpost: 'https://devpost.com/software/budget-defender',
		tech: ['AWS', 'ElevenLabs', 'Javascript', 'Plasmo', 'Python', 'Svelte'],
		thumbnail: '/images/projects/dimedefender.gif',
		gridSize: '1x1'
	},
	{
		title: 'rainbolt.ai',
		subTitle: 'Best UI @ HackTheValley X',
		oneLiner: 'Bolt across the world with rainbolt.ai!',
		description: 'Upload any image of a location, and rainbolt.ai identifies it. Shows its reasoning process: recognizing telephone poles, road signs, and vegetation. Grounded using over 900k geotagged images and documents.',
		link: 'https://www.rainboltai.gay/',
		github: 'https://github.com/dtpu/rainbolt.ai',
		devpost: 'https://devpost.com/software/rainbolt-ai',
		tech: ['Next.js', 'FastAPI', 'OpenAI CLIP','LangChain', 'Pinecone', 'Firebase', 'Auth0', 'Gemini'],
		thumbnail: 'images/projects/rainboltai.gif',
		fullImage: 'images/projects/rainboltai.png',
		gridSize: '2x1'
	},
	{
		title: 'Personal Website',
		description: 'My personal portfolio website. Made with love.',
		link: 'https://www.danielpu.dev',
		github: 'https://github.com/dtpu/PersonalWebsite',
		tech: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'Live2DCubism'],
		thumbnail: '/images/projects/personalWebsite.gif',
		imageFilter: true,
		gridSize: '2x2'
	},
	{
		title: 'Suika Game',
		description:
			'Recreation of the Suika game in pure Java Swing. Wrote 2d physics engine from scratch.',
		link: 'https://www.youtube.com/watch?v=nTVNkSFv_mU',
		github: 'https://github.com/dtpu/SuikaGame',
		tech: ['Java'],
		thumbnail: '/images/projects/suikagame.gif',
		video: '/videos/projects/suika.mp4',
		gridSize: '1x2'
	},
	{
		title: 'Copped',
		subTitle: 'Reactiv Track Winner @ Hack Canada 2026',
		oneLiner: 'UGC in NFCs.',
		description:
			'Pays Canadian shoppers to record 15-second video reviews right after purchase. Viewer clips stream via NFC/QR at the exact point of decision; creator clips earn $5 on publish and another $5 per conversion — all through an iOS App Clip with no login needed.',
		github: 'https://github.com/Tankman61/HackCanada2026',
		devpost: 'https://devpost.com/software/copped',
		tech: ['Swift', 'Cloudflare Workers', 'Hono', 'NeonDB', 'PostgreSQL', 'R2'],
		thumbnail: '/images/projects/copped.png',
		video: '/videos/projects/copped.mp4',
		gridSize: '1x1'
	},
	{
		title: 'IgniteAI',
		subTitle: 'Top 4 @ NSBEHacks 2024',
		oneLiner: 'Interactive web-app for exploring career pathways',
		description:
			"Website inspired by Little Alchemy series and Infinite Craft. Drag 'career' and 'subject' blocks into each other and watch what career lies at their intersection!",
		link: 'https://igniteai.vercel.app',
		tech: ['Svelte-kit', 'OpenAI', 'PocketBase', 'SQLite'],
		thumbnail: '/images/projects/igniteai.gif',
		fullImage: '/images/projects/igniteai.png',
		gridSize: '1x1'
	},
	{
		title: 'WebSight',
		subTitle: 'Best Use of Gemini @ TerraHacks 2025',
		oneLiner: 'The web-vision comfort optimizer',
		description:
			'Personalized, self-learning web-vision assistant that manipulates webpages to your preferences. Uses eye tracking and facial expression analysis to optimize text readability. AI learns your preferences and adjusts settings to reduce eye strain.',
		github: 'https://github.com/dtpu/TerraHacks2025',
		devpost: 'https://devpost.com/software/websight-zls856',
		tech: ['WXT', 'FastAPI', 'PyTorch', 'TypeScript', 'React', 'Gemini', 'WebGazer.js'],
		thumbnail: '/images/projects/websight.gif',
		fullImage: '/images/projects/websight.png',
		gridSize: '2x1'
	},
	{
		title: 'Google Minesweeper Bot',
		description:
			'An automated bot to play Google Minesweeper using computer vision and a custom algorithm.',
		github: 'https://github.com/dtpu/GoogleMinesweeperBot',
		tech: ['Python', 'win32', 'PyAutoGUI', 'Numpy', 'Pillow'],
		thumbnail: '/images/projects/googleminesweeper.gif',
		video: '/videos/projects/minesweeper.mp4',
		gridSize: '1x1'
	},
	{
		title: 'The Pet Sentinel',
		subTitle: '1st Place - Virtual @ STEMist Hacks III',
		oneLiner: 'A handy tool to help monitor your pets',
		description: 'Keeps you connected to your pet at all times, ensuring their safety and your peace of mind. Trained a YOLO model on self-labelled dataset. Used websockets to stream real-time detections to a web-app.',
		github: 'https://github.com/dtpu/STEMistHacks-3.0',
		devpost: 'https://devpost.com/software/the-pet-sentinel',
		tech: ['Python', 'FastAPI', 'OpenCV', 'YOLOv9', 'Pytorch', 'Raspberry Pi', 'Roboflow', 'SvelteKit', 'TypeScript', 'Tailwind', 'Websockets'],
		thumbnail: '/images/projects/petsentinel.gif',
		gridSize: '1x1'
	},
	{
		title: 'Pawditor',
		oneLiner: 'An army of cats to test your website!',
		description: 'Automated web testing platform using AI agents to simulate real users and attackers. Finds broken flows, UI bugs, security issues, and outputs a JSON/Markdown report with suggested fixes. Fun, memorable UX with cat-themed personas.',
		github: 'https://github.com/StockerMC/spurhacks2025/',
		devpost: 'https://devpost.com/software/pawditor',
		tech: ['SvelteKit', 'TypeScript', 'Playwright', 'Gemini', 'ElysiaJS', 'Docker', 'Supabase', 'Google Cloud'],
		thumbnail: '/images/projects/pawditor.jpg',
		gridSize: '2x1'
	}
];

export { projects };