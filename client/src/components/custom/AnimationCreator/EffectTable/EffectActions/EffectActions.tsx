import { useState } from 'react';
import { IconButton, Menu, Tooltip } from '@mui/material';
import UIMenuItem, { MenuItemProps } from '@/components/base/UIMenuItem/UIMenuItem';
import { ContentCopyOutlined, DeleteOutlined, Edit, MoreVert } from '@mui/icons-material';

const EffectActions = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const effectActions: MenuItemProps[] = [
		{
			icon: <Edit />,
			label: 'Edit',
			onClick: () => {},
		},
		{
			icon: <ContentCopyOutlined />,
			label: 'Duplicate',
			onClick: () => {},
		},
		{
			icon: <DeleteOutlined />,
			label: 'Delete',
			onClick: () => {},
		},
	];

	return (
		<div>
			<IconButton
				id='frame-menu-button'
				aria-haspopup='true'
				aria-controls={isOpen ? 'frame-menu' : undefined}
				aria-expanded={isOpen ? 'true' : undefined}
				onClick={handleOpen}
			>
				<MoreVert />
			</IconButton>
			<Menu
				id='frame-menu'
				open={isOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'frame-menu-button',
				}}
			>
				{effectActions.map((actionProps, i) => (
					<UIMenuItem key={i} {...actionProps} onClose={handleClose} />
				))}
			</Menu>
		</div>
	);
};

export default EffectActions;
