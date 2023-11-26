import ButtonType from './Button.type';
import useLongPress from '@/helpers/hooks/useLongPress/useLongPress';
import './Button.scss';

const Button = ({ text, color, delay = 300, onClick, onPress, classes, hidden }: ButtonType) => {
	const mouseEvents = useLongPress({
		onClick: onClick,
		onPress: onPress,
		delay: delay,
	});

	const backgroundColor = `hsl(${color?.hue} ${color?.saturation}% ${color?.lightness}%`;

	if (hidden) return;
	return (
		<button
			className={classes}
			style={{ backgroundColor }}
			{...mouseEvents}
		>
			{text}
		</button>
	);
};

export default Button;
