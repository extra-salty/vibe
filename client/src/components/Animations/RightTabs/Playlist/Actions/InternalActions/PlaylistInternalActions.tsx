import { useDispatch } from 'react-redux';
import { useAnimationsState } from '@/state/features/animationGroups/animationSelector';
import { isEqual } from 'lodash';
import { animationsActions } from '@/state/features/animationGroups/animationSlice';
import { AnimationsTableInstanceT } from '@/types/animation.types';
import {
	MRT_GlobalFilterTextField,
	MRT_ShowHideColumnsButton,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleFullScreenButton,
	MRT_ToggleGlobalFilterButton,
} from 'material-react-table';
import { RestartAlt } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { initialPlaylistState } from '@/state/features/playlist/playlistSlice';

const PlaylistInternalActions = ({ table }: { table: AnimationsTableInstanceT }) => {
	const dispatch = useDispatch();
	const state = useAnimationsState();

	const isResetDisabled = isEqual(state, initialPlaylistState);

	return (
		<>
			{/* <MRT_GlobalFilterTextField table={table} /> */}
			<MRT_ToggleGlobalFilterButton table={table} />
			<MRT_ToggleFiltersButton table={table} />
			<MRT_ShowHideColumnsButton table={table} />
			<MRT_ToggleDensePaddingButton table={table} />
			<MRT_ToggleFullScreenButton table={table} />
			<Tooltip title='Reset the table'>
				<span>
					<IconButton
						disabled={isResetDisabled}
						onClick={() => dispatch(animationsActions.resetState())}
					>
						<RestartAlt />
					</IconButton>
				</span>
			</Tooltip>
		</>
	);
};

export default PlaylistInternalActions;
