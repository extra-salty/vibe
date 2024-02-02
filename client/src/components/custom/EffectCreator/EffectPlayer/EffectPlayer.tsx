import { useState } from 'react';
import { useActiveEffect, useFrames } from '@/state/features/effect/effectSelector';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { EffectBaseT, FrameStateT } from '@/types/effect.types';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { PauseCircleOutline, PlayArrowOutlined, SaveOutlined } from '@mui/icons-material';
import Frame from '../../FrameComps/Frame/Frame';
import styles from './EffectPlayer.module.scss';

const EffectPlayer = ({ framesasd }: { framesasd?: FrameStateT[] }) => {
	const frames = useFrames();
	const effect = useActiveEffect();

	const [saveLoading, setSaveLoading] = useState<boolean>(false);
	const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
	const [durationTime, setDurationTime] = useState<number>(0);
	const [overwrriteDurationActive, setOverwrtieDurationActive] = useState<boolean>(false);
	const [showCellCoordinate, setShowCellCoordinate] = useState<boolean>(false);

	const handleEffectPlay = () => {
		frames.forEach((_, i) => {
			const timer = setTimeout(() => {
				setActiveFrameIndex(i);
			}, i * 1000);

			return () => clearTimeout(timer);
		});
	};

	const handleEffectSave = async () => {
		setSaveLoading(true);

		// const updatedEffectData: Omit<EffectBaseT, 'dateCreated'> = {
		// 	_id: effect._id,
		// 	name: effect.name,
		// 	description: effect.description,
		// 	dateModified: new Date(),
		// 	frames: effect.frames.map((frame) => ({ data: frame.data, duration: frame.duration })),
		// };
		try {
			// await EffectServiceInstance.updateEffect(updatedEffectData);
		} catch (e) {
			console.error(e);
		} finally {
			setSaveLoading(false);
		}
	};

	const actions: LoadingButtonProps[] = [
		{
			children: 'Save',
			startIcon: <SaveOutlined />,
			loading: saveLoading,
			onClick: handleEffectSave,
		},
		{
			children: 'Play',
			startIcon: <PlayArrowOutlined />,
			loading: false,
			onClick: handleEffectPlay,
		},
		{
			children: 'Pause',
			startIcon: <PauseCircleOutline />,
			loading: false,
			onClick: handleEffectPlay,
		},
	];

	return (
		<div className={styles.player}>
			<Frame
				frameData={frames[activeFrameIndex].data}
				frameIndex={activeFrameIndex}
				isDisabled={false}
				showCoordinate={showCellCoordinate}
			/>
			<div className={styles.buttons}>
				<div className={styles.buttons}>
					{actions.map((props, i) => (
						<LoadingButton
							key={i}
							size='small'
							color='primary'
							variant='contained'
							loadingPosition='start'
							{...props}
						/>
					))}
				</div>
				<div className={styles.index}>{`${activeFrameIndex + 1}/${frames.length}`}</div>
			</div>
		</div>
	);
};

export default EffectPlayer;

{
	/* <UICheckbox label='Show cell index' onChange={() => setShowCellCoordinate((s) => !s)} /> */
}
