import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useFramesLength } from '@/state/features/effect/effectSelector';
import {
	ContentCopyOutlined,
	ControlPointDuplicateOutlined,
	DeleteOutlined,
	List,
	RestartAltOutlined,
} from '@mui/icons-material';
import { IconButton, Divider, Menu, Tooltip } from '@mui/material';

const FrameMenu = ({
	frameIndex,
	isDisabled,
}: {
	frameIndex: number;
	isDisabled: boolean;
}) => {
	const dispatch = useDispatch();
	const framesLength = useFramesLength();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const additiveItems: MenuItemProps[] = [
		{
			icon: <ControlPointDuplicateOutlined />,
			label: 'Add before',
			onClick: () => {
				dispatch(
					addToHistory({
						frameIndex: frameIndex - 1,
						type: FrameHistoryTypes.added,
					}),
				);
				dispatch(addFrame(frameIndex - 1));
			},
		},
		{
			icon: <ControlPointDuplicateOutlined sx={{ rotate: '180deg' }} />,
			label: 'Add after',
			onClick: () => {
				dispatch(
					addToHistory({
						frameIndex,
						type: FrameHistoryTypes.added,
					}),
				);
				dispatch(addFrame(frameIndex));
			},
		},
		{
			icon: <ContentCopyOutlined />,
			label: 'Duplicate',
			onClick: () => {
				dispatch(
					addToHistory({
						frameIndex,
						type: FrameHistoryTypes.added,
					}),
				);
				dispatch(duplicateFrame(frameIndex));
			},
		},
	];

	const destructiveItems: MenuItemProps[] = [
		{
			icon: <RestartAltOutlined />,
			label: 'Reset',
			onClick: () => dispatch(resetFrame(frameIndex)),
		},
		{
			icon: <DeleteOutlined />,
			label: 'Delete',
			disabled: framesLength === 1,
			onClick: () => {
				dispatch(
					addToHistory({
						frameIndex,
						type: FrameHistoryTypes.deleted,
					}),
				);
				dispatch(deleteFrame(frameIndex));
			},
		},
	];

	return (
		<>
			<Tooltip title={'Frame actions'} arrow>
				<IconButton
					id='frame-menu-button'
					aria-haspopup='true'
					aria-controls={isOpen ? 'frame-menu' : undefined}
					aria-expanded={isOpen ? 'true' : undefined}
					onClick={handleOpen}
				>
					<List />
				</IconButton>
			</Tooltip>
			<Menu
				id='frame-menu'
				open={isOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'frame-menu-button',
				}}
			>
				{additiveItems.map((itemProps, i) => (
					<UIMenuItem key={i} {...itemProps} onClose={handleClose} />
				))}
				<Divider />
				{destructiveItems.map((itemProps, i) => (
					<UIMenuItem key={i} {...itemProps} onClose={handleClose} />
				))}
			</Menu>
		</>
	);
};

export default FrameMenu;

{
}
