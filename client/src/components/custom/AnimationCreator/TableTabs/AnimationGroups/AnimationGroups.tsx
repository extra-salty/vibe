import useAnimationGroupColumnsProps from './useAnimationGroupsColumnProps';
import { useAnimations } from '@/state/features/animationGroups/animationSelector';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import TopToolbarInternalActions from '../TopToolbarActions/TopToolbarInternalActions/TopToolbarInternalActions';
import TopToolbarCustomActions from '../TopToolbarActions/TopToolbarCustomActions/TopToolbarCustomActions';
import useAnimationGroupStateProps from './useAnimationGroupsStateProps';
import useAnimationGroupsComponentProps from './useAnimationGroupComponentProps';

const AnimationGroups = () => {
	const animations = useAnimations();
	const stateProps = useAnimationGroupStateProps();
	const { columns, columnProps } = useAnimationGroupColumnsProps();
	const actionMenuProps = useAnimationGroupsComponentProps();

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

export default AnimationGroups;
