import { Actions, ModalActions } from '@/state/features/effect/effectSlice.type';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { addFrame, nextFrame, prevFrame, resetFrame } from '@/state/features/effect/effectSlice';
import { RootState } from '@/state/store';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import UIButton from '@/components/base/UIButton/UIButton';
import UIButtonType from '@/components/base/UIButton/UIButton.type';
import Modal from '../../derived/UIModal/UIModal';
import ModalType from '../../derived/UIModal/UIModal.type';
import style from './EffectCreator.module.scss';
import LedMatrix from '../LedMatrix/LedMatrix';

const EffectCreator = () => {
	const dispatch = useDispatch();
	const {
		effect: { frames, activeFrame },
		actionsState,
	} = useSelector((state: RootState) => state.effectCreator);
	// const { color } = useSelector((state: RootState) => state.attributes);
	console.log('🚀 ~ file: EffectCreator.tsx:19 ~ EffectCreator ~ frames:', frames);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const actions: UIButtonType[] = [
		{
			text: Actions.reset,
			icon: Icons.restart,
			onClick: () => setIsModalOpen(true),
			onPress: () => {},
			disabled: actionsState.Reset,
		},
		{
			text: Actions.lock,
			activeText: Actions.unlock,
			icon: Icons.lock,
			activeIcon: Icons.unlock,
			onClick: () => {},
			onPress: () => {},
		},
		{
			text: Actions.add,
			icon: Icons.add,
			onClick: () => dispatch(addFrame()),
			onPress: () => {},
		},
		{
			text: Actions.next,
			icon: Icons.next,
			disabled: activeFrame === frames.length - 1,
			onClick: () => dispatch(nextFrame()),
			onPress: () => {},
		},
		{
			text: Actions.prev,
			icon: Icons.next,
			disabled: activeFrame === 0,
			onClick: () => dispatch(prevFrame()),
			onPress: () => {},
		},
		{
			text: Actions.duplicate,
			icon: Icons.expandMore,
			onClick: () => dispatch(prevFrame()),
			onPress: () => {},
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
					onPress: () => {},
				},
				{
					text: ModalActions.accept,
					onClick: () => dispatch(resetFrame()),
					onPress: () => {},
				},
			],
		},
	];

	const renderActions = useCallback((props: UIButtonType) => {
		return <UIButton key={props.text} {...props} />;
	}, []);

	return (
		<div className={style.effectCreator}>
			<LedMatrix />
			<div className='framePagination'>{`${activeFrame + 1}/${frames.length}`}</div>
			<div className={style.actions}>{actions.map(renderActions)}</div>

			{isModalOpen &&
				createPortal(
					<Modal {...modalActions[0]} onModalClose={() => setIsModalOpen(false)} />,
					document.body,
				)}
		</div>
	);
};

export default EffectCreator;
