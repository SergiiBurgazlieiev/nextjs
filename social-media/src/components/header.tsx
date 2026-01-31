import {
	Input,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import HeaderAuth from './headerAuth';

export default function Header() {
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
			<NavbarContent justify='end'>
				<HeaderAuth />
			</NavbarContent>
		</Navbar>
	);
}
