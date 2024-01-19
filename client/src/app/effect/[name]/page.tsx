import { EffectServiceInstance } from '@/app/api/effect/_service';
import { StateEffectT } from '@/state/features/effect/effectSlice.types';
import StateProvider from '@/state/StateProvider';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';

const Effect = async ({ params: { name } }: { params: { name: string } }) => {
	const effect = await EffectServiceInstance.getEffect(name);

	const stateEffect: StateEffectT = {
		...effect,
		frames: effect.frames.map((frame) => ({ ...frame, undo: [], redo: [] })),
	};

	console.log('page');

	return (
		<StateProvider>
			{/* <Button>Asd</Button> */}
			<EffectCreator initialEffect={stateEffect} />
		</StateProvider>
	);
};

export default Effect;
