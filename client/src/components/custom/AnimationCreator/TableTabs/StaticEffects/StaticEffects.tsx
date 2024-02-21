import useStaticEffectsColumns from './useStaticEffectsColumns';
import { useStaticEffectsData } from '@/state/features/staticEffects/staticEffectsSelector';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import TopToolbarInternalActions from '../TopToolbarActions/TopToolbarInternalActions/TopToolbarInternalActions';
import TopToolbarCustomActions from '../TopToolbarActions/TopToolbarCustomActions/TopToolbarCustomActions';
import useStaticEffectsStateProps from './useStaticEffectsStateProps';

const StaticEffects = () => {
	const data = useStaticEffectsData();
	const columns = useStaticEffectsColumns();
	const stateProps = useStaticEffectsStateProps();
	// const actionMenuProps = useAnimationsActionMenuProps();

	const table = useMaterialReactTable({
		data,
		columns,
		...stateProps,
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
		enablePagination: false,
		// Styling
		muiTableContainerProps: { sx: { height: '700px' } },
		// layoutMode: 'semantic',
		// muiTableHeadCellProps: { size: 'small' },
		//
		// Indexing
		enableRowNumbers: true,
		rowNumberDisplayMode: 'static',
		getRowId: (row) => row._id,
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

export default StaticEffects;
