import { useSortable } from '@dnd-kit/sortable';
import { useDispatch } from 'react-redux';
import { CSSProperties, Dispatch, memo, useCallback } from 'react';
import { FrameStateT } from '@/types/effect.types';
import FrameActionButtons from './FrameActionButtons/FrameActionButtons';
import styles from './FrameActions.module.scss';

const FrameActions = ({
	id,
	frameIndex,
	frame,
	isDisabled,
	setIsDisabled,
}: {
	id: string;
	frameIndex: number;
	frame: FrameStateT;
	isDisabled: boolean;
	setIsDisabled: Dispatch<boolean>;
}) => {
	const dispatch = useDispatch();
	const { isDragging, isSorting } = useSortable({ id });

	return (

	);
};

export default memo(FrameActions);
