import { useState } from 'react';
import { Actions } from '@/state/features/effect/effectSlice.enum';
import { useFrames } from '@/state/features/effect/effectSelector';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UIButton from '@/components/base/UIButton/UIButton';
import style from './EffectCreator.module.scss';
import UIInput from '@/components/base/UIInput/UIInput';

const EffectCreator = () => {
	const frames = useFrames();
	const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);

	const [durationTime, setDurationTime] = useState<number>(0);
	const [overwrtieDurationActive, setOverwrtieDurationActive] = useState<boolean>(false);

	const handleEffectPlay = () => {
		frames.forEach((frame, i) => {
			const timer = setTimeout(() => {
				setActiveFrameIndex(i);
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

	const renderActions = (props: UIButtonProps, i: number) => <UIButton key={i} {...props} />;

	return (
		<div className={style.effectCreator}>
			{/* <Frame frameData={frames[activeFrameIndex].data} frameIndex={activeFrameIndex} /> */}
			<div className='framePagination'>{`${activeFrameIndex + 1}/${frames.length}`}</div>
			{/* <UIInput /> */}
			{actions.map(renderActions)}
		</div>
	);
};

export default EffectCreator;

// const modalActions: Omit<ModalType, 'onModalClose'>[] = [
//   {
//     header: 'Effect',
//     description: 'Are you sure you want to reset the matrix?',
//     actions: [
//       {
//         text: ModalActions.cancel,
//         onClick: () => {},
//       },
//       {
//         text: ModalActions.accept,
//         onClick: () => {},
//       },
//     ],
//   },
// ];
