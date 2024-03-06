import { useState } from 'react';
import { ColorT } from '@/types/color.types';
import { DEFAULT_COLOR } from '@/state/features/color/colorSlice';
import Frame from '../Frame/Frame';

const FramePlayer = ({}: {}) => {
	// const animations = usePlaylist();
	const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
	const [frameData, setFrameData] = useState<ColorT[][]>(
		Array(24).fill(Array(12).fill(DEFAULT_COLOR)),
	);

	// const selectedEffects = animations.map((animation) =>
	// 	animation.effects.map((effect) => effect.data.name),
	// );

	const handleEffectPlay = async () => {
		// const effectsData = await StaticAnimationServiceInstance.getEffectsData(
		// 	selectedEffects,
		// );
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
				{/* <UIButton icon={Icons.play} onClick={handleEffectPlay} /> */}
			</div>
		</div>
	);
};

export default FramePlayer;
