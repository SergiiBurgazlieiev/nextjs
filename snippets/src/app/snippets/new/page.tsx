'use client';

import { useActionState, startTransition } from 'react';
import { createSnippet } from '@/actions';

const SnippetCreatePage = () => {
	const [formState, action] = useActionState(createSnippet, { message: '' });

	/**
	 * If we want to opt-out of automatic form reset,
	 * we should continue using onSubmit like so:
	 */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		startTransition(() => {
			action(formData);
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3 className='font-bold m-3'>Create a Snippet</h3>
			<div className='flex flex-col gap-4'>
				<div className='flex gap-4'>
					<label className='w-12' htmlFor='title'>
						Title
					</label>
					<input
						name='title'
						className='border rounded p-2 w-full'
						id='title'
					/>
				</div>
				<div className='flex gap-4'>
					<label className='w-12' htmlFor='code'>
						Code
					</label>
					<textarea
						name='code'
						className='border rounded p-2 w-full'
						id='code'
					/>
				</div>
				{formState.message && (
					<div className='my-2 p-2 bg-red-200 border rounded border-red-400'>
						{formState.message}
					</div>
				)}
				<button type='submit' className='rounded p-2 bg-blue-300'>
					Create Snippet
				</button>
			</div>
		</form>
	);
};

export default SnippetCreatePage;
