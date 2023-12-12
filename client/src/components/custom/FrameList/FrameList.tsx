import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Frame from '../Frame/Frame';
import style from './FrameList.module.scss';

type FrameListProps = {};

const FrameList = ({}: FrameListProps) => {
	const frames = useSelector((state: RootState) => state.effectCreator.effect.frames);

	return (
		<ul className={style.frameList}>
			{frames.map((frame, i: number) => {
				return (
					<li key={i}>
						<Frame frame={frame} frameIndex={i} />
					</li>
				);
			})}
		</ul>
	);
};

export default FrameList;
