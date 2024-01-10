import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useActiveEffect } from '@/state/features/effect/effectSelector';
import { setEffectDescription, setEffectName } from '@/state/features/effect/effectSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { Actions } from '@/state/features/effect/effectSlice.enum';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import Frame from '../FrameComps/Frame/Frame';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UIButton from '@/components/base/UIButton/UIButton';
import UIInput from '@/components/base/UIInput/UIInput';
import UIInputProps from '@/components/base/UIInput/UIInput.type';
import style from './EffectCreator.module.scss';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';
import UILabel, { UILabelProps } from '@/components/base/UILabel/UILabel';
import { EffectServiceInstance } from '@/app/api/effect/_service';

const EffectCreator = () => {
	const dispatch = useDispatch();

	const effect = useActiveEffect();
	const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
	const [durationTime, setDurationTime] = useState<number>(0);
	const [overwrriteDurationActive, setOverwrtieDurationActive] = useState<boolean>(false);
	const [showCellCoordinate, setShowCellCoordinate] = useState<boolean>(false);

	const handleEffectPlay = () => {
		effect.frames.forEach((frame, i) => {
			const timer = setTimeout(() => {
				setActiveFrameIndex(i);
			}, i * 1000);

			return () => clearTimeout(timer);
		});
	};

	const handleEffectSave = async () => {
		const updatedEffectData: Omit<BaseEffectT, 'dateCreated'> = {
			name: effect.name,
			description: effect.description,
			dateModified: new Date(),
			frames: effect.frames.map((frame) => {
				return { data: frame.data, duration: frame.duration };
			}),
		};
		try {
			await EffectServiceInstance.updateEffect(updatedEffectData);
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

	const components: { input: UIInputProps; label: UILabelProps }[] = [
		{
			input: {
				value: effect.name,
				onChange: (value) => dispatch(setEffectName(value)),
				id: 'effectName',
			},
			label: { label: 'Name', htmlFor: 'effectName' },
		},
		{
			input: {
				value: effect.description,
				onChange: (value) => dispatch(setEffectDescription(value)),
				id: 'effectDesc',
			},
			label: { label: 'Description', htmlFor: 'effectDesc' },
		},
		{
			input: {
				value: convertDate(effect.dateCreated),
				id: 'dateCreated',
				disabled: true,
			},
			label: { label: 'Date Created', htmlFor: 'dateCreated' },
		},
		{
			input: {
				value: convertDate(effect.dateModified),
				id: 'dateModified',
				disabled: true,
			},
			label: { label: 'Date Created', htmlFor: 'dateModified' },
		},
	];

	return (
		<div className={style.effectCreator}>
			<Frame
				frameData={effect.frames[activeFrameIndex].data}
				frameIndex={activeFrameIndex}
				isDisabled={false}
				showCoordinate={showCellCoordinate}
			/>
			<div className='framePagination'>{`${activeFrameIndex + 1}/${frames.length}`}</div>
			{effectButtons.map((props: UIButtonProps, i: number) => (
				<UIButton key={i} {...props} />
			))}
			{components.map((comps, i) => (
				<div key={i}>
					<UILabel {...comps.label} />
					<UIInput {...comps.input} />
				</div>
			))}
			<UICheckbox label='Show cell index' onChange={() => setShowCellCoordinate((s) => !s)} />
		</div>
	);
};

export default EffectCreator;
