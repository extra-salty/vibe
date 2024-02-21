import useAnimationsColumnsProps from './useAnimationsColumns';
import { useAnimations } from '@/state/features/animations/animationSelector';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import TopToolbarInternalActions from '../TopToolbarActions/TopToolbarInternalActions/TopToolbarInternalActions';
import TopToolbarCustomActions from '../TopToolbarActions/TopToolbarCustomActions/TopToolbarCustomActions';
import useAnimationsStateProps from './useAnimationsStateProps';
import useAnimationsActionMenuProps from './useAnimationsActionMenuProps';

const Animations = () => {
	const animations = useAnimations();
	const stateProps = useAnimationsStateProps();
	const { columns, columnProps } = useAnimationsColumnsProps();
	const actionMenuProps = useAnimationsActionMenuProps();

	const table = useMaterialReactTable({
		data: animations.data,
		columns,
		...columnProps,
		...stateProps,
		...actionMenuProps,
		// Misc
		enablePagination: false,
		// Dragging
		enableRowOrdering: true,
		enableRowDragging: true,
		muiRowDragHandleProps: ({ table }) => ({
			onDragEnd: (asd) => {
				const { draggingRow, hoveredRow } = table.getState();
				console.log('🚀 ~ Animations ~ hoveredRow:', hoveredRow);
				console.log('🚀 ~ Animations ~ draggingRow:', draggingRow);
			},
		}),
		//
		// Styling
		muiTableContainerProps: { sx: { height: '700px' } },
		// muiTableHeadCellProps: { size: 'small' },
		//
		// Indexing
		enableRowNumbers: true,
		rowNumberDisplayMode: 'static',
		// getRowId: (row) => row._id,
		//
		// Toolbar
		// renderToolbarInternalActions: ({ table }) => (
		// 	<TopToolbarInternalActions table={table} type='animation' />
		// ),
		renderTopToolbarCustomActions: ({ table }) => {
			return (
				<TopToolbarCustomActions
					type='animation'
					selectedRows={table.getSelectedRowModel().rows.map((row) => row.original)}
				/>
			);
		},
		// Actions
		// enableRowActions: true,
		// positionActionsColumn: 'last',
		// renderRowActionMenuItems: ({ row }) => [
		// 	// <MenuItem key='edit' onClick={() => console.info('Edit')}>
		// 	// 	Edit
		// 	// </MenuItem>,
		// 	// <MenuItem key='delete' onClick={() => console.info('Delete')}>
		// 	// 	Delete
		// 	// </MenuItem>,
		// ],
	});

	return <MaterialReactTable table={table} />;
};

export default Animations;
