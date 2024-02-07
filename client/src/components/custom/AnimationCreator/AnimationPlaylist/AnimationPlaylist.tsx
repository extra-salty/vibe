import { Button, Typography } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { DndElements } from '@/types/misc.types';
import { CSSProperties } from 'react';
import { useAnimations } from '@/state/features/animation/animationSelector';
import AnimationList from '../AnimationList/AnimationList';
import { CheckBox, CheckBoxOutlineBlank, ExpandLess, ExpandMore } from '@mui/icons-material';
import styles from './AnimationPlaylist.module.scss';

const AnimationPlaylist = ({}: {}) => {
	const animations = useAnimations();

	const { setNodeRef, isOver, active } = useDroppable({
		id: DndElements.animationList,
		data: { type: DndElements.animationList },
	});

	const style: CSSProperties = {
		backgroundColor:
			isOver && active?.data.current?.type === DndElements.newAnimation ? 'gray' : undefined,
	};

	const handleExpandClick = () => {
		console.log('expand');
	};

	const handleSelectClick = () => {
		console.log('select');
	};

	return (
		<div className={styles.playlist}>
			<Typography variant='body2' className={styles.header}>
				PLAYLIST
			</Typography>
			<div ref={setNodeRef} className={styles.content}>
				<div>
					<Button
						disabled={!animations.data.length}
						startIcon={animations.expanded.length ? <ExpandMore /> : <ExpandLess />}
						onClick={handleExpandClick}
					>
						{animations.expanded.length === 0 ? 'Expand all' : 'Collapse all'}
					</Button>
					<Button
						disabled={!animations.data.length}
						startIcon={animations.expanded.length ? <CheckBoxOutlineBlank /> : <CheckBox />}
						onClick={handleSelectClick}
					>
						{animations.selected.length === 0 ? 'Select all' : 'Unselect all'}
					</Button>
				</div>
				<div style={style} className={styles.dropZone}>
					{animations.data.length ? (
						<AnimationList />
					) : (
						<div className={styles.text}>Drag and drop an animation from the table</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AnimationPlaylist;
