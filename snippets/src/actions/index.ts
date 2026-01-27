'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function editSnippet(id: number, code: string) {
	await db.snippet.update({
		where: { id },
		data: { code },
	});

	revalidatePath(`/snippets/${id}`);
	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
	await db.snippet.delete({
		where: { id },
	});

	revalidatePath('/');
	redirect('/');
}

export const createSnippet = async (
	formState: { message: string },
	formData: FormData,
) => {
	try {
		// 1. User entered a. valid input
		const title = formData.get('title');
		const code = formData.get('code');

		// 2. Validate form fields
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

		//3. Create a new record in the BD
		await db.snippet.create({
			data: {
				title,
				code,
			},
		});
	} catch (err: unknown) {
		if (err instanceof Error) {
			return {
				message: err.message,
			};
		} else {
			return {
				message: 'Something went wrong!',
			};
		}
	}

	revalidatePath('/');
	redirect('/');
};
