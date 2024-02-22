import AnimationCreator from '@/components/custom/AnimationCreator/AnimationCreator';
import { AnimationGroupsServiceInstance } from './api/animationGroups/_service';
import { StaticAnimationsServiceInstance } from './api/staticAnimations/_service';

const Home = async () => {
	const [animations, effects] = await Promise.all([
		AnimationGroupsServiceInstance.getAnimationGroups(),
		StaticAnimationsServiceInstance.getStaticAnimations(),
	]);

	return <AnimationCreator animations={animations || []} effects={effects || []} />;
};

export default Home;
