import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { HeightOutlined } from '@mui/icons-material';
import { AnimationT } from '@/types/animation.types';
import { Checkbox, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import NumberInput from '@/components/base/NumberInput/NumberInput';
import AnimationProperties from '../AnimationProperties/AnimationProperties';
import styles from './AnimationLabel.module.scss';

const AnimationLabel = ({
	index,
	animation,
	attributes,
	listeners,
}: {
	index?: number;
	animation: Omit<AnimationT, 'effects'>;
	attributes?: DraggableAttributes;
	listeners?: SyntheticListenerMap;
}) => {
	return (
		<div className={styles.label}>
			<div>
				<Checkbox
					checked={true}
					// indeterminate={!isAllExpanded && !!expandedLength}
					// disabled={!dataLength}
					// onChange={handleExpand}
				/>
				<Typography>{index === undefined ? 0 : index + 1}</Typography>
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
	);
};

export default AnimationLabel;
