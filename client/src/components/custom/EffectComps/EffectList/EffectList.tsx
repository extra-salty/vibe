import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import EffectListItem from '../EffectListItem/EffectListItem';
import styles from './EffectList.module.scss';

const EffectList = ({ effects }: { effects: BaseEffectT[] }) => {
	return (
		<ul className={styles.list}>
			{effects.map((effect) => (
				<EffectListItem key={effect._id} effect={effect} />
			))}
		</ul>
	);
};

export default EffectList;
