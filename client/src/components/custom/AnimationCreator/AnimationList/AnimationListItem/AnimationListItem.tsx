import { useSortable } from '@dnd-kit/sortable';
import { memo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { AnimationStateT } from '@/types/animation.types';
import { DndElements } from '@/types/misc.types';
import { TreeItem } from '@mui/x-tree-view';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { HeightOutlined } from '@mui/icons-material';
import EffectList from './EffectList/EffectList';
import styles from './AnimationListItem.module.scss';

export const AnimationListItem = ({
	index,
	animation,
}: {
	index: number;
	animation: AnimationStateT;
}) => {
	const { setNodeRef, attributes, listeners, transform, transition, isDragging, isOver } =
		useSortable({
			id: `${animation.name}/${index}`,
			data: { type: DndElements.animationListItem },
		});

	const style = {
		opacity: isDragging ? 0.5 : undefined,
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<TreeItem
			ref={setNodeRef}
			nodeId={String(index)}
			style={style}
			label={
				<div className={styles.label}>
					<div>
						<div>{index + 1}</div>
						<div>
							<Tooltip title={animation.description}>
								<TextField
									// margin='dense'
									size='small'
									variant='filled'
									placeholder='Enter a name'
									value={animation.name}
									hiddenLabel
									required
								/>
							</Tooltip>
						</div>
					</div>
					<div>
						<IconButton {...attributes} {...listeners}>
							<HeightOutlined />
						</IconButton>
					</div>
				</div>
			}
		>
			<EffectList
				effects={animation.effects}
				animationIndex={index}
				animationName={animation.name}
			/>
		</TreeItem>
	);
};

export default memo(AnimationListItem);
