import { memo } from 'react';
import { RestartAlt } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { AnimationT } from '@/types/animation.types';
import {
	MRT_GlobalFilterTextField,
	MRT_RowData,
	MRT_ShowHideColumnsButton,
	MRT_TableInstance,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleFullScreenButton,
	MRT_ToggleGlobalFilterButton,
} from 'material-react-table';
import { initialTableState } from '@/types/table.types';

const TopToolbarInternalActions = <Data extends MRT_RowData>({
	table,
	isResetDisabled,
	onReset,
}: {
	table: MRT_TableInstance<Data>;
	isResetDisabled: boolean;
	onReset: () => {};
}) => {
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
					<IconButton disabled={isResetDisabled} onClick={() => onReset()}>
						<RestartAlt />
					</IconButton>
				</span>
			</Tooltip>
		</>
	);
};

export default TopToolbarInternalActions;
