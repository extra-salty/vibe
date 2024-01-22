import { useState } from 'react';
import { useFrames } from '@/state/features/effect/effectSelector';
import { FrameStateT } from '@/types/effect.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import Frame from '../../FrameComps/Frame/Frame';
import UIButton from '@/components/base/UIButton/UIButton';

const EffectPlayer = ({ framesasd }: { framesasd?: FrameStateT[] }) => {
	const frames = useFrames();

	const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
	const [durationTime, setDurationTime] = useState<number>(0);
	const [overwrriteDurationActive, setOverwrtieDurationActive] = useState<boolean>(false);
	const [showCellCoordinate, setShowCellCoordinate] = useState<boolean>(false);

	const handleEffectPlay = () => {
		frames.forEach((_, i) => {
			const timer = setTimeout(() => {
				setActiveFrameIndex(i);
			}, i * 1000);

			return () => clearTimeout(timer);
		});
	};

	const handleEffectSave = async () => {
		// const updatedEffectData: Omit<BaseEffectT, 'dateCreated'> = {
		// 	name: effect.name,
		// 	description: effect.description,
		// 	dateModified: new Date(),
		// 	frames: effect.frames.map((frame) => {
		// 		return { data: frame.data, duration: frame.duration };
		// 	}),
		// };
		// try {
		// 	await EffectServiceInstance.updateEffect(updatedEffectData);
		// } catch (e) {
		// 	console.error(e);
		// }
	};

	return (
		<div className='flex flex-col gap-2 w-96'>
			<Frame
				frameData={frames[activeFrameIndex].data}
				frameIndex={activeFrameIndex}
				isDisabled={false}
				showCoordinate={showCellCoordinate}
			/>
			<div className='flex gap-2 justify-around'>
				<UIButton text='Play' icon={Icons.play} onClick={handleEffectPlay} />
				<UIButton text='Pause' icon={Icons.pause} onClick={handleEffectSave} />
				{/* <UICheckbox label='Show cell index' onChange={() => setShowCellCoordinate((s) => !s)} /> */}
				<div className='framePagination'>{`${activeFrameIndex + 1}/${frames.length}`}</div>
			</div>
		</div>
	);
};

export default EffectPlayer;
