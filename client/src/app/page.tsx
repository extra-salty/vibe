import { EffectsServiceInstance } from './api/effects/_service';
import { AnimationsServiceInstance } from './api/animations/_service';
import AnimationSelector from '@/components/custom/AnimationComps/AnimationSelector/AnimationSelector';
import StateProvider from '@/state/StateProvider';
import './page.scss';

const Home = async () => {
	const [animations, effects] = await Promise.all([
		AnimationsServiceInstance.getAnimations(),
		EffectsServiceInstance.getEffects(),
	]);

	return (
		<StateProvider>
			<AnimationSelector animations={animations} effects={effects} />
		</StateProvider>
	);
};

export default Home;
