import { MouseEvent, memo, useState } from 'react';
import UIIcon from '../UIIcon/UIIcon';
import UIButtonProps from './UIButton.type';
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
	styles,
	classes,
}: UIButtonProps) => {
	// const [isActive, setIsActive] = useState<boolean>(false);

	const handleOnClick = () => {
		onClick && onClick();
		// setIsActive((s) => !s);
	};

	const handleOnPress = () => {
		onPress && onPress();
		// setIsActive((s) => !s);
	};

	// const mouseEvents = useLongPress({
	// 	onClick: handleOnClick,
	// 	onPress: handleOnPress,
	// 	delay: delay,
	// });

	const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
		onHover && e.buttons === 1 && onHover();
	};

	// const hasActiveState = (activeIcon || activeText) && isActive;
	const classNames = appendClasses([
		'uiButton',
		classes,
		// hasActiveState && 'active',
		disabled && 'disabled',
	]);

	if (hidden) return null;
	return (
		<button
			className={classNames}
			style={styles}
			disabled={disabled}
			onClick={onClick}
			// {...mouseEvents}
			// onMouseOver={(e: MouseEvent<HTMLButtonElement>) => handleMouseOver(e)}
		>
			{/* {(icon || text) && (
				<div className={appendClasses(['content', iconPosition])}>
					{icon && (
						<UIIcon name={isActive && activeIcon ? activeIcon : icon} width={10} height={10} />
					)}
					{text && <span>{isActive && activeText ? activeText : text}</span>}
				</div>
			)} */}
		</button>
	);
};

export default memo(UIButton);
