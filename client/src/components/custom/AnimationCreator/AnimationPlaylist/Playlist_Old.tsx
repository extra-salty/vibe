import { usePlaylist } from '@/state/features/animations/animationSelector';
import { useDroppable } from '@dnd-kit/core';
import { LinearProgress, Typography } from '@mui/material';
import { DndElements } from '@/types/misc.types';
import { CSSProperties, memo } from 'react';
import PlaylistToolbar from './PlaylistToolbar/PlaylistToolbar';
import AnimationList from '../AnimationList/AnimationList';
import PlaylistHeader from './PlaylistHeader/PlaylistHeader';
import styles from './Playlist.module.scss';

const Playlist_Old = () => {
	const playlist = usePlaylist();

	const { setNodeRef, isOver, active } = useDroppable({
		id: DndElements.animationList,
		data: { type: DndElements.animationList },
	});

	const style: CSSProperties = {
		backgroundColor:
			isOver && active?.data.current?.type === DndElements.newAnimation
				? 'gray'
				: undefined,
	};

	return (
		<div className={styles.playlist}>
			<Typography variant='body2' className={styles.header}>
				PLAYLIST
			</Typography>
			<PlaylistToolbar />
			<PlaylistHeader />
			{playlist.loading && <LinearProgress />}
			<div ref={setNodeRef} className={styles.content}>
				<div style={style} className={styles.dropZone}>
					{playlist.data.length ? (
						<AnimationList />
					) : (
						<div className={styles.text}>Drag and drop an animation from the table</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Playlist_Old);
