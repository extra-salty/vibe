import { MouseEvent, useCallback } from 'react';
import ButtonType from './Button.type';
import useLongPress from '@/helpers/hooks/useLongPress/useLongPress';
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
	const backgroundColor = `hsl(${color.hue} ${color.saturation}% ${color.lightness}%`;

	const mouseEvents = useLongPress({
		onClick: onClick,
		onPress: onPress,
		delay: delay,
	});

	const handleMouseOver = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			onHover && e.buttons === 1 && onHover();
		},
		[onHover],
	);

	if (hidden) return;
	return (
		<button
			className={classes}
			style={{ backgroundColor }}
			{...mouseEvents}
			onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => handleMouseOver(e)}
		>
			{/* {text} */}
		</button>
	);
};

export default Button;
