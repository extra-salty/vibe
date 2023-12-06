import { MouseEvent, useCallback, useState } from 'react';
import Icon from '../Icon/Icon';
import ButtonType from './Button.type';
import useLongPress from '@/helpers/hooks/useLongPress/useLongPress';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import './Button.scss';

const Button = ({
	text,
	activeText,
	icon,
	activeIcon,
	iconPosition = 'start',
	delay = 300,
	disabled,
	onClick,
	onPress,
	onHover,
	hidden,
	style,
	classes,
}: ButtonType) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	const handleOnClick = useCallback(() => {
		onClick && onClick();
		setIsActive((s) => !s);
	}, [onClick]);

	const handleOnPress = useCallback(() => {
		onPress && onPress();
		// setIsActive((s) => !s);
	}, [onPress]);

	const mouseEvents = useLongPress({
		onClick: handleOnClick,
		onPress: handleOnPress,
		delay: delay,
	});

	const handleMouseOver = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			onHover && e.buttons === 1 && onHover();
		},
		[onHover],
	);

	const hasActiveState = (activeIcon || activeText) && isActive;
	const classNames = appendClasses([
		'button',
		classes,
		hasActiveState && 'active',
		disabled && 'disabled',
	]);

	if (hidden) return;
	return (
		<button
			className={classNames}
			style={style}
			disabled={disabled}
			{...mouseEvents}
			onMouseOver={(e: MouseEvent<HTMLButtonElement>) => handleMouseOver(e)}
		>
			{(icon || text) && (
				<div className={appendClasses(['content', iconPosition])}>
					{icon && <Icon name={isActive && activeIcon ? activeIcon : icon} width={10} />}
					{text && <span>{isActive && activeText ? activeText : text}</span>}
				</div>
			)}
		</button>
	);
};

export default Button;
