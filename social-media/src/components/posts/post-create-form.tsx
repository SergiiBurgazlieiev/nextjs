'use client';

import { useActionState, startTransition } from 'react';
import {
	Button,
	Popover,
	Input,
	Textarea,
	PopoverTrigger,
	PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';

export default function PostCreateForm() {
	const [formState, action, isPending] = useActionState(actions.createPost, {
		errors: {},
	});

	const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		startTransition(() => {
			action(formData);
		});
	};

	return (
		<Popover placement='left'>
			<PopoverTrigger>
				<Button color='primary'>Create a Post</Button>
			</PopoverTrigger>
			<PopoverContent>
				<form onSubmit={onSubmit} noValidate>
					<div className='flex flex-col gap-4 w-80'>
						<h3 className='text-lg'>Create a Post</h3>
						<Input
							name='title'
							label='Title'
							placeholder='Title'
							labelPlacement='outside'
							isInvalid={!!formState.errors.title}
							errorMessage={formState.errors.title?.join(', ')}
						/>
						<Textarea
							name='content'
							label='Content'
							placeholder='Content'
							labelPlacement='outside'
							isInvalid={!!formState.errors.content}
							errorMessage={formState.errors.content?.join(', ')}
						/>
						<Button color='primary' type='submit' isLoading={isPending}>
							Create Post
						</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}
