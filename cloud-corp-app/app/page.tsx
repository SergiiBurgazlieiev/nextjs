import homeImg from 'public/home.jpg';
import Hero from '@/components/hero';

export default function Home() {
	return (
		<Hero
			imageData={homeImg}
			imageAlt='car factory'
			title='Professional Cloud Hosting'
		/>
	);
}
