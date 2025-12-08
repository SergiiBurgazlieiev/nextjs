import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface HeroProps {
	imageData: StaticImageData;
	imageAlt: string;
	title: string;
}

export default function Hero(props: HeroProps) {
	return (
		<div className='relative h-screen'>
			<div className='absolute -z-10 inset-0'>
				<Image
					fill
					src={props.imageData}
					alt={props.imageAlt}
					style={{
						objectFit: 'cover',
					}}
				/>
				<div className='absolute inset-0 bg-linear-to-r from-slate-900'></div>
			</div>
			<div className='pt-48 flex justify-center items-center'>
				<h1 className='text-white text-6xl'>{props.title}</h1>
			</div>
		</div>
	);
}
