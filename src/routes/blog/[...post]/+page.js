import { error } from '@sveltejs/kit';

export const load = async ({ params, url }) => {
	console.log({ params, url, containsSlash: params.post.includes('/') });
	try {
		let post;
		if (url.pathname.includes('/blog/weeknotes')) {
			// one level deeper
			post = await import(
				`../../../lib/posts/weeknotes/${url.pathname.replace('/blog/weeknotes/', '')}.md`
			);
		} else {
			post = await import(`../../../lib/posts/${params.post}.md`);
		}

		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.post }
		};
	} catch (err) {
		error(404, err);
	}
};
