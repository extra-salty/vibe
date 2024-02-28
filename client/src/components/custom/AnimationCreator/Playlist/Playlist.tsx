import usePlaylistColumns from './usePlaylistProps/usePlaylistColumnProps';
import usePlaylistStateProps from './usePlaylistProps/usePlaylistStateProps';
import usePlaylistComponentProps from './usePlaylistProps/usePlaylistComponentProps';
import { usePlaylistData } from '@/state/features/playlist/playlistSelector';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const Playlist = () => {
	const data = usePlaylistData();
	const { columns, columnProps } = usePlaylistColumns();
	const stateProps = usePlaylistStateProps();
	const componentProps = usePlaylistComponentProps();

	const table = useMaterialReactTable({
		data,
		columns,
		...columnProps,
		...stateProps,
		...componentProps,
		// Styling
		muiTableContainerProps: { sx: { height: '80vh' } },
		// Misc
		enablePagination: false,
		enableRowNumbers: true,
		rowNumberDisplayMode: 'original',
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
		getSubRows: (row) => row.children,
		//
	});

	return <MaterialReactTable table={table} />;
};

export default Playlist;
