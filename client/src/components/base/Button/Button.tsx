import { MouseEvent, useCallback } from 'react';
import ButtonType from './Button.type';
import useLongPress from '@/helpers/hooks/useLongPress/useLongPress';
import appendClasses from '@/helpers/appendClass/appendClass';
import './Button.scss';

const Button = ({
	text,
	color,
	delay = 300,
	onClick,
	onPress,
	onHover,
	classes,
	hidden,
}: ButtonType) => {
	const backgroundColor = color
		? `hsl(${color.hue} ${color.saturation}% ${color.lightness}%`
		: 'white';

	const mouseEvents = useLongPress({
		onClick: onClick,
		onPress: onPress,
		delay: delay,
	});

	const handleMouseOver = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			onHover && e.buttons === 1 && onHover();
		},
		[onHover],
	);

	if (hidden) return;
	return (
		<button
			className={appendClasses([classes])}
			style={{ backgroundColor }}
			{...mouseEvents}
			onMouseOver={(e: MouseEvent<HTMLButtonElement>) => handleMouseOver(e)}
		>
			{text}
		</button>
	);
};

export default Button;
