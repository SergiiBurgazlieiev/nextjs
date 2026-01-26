'use client';
import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { editSnippet } from '@/actions';
import type { Snippet } from '@prisma/client';

interface SnippetEditFormProps {
	snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
	const [code, setCode] = useState(snippet.code);

	const handleEditorChange = (value: string = '') => {
		setCode(value);
	};

	const editSnippetAction = editSnippet.bind(null, snippet.id, code);

	return (
		<div>
			<Editor
				height='40vh'
				theme='vs-dark'
				language='javascript'
				defaultValue={snippet.code}
				options={{
					minimap: { enabled: false },
				}}
				onChange={handleEditorChange}
			/>
			<form className='mt-1' action={editSnippetAction}>
				<button className='p-2 border rounded'>Save</button>
			</form>
		</div>
	);
}
