import { AnimationsServiceInstance } from './api/animations/_service';
import { EffectsServiceInstance } from './api/effects/_service';
import AnimationCreator from '@/components/custom/AnimationCreator/AnimationCreator';
import Providers from '@/state/Providers';

const Home = async () => {
	const [animations, effects] = await Promise.all([
		AnimationsServiceInstance.getAnimations(),
		EffectsServiceInstance.getEffects(),
	]);

	return (
		<Providers>
			<AnimationCreator animations={animations} effects={effects} />
		</Providers>
	);
};

export default Home;
