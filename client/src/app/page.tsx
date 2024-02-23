import { AnimationsServiceInstance } from './api/animations/_service';
import AnimationCreator from '@/components/custom/AnimationCreator/AnimationCreator';

const Home = async () => {
	const animations = await AnimationsServiceInstance.getAnimations();

	return <AnimationCreator animations={animations || []} />;
};

export default Home;
