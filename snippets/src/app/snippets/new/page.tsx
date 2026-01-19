import { db } from '@/db';
import { redirect } from 'next/navigation';

const SnippetCreatePage = () => {
	const createSnippet = async (formData: FormData) => {
		// 1. This is needs to be a server action
		'use server'; // this defines server action nextjs is going to treat this as server action

		// 2. User entered a. valid input
		const title = formData.get('title') as string;
		const code = formData.get('code') as string;

		// 3. Create a new record in the BD
		await db.snippet.create({
			data: {
				title,
				code,
			},
		});

		// 4. Take user back to the Home Page
		redirect('/');
	};

	return (
		<form action={createSnippet}>
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
				<button type='submit' className='rounded p-2 bg-blue-300'>
					Create Snippet
				</button>
			</div>
		</form>
	);
};

export default SnippetCreatePage;
