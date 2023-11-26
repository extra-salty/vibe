import { useCallback, useRef, useState } from 'react';
import useLongPressType from './useLongPress.type';

const preventDefault = (e: Event) => {
	if (!isTouchEvent(e)) return;

	if (e.touches.length < 2 && e.preventDefault) {
		e.preventDefault();
	}
};

const isTouchEvent = (e: Event): e is TouchEvent => {
	return e && 'touches' in e;
};

const useLongPress = <T,>({
	delay = 300,
	shouldPreventDefault = true,
	onClick,
	onPress,
}: useLongPressType<T>) => {
	const [longPressTriggered, setLongPressTriggered] = useState(false);
	const timeout = useRef<NodeJS.Timeout>();
	const target = useRef<EventTarget>();

	// if(!onPress) {
	//   return {
	//     onClick: (e: React.MouseEvent<T>) => onClick
	//   }
	// }

	const start = useCallback(
		(e: React.MouseEvent<T> | React.TouchEvent<T>) => {
			const clonedEvent = { ...e };

			if (shouldPreventDefault && e.target) {
				e.target.addEventListener('touchend', preventDefault, { passive: false });
				target.current = e.target;
			}

			timeout.current = setTimeout(() => {
				onPress(clonedEvent);
				setLongPressTriggered(true);
			}, delay);
		},
		[onPress, delay, shouldPreventDefault],
	);

	const clear = useCallback(
		(e: React.MouseEvent<T> | React.TouchEvent<T>, shouldTriggerClick = true) => {
			timeout.current && clearTimeout(timeout.current);
			shouldTriggerClick && !longPressTriggered && onClick?.(e);

			setLongPressTriggered(false);

			if (shouldPreventDefault && target.current) {
				target.current.removeEventListener('touchend', preventDefault);
			}
		},
		[shouldPreventDefault, onClick, longPressTriggered],
	);

	return {
		onMouseDown: (e: React.MouseEvent<T>) => start(e),
		onTouchStart: (e: React.TouchEvent<T>) => start(e),
		onMouseUp: (e: React.MouseEvent<T>) => clear(e),
		onMouseLeave: (e: React.MouseEvent<T>) => clear(e, false),
		onTouchEnd: (e: React.TouchEvent<T>) => clear(e),
	};
};

export default useLongPress;
