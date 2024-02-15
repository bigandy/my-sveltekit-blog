import { error } from '@sveltejs/kit';

export const load = async ({ params, url }) => {
	// chop up the url into array of sections
	const sections = url.pathname.split('/').filter(Boolean);

	console.log({ sections });

	try {
		let post;

		if (sections.length === 4) {
			post = await import(
				`../../../lib/posts/${sections.at(-3)}/${sections.at(-2)}/${sections.at(-1)}.md`
			);
		} else if (sections.length === 3) {
			post = await import(`../../../lib/posts/${sections.at(-2)}/${sections.at(-1)}.md`);
		} else {
			post = await import(`../../../lib/posts/${sections.at(-1)}.md`);
		}

		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.post }
		};
	} catch (err) {
		error(404, err);
	}
};
