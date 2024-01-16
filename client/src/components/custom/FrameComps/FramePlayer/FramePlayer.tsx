import { useState } from 'react';
import { useAnimations } from '@/state/features/animation/animationSelector';
import { ColorT, DEFAULT_COLOR } from '@/state/features/effect/effectSlice.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { EffectsDataServiceInstance } from '@/app/api/effectsData/_service';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import Frame from '../Frame/Frame';
import UIButton from '@/components/base/UIButton/UIButton';

const FramePlayer = ({}: {}) => {
	const animations = useAnimations();
	const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
	const [frameData, setFrameData] = useState<ColorT[][]>(
		Array(24).fill(Array(12).fill(DEFAULT_COLOR)),
	);

	const selectedEffects = animations.map((animation) =>
		animation.effects.map((effect) => effect.name),
	);

	const handleEffectPlay = async () => {
		const effectsData = await EffectsDataServiceInstance.getEffectsData(selectedEffects);

		// effect.frames.forEach((frame, i) => {
		// 	const timer = setTimeout(() => {
		// 		setActiveFrameIndex(i);
		// 	}, i * 1000);
		// 	return () => clearTimeout(timer);
		// });
	};

	return (
		<div className='min-w-96 '>
			<Frame frameData={frameData} frameIndex={0} isDisabled />
			<div className='m-4'>
				<UIButton icon={Icons.play} onClick={handleEffectPlay} />
			</div>
		</div>
	);
};

export default FramePlayer;
