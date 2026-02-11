import { tool } from 'ai';
import { z } from 'zod';
import { projects } from '$lib/data/projects';

export const tools = {
	getProjects: tool({
		description: 'Get information about Daniel\'s projects. Can filter by technology, awards, or keywords.',
		inputSchema: z.object({
			technology: z.string().optional().describe('Filter by specific technology (e.g., TypeScript, Python, AI)'),
			hasAward: z.boolean().optional().describe('Filter for award-winning projects only'),
			keyword: z.string().optional().describe('Search for projects containing this keyword in title or description'),
			limit: z.number().optional().describe('Maximum number of projects to return (default 5)')
		}),
		execute: async ({ technology, hasAward, keyword, limit = 5 }) => {
			let filtered = [...projects];
			
			if (technology) {
				filtered = filtered.filter(p => 
					p.tech.some(t => t.toLowerCase().includes(technology.toLowerCase()))
				);
			}
			
			if (hasAward) {
				filtered = filtered.filter(p => p.subTitle?.toLowerCase().includes('@'));
			}
			
			if (keyword) {
				const kw = keyword.toLowerCase();
				filtered = filtered.filter(p => 
					p.title.toLowerCase().includes(kw) || 
					p.description.toLowerCase().includes(kw) ||
					p.oneLiner?.toLowerCase().includes(kw)
				);
			}
			
			return filtered.slice(0, limit).map(p => ({
				title: p.title,
				award: p.subTitle,
				description: p.oneLiner || p.description,
				technologies: p.tech.join(', '),
				link: p.link,
				github: p.github
			}));
		}
	}),
	
	getEducation: tool({
		description: 'Get information about Daniel\'s education background',
		inputSchema: z.object({}),
		execute: async () => {
			return {
				school: 'University of Waterloo',
				program: 'Bachelor of Computer Science',
				status: 'Currently studying, looking for Summer 2026 co-op positions'
			};
		}
	}),
	
	getWorkExperience: tool({
		description: 'Get information about Daniel\'s work experience',
		inputSchema: z.object({}),
		execute: async () => {
			return {
				positions: [
					{
						title: 'Research Programmer',
						company: 'Sunnybrook Research Institute',
						status: 'Previous position',
						description: 'Research and development work in medical imaging. Working with Python and MRI data.'
					}
				]
			};
		}
	}),
	
	getHackathonStats: tool({
		description: 'Get Daniel\'s hackathon achievements and statistics',
		inputSchema: z.object({}),
		execute: async () => {
			return {
				totalWins: 18,
				totalParticipations: 23,
				notableAchievements: [
					"NexHacks (Jan 2026): 3rd Place @ Polymarket Track",
                    "HackWestern (Nov 2025): Second Overall",
                    "HackTheValley (Oct 2025): Best UI",
                    "HackTheNorth (Sep 2025): Finalist",
                    "TerraHacks (Aug 2025): Best use of Google Gemini",
                    "JamHacks (May 2025): Overall #1 & Best Dev Tool (Warp)",
                    "YRHacks (Apr 2025): Best Junior Hack",
                    "NSBEHacks (Feb 2025): Overall #2 & BFN challenge #3",
                    "HackTheValley9 (Oct 2024): Best Domain",
                    "Hack The North (Sep 2024): Finalist",
                    "STEMistHacks3.0 (Jul 2024): First place virtual",
                    "JamHacks (Jun 2024): Best Blockchain Project",
                    "ApocalypseHacks (May 2024): Top 7 Projects",
                    "EurekaHacks (May 2024): Best Overall Project",
                    "YRHacks (Apr 2024): Best Real World Application",
                    "FocusHacks (Feb 2024): 1st Place Group",
                    "NSBEHacks (Feb 2024): Honourable Mention, Overall Top 4",
                    "AliceHacks (Oct 2023): Best Beginner Hack",
			    ],
				organizing: ['CxC (UW Data Science Club)', 'Hack the 6ix']
			};
		}
	}),
	
	getContactInfo: tool({
		description: 'Get Daniel\'s contact information and social links',
		inputSchema: z.object({}),
		execute: async () => {
			return {
				email: 'dtpu@uwaterloo.ca',
				github: 'https://github.com/dtpu',
				linkedin: 'https://www.linkedin.com/in/dtpu',
				website: 'https://www.danielpu.dev'
			};
		}
	})
};
