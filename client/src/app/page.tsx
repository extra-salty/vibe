import AnimationCreator from '@/components/custom/AnimationCreator/AnimationCreator';
import { AnimationsServiceInstance } from './api/animations/_service';
import { EffectsServiceInstance } from './api/effects/_service';

const Home = async () => {
	const [animations, effects] = await Promise.all([
		AnimationsServiceInstance.getAnimations(),
		EffectsServiceInstance.getEffects(),
	]);

	return <AnimationCreator animations={animations || []} effects={effects || []} />;
};

export default Home;
