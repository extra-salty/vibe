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
	iconSize = 15,
	delay = 500,
	disabled,
	hasBorder = true,
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
			{icon && <UIIcon name={icon} width={iconSize} height={iconSize} />}
			{text && <span>{text}</span>}
			{/* {true && <span className='hoverTip'>Hover tip</span>} */}
		</div>
	);

	if (hidden) return null;
	return (
		<button
			className={appendClasses([
				'uiButton',
				classes,
				disabled && 'disabled',
				hasBorder && 'border',
			])}
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
