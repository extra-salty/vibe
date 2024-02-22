import { useState } from 'react';
import { usePlaylist } from '@/state/features/animationGroups/animationSelector';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { EffectServiceInstance } from '@/app/api/staticAnimation/_service';
import { StaticAnimationsServiceInstance } from '@/app/api/staticAnimations/_service';
import Frame from '../Frame/Frame';
import UIButton from '@/components/base/UIButton/UIButton';
import { ColorT } from '@/types/color.types';
import { DEFAULT_COLOR } from '@/types/staticAnimation.types';

const FramePlayer = ({}: {}) => {
	const animations = usePlaylist();
	const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
	const [frameData, setFrameData] = useState<ColorT[][]>(
		Array(24).fill(Array(12).fill(DEFAULT_COLOR)),
	);

	const selectedEffects = animations.map((animation) =>
		animation.effects.map((effect) => effect.data.name),
	);

	const handleEffectPlay = async () => {
		const effectsData = await EffectServiceInstance.getEffectsData(selectedEffects);

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
