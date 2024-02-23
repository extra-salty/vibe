import { EffectStateT } from '@/types/staticAnimation.types';
import Providers from '@/state/Providers';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';
import { StaticAnimationServiceInstance } from '@/app/api/staticAnimation/_service';

const Effect = async ({ params: { name } }: { params: { name: string } }) => {
	// const effect = await EffectServiceInstance.getEffectDetails(name);

	// const stateEffect: EffectStateT = {
	// 	...effect,
	// 	frames: effect.frames.map((frame) => ({ ...frame, undo: [], redo: [] })),
	// };

	return (
		<Providers>
			<div>Asd</div>
			{/* <EffectCreator initialEffect={stateEffect} /> */}
		</Providers>
	);
};

export default Effect;
