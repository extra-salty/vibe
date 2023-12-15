import { useFrames } from '@/state/features/effect/effectSelector';
import FrameItem from '../FrameItem/FrameItem';
import style from './FrameList.module.scss';

const FrameList = () => {
	const frames = useFrames();

	return (
		<ul className={style.frameList}>
			{frames.map((frame, i: number) => {
				return (
					<li key={i} className={style.frameItem}>
						<FrameItem frame={frame} frameIndex={i} />
					</li>
				);
			})}
		</ul>
	);
};

export default FrameList;
