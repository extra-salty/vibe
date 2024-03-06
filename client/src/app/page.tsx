import { StaticAnimationsApi } from './api/staticAnimations/_service';
import Animations from '@/components/Animations/Animations';

const Home = async () => {
	const staticAnimations = await StaticAnimationsApi.getAnimations();

	return <Animations staticAnimations={staticAnimations || []} animations={[]} />;
};

export default Home;
