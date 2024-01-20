import { memo } from 'react';
import Image from 'next/image';
import UIIconProps from './UIIcon.types';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UIIcon.scss';

const UIIcon = ({
	name,
	isRotated,
	isFlipped,
	width = 20,
	height = 20,
	onClick,
	hidden,
	classes,
}: UIIconProps) => {
	if (hidden) return null;

	return (
		<Image
			src={`/${name}.svg`}
			alt={name}
			width={width}
			height={height}
			className={appendClasses(['uiIcon', classes, isRotated && 'rotated', isFlipped && 'flipped'])}
			onClick={onClick}
			draggable={false}
		/>
	);
};

export default memo(UIIcon);
