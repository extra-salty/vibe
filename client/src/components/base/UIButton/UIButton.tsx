import { MouseEvent, memo, PropsWithChildren, useState } from 'react';
import UIIcon from '../UIIcon/UIIcon';
import UIButtonProps from './UIButton.type';
import useLongPress from '@/helpers/hooks/useLongPress/useLongPress';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import './UIButton.scss';

const UIButton: React.FC<PropsWithChildren<UIButtonProps>> = ({
	text,
	activeText,
	icon,
	activeIcon,
	iconPosition = 'start',
	delay = 500,
	disabled,
	hasBorder,
	// isLoading,
	onClick,
	onPress,
	onHover,
	hidden,
	styles,
	classes,
}) => {
	const hasActiveState = activeIcon || activeText;
	const [isActive, setIsActive] = useState<boolean>(false);

	const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
		onClick?.(e);
		hasActiveState && setIsActive((s) => !s);
	};

	const handleOnPress = (e: MouseEvent<HTMLButtonElement>) => {
		onPress?.(e);
		hasActiveState && setIsActive((s) => !s);
	};

	const mouseEvents = useLongPress({
		onClick: handleOnClick,
		onPress: handleOnPress,
		delay: delay,
	});

	const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
		e.buttons === 1 && onHover?.(e);
	};

	const renderContent = (icon || text) && (
		<div className={appendClasses(['content', iconPosition])}>
			{icon && <UIIcon name={isActive && activeIcon ? activeIcon : icon} />}
			{text && <span>{isActive && activeText ? activeText : text}</span>}
		</div>
	);

	const classNames = appendClasses([
		'uiButton',
		classes,
		hasActiveState && isActive && 'active',
		disabled && 'disabled',
		hasBorder && 'border',
	]);

	if (hidden) return null;
	return (
		<button
			className={classNames}
			style={styles}
			disabled={disabled}
			{...mouseEvents}
			onMouseOver={handleMouseOver}
		>
			{renderContent}
		</button>
	);
};

export default memo(UIButton);
