'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, code: string) {
	await db.snippet.update({
		where: { id },
		data: { code },
	});

	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
	await db.snippet.delete({
		where: { id },
	});

	redirect('/');
}

export const createSnippet = async (
	formState: { message: string },
	formData: FormData,
) => {
	// 1. User entered a. valid input
	const title = formData.get('title');
	const code = formData.get('code');

	if (typeof title !== 'string' || title.length < 3) {
		return {
			message: 'Title must be longer!',
		};
	}

	if (typeof code !== 'string' || code.length < 10) {
		return {
			message: 'Code must be longer!',
		};
	}

	// 2. Create a new record in the BD
	await db.snippet.create({
		data: {
			title,
			code,
		},
	});

	// 3. Take user back to the Home Page
	redirect('/');
};
