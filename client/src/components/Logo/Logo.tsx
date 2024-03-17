import Image from 'next/image';

const Logo = () => {
	return <Image src={'/vibe.svg'} priority alt='vibe-logo' width={200} height={80} />;
};

export default Logo;
