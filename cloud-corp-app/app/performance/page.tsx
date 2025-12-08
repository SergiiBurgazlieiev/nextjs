import performanceImg from 'public/performance.jpg';
import Hero from '@/components/hero';

export default function PerformancePage() {
	return (
		<Hero
			imageData={performanceImg}
			imageAlt='welding'
			title='We serve high performance apps'
		/>
	);
}
