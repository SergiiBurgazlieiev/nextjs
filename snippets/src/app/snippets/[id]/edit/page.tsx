interface SnippetEditPageProps {
	params: Promise<{ id: string }>;
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
	const { id } = await props.params;
	return <div>Editing snippet with id {parseInt(id)}</div>;
}
