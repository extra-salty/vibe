import { MouseEvent, memo, PropsWithChildren } from 'react';
import UIIcon from '../UIIcon/UIIcon';
import UIButtonProps from './UIButton.type';
import useLongPress from '@/misc/hooks/useLongPress/useLongPress';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UIButton.scss';

const UIButton: React.FC<PropsWithChildren<UIButtonProps>> = ({
	text,
	icon,
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
	const mouseEvents = useLongPress({
		onClick: onClick,
		onPress: onPress ? onPress : () => {},
		delay: delay,
	});

	const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
		e.buttons === 1 && onHover?.(e);
	};

	const renderContent = (icon || text) && (
		<div className={appendClasses(['content', iconPosition])}>
			{icon && <UIIcon name={icon} />}
			{text && <span>{text}</span>}
		</div>
	);

	const classNames = appendClasses([
		'uiButton',
		classes,
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
