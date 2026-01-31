'use client';

import {
	Input,
	Button,
	Textarea,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Alert,
} from '@nextui-org/react';
import { useActionState, startTransition } from 'react';
import { createTopic } from '@/actions';

export default function TopicCreateForm() {
	const [formState, action] = useActionState(createTopic, {
		errors: {},
	});

	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		startTransition(() => action(formData));
	};

	return (
		<Popover placement='left'>
			<PopoverTrigger>
				<Button color='primary'>Create a Topic</Button>
			</PopoverTrigger>
			<PopoverContent>
				<form onSubmit={handleSubmit} noValidate>
					<div className='flex flex-col gap-4 p-4 w-80'>
						<h3 className='text-lg'>Create a Topic</h3>
						<Input
							name='name'
							label='Name'
							labelPlacement='outside'
							placeholder='Name'
							isInvalid={!!formState.errors.name}
							errorMessage={formState.errors.name?.join(', ')}
						/>
						<Textarea
							name='description'
							label='Description'
							labelPlacement='outside'
							placeholder='Description'
							isInvalid={!!formState.errors.description}
							errorMessage={formState.errors.description?.join(', ')}
						/>
						{formState.errors._form && (
							<Alert color='danger'>{formState.errors._form?.join(', ')}</Alert>
						)}
						<Button type='submit' color='primary'>
							Create Topic
						</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}
