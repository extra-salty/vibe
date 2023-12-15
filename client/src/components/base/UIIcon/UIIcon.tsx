import { memo } from 'react';
import Image from 'next/image';
import UIIconProps from './UIIcon.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UIIcon.scss';

const UIIcon = ({
	name,
	enlarge,
	width = 20,
	height = 20,
	onClick,
	hidden,
	classes,
}: UIIconProps) => {
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

export default memo(UIIcon);
