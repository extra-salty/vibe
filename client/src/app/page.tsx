import { VibeServiceInstance } from '@/services/vibe/vibeService';
import StateProvider from '@/state/StateProvider';
import AnimationCreator from '@/components/custom/AnimationComps/AnimationCreator/AnimationCreator';
import './page.scss';

const Home = async () => {
	const effects = await VibeServiceInstance.getStaticEffects();
	const animations = await VibeServiceInstance.getAnimations();

	return (
		<StateProvider>
			<AnimationCreator effects={effects} animations={animations} />
		</StateProvider>
	);
};

export default Home;
