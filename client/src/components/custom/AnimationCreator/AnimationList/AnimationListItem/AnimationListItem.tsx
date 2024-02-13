import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, memo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { DndElements } from '@/types/misc.types';
import { TreeItem } from '@mui/x-tree-view';
import { IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { HeightOutlined } from '@mui/icons-material';
import EffectList from './EffectList/EffectList';
import styles from './AnimationListItem.module.scss';
import AnimationProperties from './AnimationProperties/AnimationProperties';
import NumberInput from '@/components/base/NumberInput/NumberInput';
import { useAnimation } from '@/state/features/animation/animationSelector';

export const AnimationListItem = ({ index }: { index: number }) => {
	const animation = useAnimation(index);

	const { setNodeRef, attributes, listeners, transform, transition, isDragging, isOver } =
		useSortable({
			id: `${animation.name}/${index}`,
			data: { type: DndElements.animationListItem },
			animateLayoutChanges: () => false,
		});

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0 : 1,
		cursor: isDragging ? 'grabbing' : 'grab',
	};

	return (
		<TreeItem
			ref={setNodeRef}
			nodeId={String(index)}
			// style={style}
			sx={style}
			label={
				<div className={styles.label}>
					<div>
						<Typography>{index + 1}</Typography>
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
						<NumberInput />
						<AnimationProperties />
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
