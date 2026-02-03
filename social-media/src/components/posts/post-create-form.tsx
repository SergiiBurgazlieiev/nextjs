'use client';

import { useActionState, startTransition } from 'react';
import {
	Input,
	Alert,
	Button,
	Popover,
	Textarea,
	PopoverTrigger,
	PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';

interface PostCreateFormProps {
	slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
	const [formState, action, isPending] = useActionState(
		actions.createPost.bind(null, slug),
		{
			errors: {},
		},
	);

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
						{formState.errors._form && (
							<Alert color='danger'>{formState.errors._form?.join(', ')}</Alert>
						)}
						<Button color='primary' type='submit' isLoading={isPending}>
							Create Post
						</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}
