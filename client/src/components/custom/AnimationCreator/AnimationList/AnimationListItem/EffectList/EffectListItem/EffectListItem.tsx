import { useSortable } from '@dnd-kit/sortable';
import { EffectDataT } from '../../../useColumns';
import { memo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { AnimationEffectStateT } from '@/types/animation.types';
import { DndElements } from '@/types/misc.types';
import { TreeItem } from '@mui/x-tree-view';
import UIButton from '@/components/base/UIButton/UIButton';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UILink from '@/components/base/UILink/UILink';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { HeightOutlined } from '@mui/icons-material';
import styles from './EffectListItem.module.scss';

const EffectListItem = ({
	index,
	animationIndex,
	effect,
}: {
	index: number;
	animationIndex: number;
	effect: AnimationEffectStateT;
}) => {
	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: `${effect.data.name}/${animationIndex}/${index}`,
		data: { type: DndElements.effectListItem, animationIndex },
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const effectData: EffectDataT = {
		numbering: <div>{index + 1}</div>,
		name: <UILink href={`effect/${effect.data.name}`}>{effect.data.name}</UILink>,
		description: effect.data.description || '-',
		frames: effect.data.frames.length,
		duration: effect.data.frames.reduce((total, current) => total + current.duration, 0) / 1000,
		repeat: effect.repeat,
		play: <UIButton icon={Icons.play} onClick={() => {}} />,
		drag: (
			<button {...attributes} {...listeners}>
				<UIIcon name={Icons.width} isRotated height={12} width={12} />
			</button>
		),
	};

	return (
		<TreeItem
			ref={setNodeRef}
			nodeId={`${animationIndex}/${index}`}
			style={style}
			label={
				<div className={styles.label}>
					<div>
						<div>{index + 1}</div>
						<div>
							<Tooltip title={effect.data.description}>
								<TextField
									sx={{ width: '202px' }}
									// margin='dense'
									hiddenLabel
									size='small'
									variant='filled'
									placeholder='Enter a name'
									value={effect.data.name}
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
		/>
	);
};

export default memo(EffectListItem);
