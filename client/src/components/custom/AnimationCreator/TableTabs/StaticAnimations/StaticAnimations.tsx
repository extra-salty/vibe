import useStaticAnimationsColumnProps from './useStaticAnimationsColumnProps';
import useStaticAnimationsStateProps from './useStaticAnimationsStateProps';
import useStaticAnimationsComponentProps from './useStaticAnimationsComponentProps';
import { useStaticAnimationsData } from '@/state/features/staticAnimations/staticAnimationsSelector';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const StaticAnimations = <DataT,>() => {
	const data = useStaticAnimationsData();
	const { columns, columnProps } = useStaticAnimationsColumnProps();
	const stateProps = useStaticAnimationsStateProps();
	const componentProps = useStaticAnimationsComponentProps();

	const table = useMaterialReactTable({
		data,
		columns,
		...columnProps,
		...stateProps,
		...componentProps,
		// Dragging
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
	});

	return <MaterialReactTable table={table} />;
};

export default StaticAnimations;
