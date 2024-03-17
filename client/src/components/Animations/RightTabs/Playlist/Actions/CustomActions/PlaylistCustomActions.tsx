import { useDispatch } from 'react-redux';
import { usePlaylistRowSelection } from '@/state/features/playlist/playlistSelector';
import { memo, useState } from 'react';
import { Box, IconButton, SvgIconProps, Tooltip, Typography } from '@mui/material';
import { AnimationsTableInstanceT } from '@/types/animation.types';
import { PlaylistRemove, Save, SaveAs } from '@mui/icons-material';
import RemoveDialog from '../../../../RightTabs/Playlist/Dialogs/RemoveDialog/RemoveDialog';

const PlaylistCustomActions = ({ table }: { table: AnimationsTableInstanceT }) => {
	const dispatch = useDispatch();
	const isSelectionEmpty = !Object.keys(usePlaylistRowSelection()).length;

	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState<boolean>(false);

	const actions: {
		title: string;
		disabled: boolean;
		icon: React.ReactElement<SvgIconProps>;
		onClick: () => void;
	}[] = [
		{
			title: 'Remove from playlist',
			disabled: isSelectionEmpty,
			icon: <PlaylistRemove />,
			onClick: () => setIsRemoveDialogOpen(true),
		},
		{
			title: 'Save as new group',
			disabled: isSelectionEmpty,
			icon: <SaveAs />,
			onClick: () => {},
		},
		{
			title: 'Save each group',
			disabled: isSelectionEmpty,
			icon: <Save />,
			onClick: () => {},
		},
	];

	return (
		<Box sx={{ display: 'flex' }}>
			<RemoveDialog open={isRemoveDialogOpen} setOpen={setIsRemoveDialogOpen} />
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				{/* <Typography variant='h6' sx={{ marginInline: '10px' }}>
					Playlist:
				</Typography> */}
				{actions.map(({ title, icon, disabled, onClick }, i) => (
					<Tooltip key={i} title={title}>
						<span>
							<IconButton disabled={disabled} onClick={onClick}>
								{icon}
							</IconButton>
						</span>
					</Tooltip>
				))}
			</Box>
		</Box>
	);
};

export default memo(PlaylistCustomActions);
