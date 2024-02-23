import { memo } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { AnimationsTableInstanceT } from '@/types/animation.types';
import { PlaylistRemove, Save, SaveAs } from '@mui/icons-material';
import { usePlaylistRowSelection } from '@/state/features/playlist/playlistSelector';

const PlaylistCustomActions = ({ table }: { table: AnimationsTableInstanceT }) => {
	const isSelectionEmpty = !Object.keys(usePlaylistRowSelection()).length;

	return (
		<Box sx={{ display: 'flex' }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant='h6' sx={{ marginInline: '10px' }}>
					Playlist:
				</Typography>
				<Tooltip title='Remove from playlist'>
					<span>
						<IconButton disabled={isSelectionEmpty} onClick={() => {}}>
							<PlaylistRemove />
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip title='Save as new group'>
					<span>
						<IconButton
							// disabled={isResetDisabled}
							onClick={() => {}}
						>
							<SaveAs />
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip title='Save each'>
					<span>
						<IconButton
							// disabled={isResetDisabled}
							onClick={() => {}}
						>
							<Save />
						</IconButton>
					</span>
				</Tooltip>
			</Box>
		</Box>
	);
};

export default memo(PlaylistCustomActions);
