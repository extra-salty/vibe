import { Actions, ModalActions } from '@/state/features/effect/effectSlice.type';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import {
	addFrame,
	duplicateFrame,
	nextFrame,
	prevFrame,
	resetFrame,
} from '@/state/features/effect/effectSlice';
import { RootState } from '@/state/store';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import UIButton from '@/components/base/UIButton/UIButton';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import Modal from '../../derived/UIModal/UIModal';
import ModalType from '../../derived/UIModal/UIModal.type';
import style from './EffectCreator.module.scss';
import Frame from '../Frame/Frame';
import FrameList from '../FrameList/FrameList';

const EffectCreator = () => {
	const dispatch = useDispatch();
	const frames = useSelector((state: RootState) => state.effectCreator.effect.frames);
	const framesLendgth = useSelector((state: RootState) => state.effectCreator.effect.frames.length);
	console.log('🚀 ~ file: EffectCreator.tsx:26 ~ EffectCreator ~ framesLendgth:', framesLendgth);
	const activeFrame = useSelector((state: RootState) => state.effectCreator.effect.activeFrame);
	const actionsState = useSelector((state: RootState) => state.effectCreator.actionsState);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const frameActions: UIButtonProps[] = [
		{
			text: Actions.reset,
			icon: Icons.restart,
			onClick: () => setIsModalOpen(true),
			disabled: actionsState.Reset,
		},
		{
			text: Actions.lock,
			activeText: Actions.unlock,
			icon: Icons.lock,
			activeIcon: Icons.unlock,
			onClick: () => {},
		},
		{
			text: Actions.add,
			icon: Icons.add,
			onClick: () => {
				dispatch(addFrame());
				dispatch(nextFrame());
			},
		},
		{
			text: Actions.prev,
			icon: Icons.next,
			disabled: activeFrame === 0,
			onClick: () => dispatch(prevFrame()),
		},
		{
			text: Actions.next,
			icon: Icons.next,
			disabled: activeFrame === frames.length - 1,
			onClick: () => dispatch(nextFrame()),
		},

		{
			text: Actions.duplicate,
			icon: Icons.expandMore,
			onClick: () => {
				dispatch(duplicateFrame({ frameIndex: activeFrame }));
				dispatch(nextFrame());
			},
		},
	];
	const modalActions: Omit<ModalType, 'onModalClose'>[] = [
		{
			header: 'Effect',
			description: 'Are you sure you want to reset the matrix?',
			actions: [
				{
					text: ModalActions.cancel,
					onClick: () => {},
				},
				{
					text: ModalActions.accept,
					onClick: () => dispatch(resetFrame({ frameIndex: activeFrame })),
				},
			],
		},
	];

	const renderActions = useCallback((props: UIButtonProps) => {
		return <UIButton key={props.text} {...props} />;
	}, []);

	return (
		<div className={style.effectCreator}>
			{/* <Frame frame={frames[activeFrame]} frameIndex={activeFrame} color={color} /> */}
			{/* <Frame frame={frames[activeFrame]} frameIndex={activeFrame} /> */}
			<FrameList />
			{/* <div className='framePagination'>{`${activeFrame + 1}/${frames.length}`}</div> */}
			{/* <div className={style.actions}>{frameActions.map(renderActions)}</div> */}

			{isModalOpen &&
				createPortal(
					<Modal {...modalActions[0]} onModalClose={() => setIsModalOpen(false)} />,
					document.body,
				)}
		</div>
	);
};

export default EffectCreator;
