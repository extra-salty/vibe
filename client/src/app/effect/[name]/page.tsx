import { EffectServiceInstance } from '@/app/api/effect/_service';
import { EffectStateT } from '@/types/effect.types';
import Providers from '@/state/Providers';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';

const Effect = async ({ params: { name } }: { params: { name: string } }) => {
	const effect = await EffectServiceInstance.getEffect(name);

	const stateEffect: EffectStateT = {
		...effect,
		frames: effect.frames.map((frame) => ({ ...frame, undo: [], redo: [] })),
	};

	return (
		<Providers>
			<EffectCreator initialEffect={stateEffect} />
		</Providers>
	);
};

export default Effect;
