import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Actions, ModalActions } from '@/state/features/effect/effectSlice.enum';
import { useFrames } from '@/state/features/effect/effectSelector';
import { nextFrame, prevFrame, resetFrame } from '@/state/features/effect/effectSlice';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import { FrameT } from '@/state/features/effect/effectSlice.type';
import Frame from '../FrameComps/Frame/Frame';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import Modal from '../../derived/UIModal/UIModal';
import ModalType from '../../derived/UIModal/UIModal.type';
import UIButton from '@/components/base/UIButton/UIButton';
import style from './EffectCreator.module.scss';
import { getData } from '@/app/api/get/route';

const EffectCreator = () => {
	// const actionsState = useSelector((state: RootState) => state.effectCreator.actionsState);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const frames = useFrames();
	const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
	// const countRef = useRef(count);

	const [durationTime, setDurationTime] = useState<number>(0);
	const [overwrtieDurationActive, setOverwrtieDurationActive] = useState<boolean>(false);

	const handleEffectPlay = () => {
		frames.forEach((frame, i) => {
			const timer = setTimeout(() => {
				setActiveFrameIndex(i);
				console.log(i);
			}, i * 1000);

			return () => clearTimeout(timer);
		});
	};

	const actions: UIButtonProps[] = [
		{
			text: Actions.play,
			icon: Icons.play,
			onClick: handleEffectPlay,
		},
		{
			text: Actions.save,
			icon: Icons.save,
			onClick: handleEffectPlay,
		},
	];

	const renderActions = (props: UIButtonProps, i: number) => {
		return <UIButton key={i} {...props} />;
	};

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
					onClick: () => {},
				},
			],
		},
	];

	return (
		<div className={style.effectCreator}>
			<Frame frameData={frames[activeFrameIndex].data} frameIndex={activeFrameIndex} />
			<div className='framePagination'>{`${activeFrameIndex + 1}/${frames.length}`}</div>

			{actions.map(renderActions)}

			{isModalOpen &&
				createPortal(
					<Modal {...modalActions[0]} onModalClose={() => setIsModalOpen(false)} />,
					document.body,
				)}
		</div>
	);
};

export default EffectCreator;

// reset all
// delete all
// set duration to all
// lock all
