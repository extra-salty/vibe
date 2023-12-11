import { MouseEvent, useCallback, useState } from 'react';
import UIIcon from '../UIIcon/UIIcon';
import UIButtonType from './UIButton.type';
import useLongPress from '@/helpers/hooks/useLongPress/useLongPress';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import './UIButton.scss';

const UIButton = ({
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
}: UIButtonType) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	// console.log('button rerender');

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
		'uiButton',
		classes,
		hasActiveState && 'active',
		disabled && 'disabled',
	]);

	if (hidden) return null;
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
					{icon && (
						<UIIcon name={isActive && activeIcon ? activeIcon : icon} width={10} height={10} />
					)}
					{text && <span>{isActive && activeText ? activeText : text}</span>}
				</div>
			)}
		</button>
	);
};

export default UIButton;
