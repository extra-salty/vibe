import { useFrames } from '@/state/features/effect/effectSelector';
import FrameItem from '../FrameItem/FrameItem';
import style from './FrameList.module.scss';

const FrameList = () => {
	const frames = useFrames();

	return (
		<ul className={style.list}>
			{frames.map((frame, i) => {
				return (
					<li key={i} className={style.item}>
						<FrameItem frame={frame} frameIndex={i} />
					</li>
				);
			})}
		</ul>
	);
};

export default FrameList;
