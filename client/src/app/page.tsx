import { StaticAnimationsApi } from './api/staticAnimations/_service';
import AnimationCreator from '@/components/custom/AnimationCreator/AnimationCreator';

const Home = async () => {
	const staticAnimations = await StaticAnimationsApi.getAnimations();

	return <AnimationCreator staticAnimations={staticAnimations || []} animations={[]} />;
};

export default Home;
