import Image from 'next/image';
import UILink from '@/components/base/UILink/UILink';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header>
			<div className={styles.links}>
				<UILink href='/'>Animations</UILink>
				<UILink href='/'>Effect</UILink>
			</div>
			<Image src={'/vibe.svg'} alt='vibe-logo' width={200} height={80} />
		</header>
	);
};

export default Header;
