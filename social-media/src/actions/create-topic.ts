'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { db } from '@/db';
import type { Topic } from '@prisma/client';

const createTopicSchema = z.object({
	name: z
		.string()
		.min(3)
		.regex(/^[a-z-]+$/, {
			message: 'Must be lower case letters or dashes without spaces',
		}),
	description: z.string().min(10),
});

interface CreateTopicFormState {
	errors: {
		name?: string[];
		description?: string[];
		_form?: string[];
	};
}

export async function createTopic(
	formState: CreateTopicFormState,
	formData: FormData,
): Promise<CreateTopicFormState> {
	// Validate form fields
	const result = createTopicSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
	});

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
		};
	}

	// General form errors
	const session = await auth();
	if (!session || !session.user) {
		return {
			errors: {
				_form: ['You must be signed in to create a topic!'],
			},
		};
	}

	let topic: Topic;

	try {
		// Save topic to the DB
		topic = await db.topic.create({
			data: {
				slug: result.data.name,
				description: result.data.description,
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				errors: {
					_form: [error.message],
				},
			};
		} else {
			return {
				errors: {
					_form: ['Something went wrong!'],
				},
			};
		}
	}

	// revalidate home page
	revalidatePath('/');
	// redirect to the topic show page
	redirect(paths.topicShow(topic.slug));
}
