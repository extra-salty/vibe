import Image from 'next/image';
import UIIconType from './UIIcon.type';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import './UIIcon.scss';

const UIIcon = ({
	name,
	enlarge,
	width = 24,
	height = 24,
	onClick,
	hidden,
	classes,
}: UIIconType) => {
	const classNames = appendClasses(['ui-icon', classes, enlarge && 'enlarge']);

	if (hidden) return null;
	return (
		<Image
			src={`/${name}.svg`}
			alt={name}
			width={width}
			height={height}
			className={classNames}
			onClick={onClick}
			draggable={false}
		/>
	);
};

export default UIIcon;
