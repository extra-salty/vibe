import { EffectsServiceInstance } from './api/effects/_service';
import { AnimationsServiceInstance } from './api/animations/_service';
import AnimationCreator from '@/components/custom/AnimationCreator/AnimationCreator';
import StateProvider from '@/state/StateProvider';

const Home = async () => {
	const [animations, effects] = await Promise.all([
		AnimationsServiceInstance.getAnimations(),
		EffectsServiceInstance.getEffects(),
	]);

	return (
		<StateProvider>
			<AnimationCreator animations={animations} effects={effects} />
		</StateProvider>
	);
};

export default Home;
