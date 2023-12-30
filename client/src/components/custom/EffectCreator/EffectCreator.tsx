import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useActiveEffect, useFrames } from '@/state/features/effect/effectSelector';
import { setEffectDescription, setEffectName } from '@/state/features/effect/effectSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { VibeServiceInstance } from '@/services/vibe/vibeService';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { Actions } from '@/state/features/effect/effectSlice.enum';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import Frame from '../FrameComps/Frame/Frame';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UIButton from '@/components/base/UIButton/UIButton';
import UIInput from '@/components/base/UIInput/UIInput';
import UIInputProps from '@/components/base/UIInput/UIInput.type';
import style from './EffectCreator.module.scss';
import { EffectDataUpdateT } from '@/services/vibe/vibeService.types';

const EffectCreator = () => {
	const dispatch = useDispatch();
	const frames = useFrames();
	const effect = useActiveEffect();
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

	const handleEffectSave = async () => {
		const updatedEffectData: EffectDataUpdateT = {
			_id: effect._id,
			name: effect.name,
			description: effect.description,
			dateModified: new Date(),
			frames: effect.frames.map((frame) => {
				return { data: frame.data, duration: frame.duration };
			}),
		};
		try {
			await VibeServiceInstance.updateStaticEffect(updatedEffectData);
		} catch (e) {
			console.error(e);
		}
	};

	const effectButtons: UIButtonProps[] = [
		{
			text: Actions.play,
			icon: Icons.play,
			onClick: handleEffectPlay,
		},
		{
			text: Actions.save,
			icon: Icons.save,
			onClick: handleEffectSave,
		},
	];

	const effectInputs: UIInputProps[] = [
		{
			value: effect.name,
			onChange: (value) => dispatch(setEffectName(value)),
		},
		{
			value: effect.description,
			onChange: (value) => dispatch(setEffectDescription(value)),
		},
		{
			value: convertDate(effect.dateCreated),
			readonly: true,
		},
		{
			value: convertDate(effect.dateModified),
			disabled: true,
		},
	];

	const renderButtons = (props: UIButtonProps, i: number) => <UIButton key={i} {...props} />;

	const renderInputs = (props: UIInputProps, i: number) => <UIInput key={i} {...props} />;

	return (
		<div className={style.effectCreator}>
			<Frame
				frameData={frames[activeFrameIndex].data}
				frameIndex={activeFrameIndex}
				isDisabled={false}
			/>
			<div className='framePagination'>{`${activeFrameIndex + 1}/${frames.length}`}</div>
			{effectButtons.map(renderButtons)}
			{effectInputs.map(renderInputs)}
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
