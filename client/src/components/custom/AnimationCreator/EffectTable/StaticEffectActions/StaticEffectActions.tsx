import { useState } from 'react';
import { useAnimationTableSelection } from '@/state/features/animation/animationSelector';
import { IconButton, Menu } from '@mui/material';
import { ContentCopyOutlined, DeleteOutlined, Edit, MoreVert } from '@mui/icons-material';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import UIMenuItem, { MenuItemProps } from '@/components/base/UIMenuItem/UIMenuItem';

const StaticEffectActions = () => {
	const selectedStaticEffects = useAnimationTableSelection();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleDuplicateEffect = async () => {
		// setButtonLoadings((s) => ({ ...s, duplicate: true }));

		try {
			// await EffectServiceInstance.duplicateEffect(selectedEffects[0]);
			// handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			// setButtonLoadings((s) => ({ ...s, duplicate: false }));
		}
	};

	const handleDeleteEffects = async () => {
		// setButtonLoadings((s) => ({ ...s, delete: true }));

		try {
			await EffectsServiceInstance.deleteEffects(selectedStaticEffects);

			// handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			// setButtonLoadings((s) => ({ ...s, delete: false }));
		}
	};

	const effectActions: MenuItemProps[] = [
		{
			icon: <Edit />,
			label: 'Edit',
			onClick: () => {},
		},
		{
			icon: <ContentCopyOutlined />,
			label: 'Duplicate',
			onClick: handleDuplicateEffect,
		},
		{
			icon: <DeleteOutlined />,
			label: 'Delete',
			onClick: handleDeleteEffects,
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

export default StaticEffectActions;