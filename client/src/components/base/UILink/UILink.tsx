import Link from 'next/link';

const UILink = ({ href, children }: { href: string; children: React.ReactNode }) => {
	return (
		<Link href={href} className='text-white' style={{ color: 'white' }}>
			{children}
		</Link>
	);
};

export default UILink;
