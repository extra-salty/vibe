import UIButton from '@/components/base/UIButton/UIButton';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { AnimationEffectT } from '@/state/features/animation/animation.types';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';

const useEffectListData = (effects: AnimationEffectT[]): EffectListDataT[] => {
	const effectsData: BaseEffectT[] = [];

	return effectsData.map(({ name, description, frames }, i) => {
		return {
			numbering: ++i,
			name,
			description: description || '-',
			frames: frames.length,
			duration: frames.reduce((duration, frame) => duration + frame.duration, 0) / 1000,
			repeat: effects[i].repeat,
			edit: <UIButton icon={Icons.edit} onClick={() => {}} />,
			drag: <UIButton icon={Icons.edit} onClick={() => {}} />,
		};
	});
};

export default useEffectListData;
