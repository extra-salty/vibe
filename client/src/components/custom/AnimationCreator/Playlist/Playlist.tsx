import usePlaylistColumns from './usePlaylistColumns';
import { usePlaylistData } from '@/state/features/playlist/playlistSelector';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Typography } from '@mui/material';

const Playlist = () => {
	const data = usePlaylistData();
	const { columns, columnProps } = usePlaylistColumns();

	const table = useMaterialReactTable({
		data,
		columns,
		...columnProps,
		// Styling
		muiTableContainerProps: { sx: { height: '700px' } },
		//
		enablePagination: false,
		// Dragging
		enableRowOrdering: true,
		muiRowDragHandleProps: ({ table }) => ({
			onDragEnd: (asd) => {
				const { draggingRow, hoveredRow } = table.getState();
				console.log('🚀 ~ Animations ~ hoveredRow:', hoveredRow);
				console.log('🚀 ~ Animations ~ draggingRow:', draggingRow);
			},
		}),
		// Expand
		enableExpandAll: true,
		enableExpanding: true,
		getSubRows: (row) => row.group,
		//
	});

	return (
		<Box sx={{ height: '900px' }}>
			<Typography sx={{ margin: '20px' }} variant='body2'>
				PLAYLIST
			</Typography>
			<MaterialReactTable table={table} />
		</Box>
	);
};

export default Playlist;
