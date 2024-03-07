import { StaticAnimationsApi } from './api/staticAnimations/_service';
import Animations from '@/components/Animations/Animations';

const Home = async () => {
	// const staticAnimations = await StaticAnimationsApi.getAnimations();
	// console.log('🚀 ~ Home ~ staticAnimations:', staticAnimations);

	return <Animations staticAnimations={[]} animations={[]} />;
};

export default Home;
