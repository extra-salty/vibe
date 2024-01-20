import { EffectServiceInstance } from '@/app/api/effect/_service';
import { EffectStateT } from '@/types/effect.types';
import StateProvider from '@/state/StateProvider';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';

const Effect = async ({ params: { name } }: { params: { name: string } }) => {
	const effect = await EffectServiceInstance.getEffect(name);

	const stateEffect: EffectStateT = {
		...effect,
		frames: effect.frames.map((frame) => ({ ...frame, undo: [], redo: [] })),
	};

	console.log('page');

	return (
		<StateProvider>
			<div>Asd</div>
			{/* <EffectCreator initialEffect={stateEffect} /> */}
		</StateProvider>
	);
};

export default Effect;
