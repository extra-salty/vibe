import { useFrames } from '@/state/features/effect/effectSelector';
import FrameItem from './FrameItem/FrameItem';
import style from './FrameList.module.scss';

const FrameList = () => {
	const frames = useFrames();

	return (
		<ul className={style.frameList}>
			{frames.map((_, i: number) => {
				return (
					<li key={i} className={style.frameItem}>
						<FrameItem index={i} />
					</li>
				);
			})}
		</ul>
	);
};

export default FrameList;
