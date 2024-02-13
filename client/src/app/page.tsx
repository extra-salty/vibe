import AnimationCreator from '@/components/custom/AnimationCreator/AnimationCreator';
import { AnimationsServiceInstance } from './api/animations/_service';
import { EffectsServiceInstance } from './api/effects/_service';

const Home = async () => {
	const [animations, effects] = await Promise.all([
		AnimationsServiceInstance.getAnimations(),
		EffectsServiceInstance.getEffects(),
	]);
	// console.log('🚀 ~ Home ~ animations:', animations);

	// console.log('🚀 ~ Home ~ effects:', effects);
	return <AnimationCreator animations={animations || []} effects={effects || []} />;
};

export default Home;
