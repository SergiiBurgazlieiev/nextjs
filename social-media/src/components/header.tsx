import {
	Input,
	Button,
	Avatar,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@nextui-org/react';
import Link from 'next/link';
import { auth } from '@/auth';
import * as actions from '@/actions';

export default async function Header() {
	const session = await auth();

	let authContent: React.ReactNode;
	if (session?.user) {
		authContent = (
			<Popover placement='left'>
				<PopoverTrigger>
					<Avatar src={session?.user.image || ''} />
				</PopoverTrigger>
				<PopoverContent>
					<div className='p-4'>
						<form action={actions.signOut}>
							<Button type='submit'>Sign Out</Button>
						</form>
					</div>
				</PopoverContent>
			</Popover>
		);
	} else {
		authContent = (
			<>
				<NavbarItem>
					<form action={actions.signIn}>
						<Button type='submit' color='secondary' variant='bordered'>
							Sign In
						</Button>
					</form>
				</NavbarItem>
				<NavbarItem>
					<form action={actions.signIn}>
						<Button type='submit' color='primary' value='flat'>
							Sign Up
						</Button>
					</form>
				</NavbarItem>
			</>
		);
	}

	return (
		<Navbar className='shadow mb-6'>
			<NavbarBrand>
				<Link className='font-bold' href='/'>
					Social Media
				</Link>
			</NavbarBrand>
			<NavbarContent justify='center'>
				<NavbarItem>
					<Input />
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>{authContent}</NavbarContent>
		</Navbar>
	);
}
