import { Tooltip } from '@mui/material';
import { Bolt, Layers, Timelapse } from '@mui/icons-material';
import { MRT_ColumnDef } from 'material-react-table';
import { AnimationsTableColumnsT, AnimationsTablePropsT } from '@/types/animation.types';
import RowActionMenuItems from '../../../TableComps/RowActionMenuItems/RowActionMenuItems';
import dayjs from 'dayjs';

const useAnimationsColumnsProps = (): {
	columnProps: AnimationsTablePropsT;
	columns: AnimationsTableColumnsT;
} => {
	return {
		columnProps: {
			enableColumnResizing: true,
			// layoutMode: 'semantic',
			columnResizeMode: 'onEnd',
			defaultColumn: {
				minSize: 24,
				size: 24,
				maxSize: 200,
			},
			displayColumnDefOptions: {
				'mrt-row-expand': {
					size: 28,
					grow: false,
					enableResizing: false,
				},
				'mrt-row-select': {
					size: 28,
					grow: false,
					enableResizing: false,
				},
				'mrt-row-numbers': {
					// Header: <Numbers fontSize='small' />,
					size: 28,
					grow: false,
					enableResizing: false,
				},
			},
		},
		columns: [
			{
				accessorKey: '_id',
				header: 'ID',
				// filterable: false,
				// width: 220,
			},
			{
				accessorKey: 'name',
				header: 'Name',
				minSize: 150,
				grow: true,
				Cell: ({ row }) => (
					<Tooltip title={row.original.description}>
						<span>{row.original.name}</span>
					</Tooltip>
				),
			},
			{
				accessorKey: 'type',
				header: 'Type',
				size: 80,
				enableResizing: false,
			},
			{
				accessorKey: 'description',
				header: 'Description',
				// width: 200,
				// sortable: false,
			},
			{
				accessorKey: 'framesLength',
				header: 'Frames',
				// type: 'number',
				// sortable: false,
				// filterable: true,
				size: 30,
				Header: () => (
					<Tooltip title='Number of frames'>
						<Layers />
					</Tooltip>
				),
			},
			{
				accessorKey: 'duration',
				header: 'Duration',
				// sortable: false,
				size: 30,
				// filterVariant: 'range',
				Header: () => (
					<Tooltip title='Duration'>
						<Timelapse />
					</Tooltip>
				),
				Cell: ({ cell }) => Number((cell.getValue<number>() / 1000).toFixed(2)),
			},
			{
				accessorKey: 'power',
				header: 'Power consumption',
				// sortable: false,
				size: 30,
				Header: () => (
					<Tooltip title='Power consumption'>
						<Bolt />
					</Tooltip>
				),
			},
			{
				accessorKey: 'dateModified',
				header: 'Modified',
				size: 120,
				enableResizing: false,
				Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format('YY/MM/DD HH:MM:ss'),
			},
			{
				accessorKey: 'dateCreated',
				header: 'Created',
				size: 120,
				enableResizing: false,
				Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format('YY/MM/DD HH:MM:ss'),
			},
			// {
			// 	field: 'drag',
			// 	headerName: 'Drag',
			// 	sortable: false,
			// 	filterable: false,
			// 	disableColumnMenu: true,
			// 	width: 60,
			// 	renderCell: (params: GridRenderCellParams<any, string>) => (
			// 		<AnimationTableDragButton animation={params.row} />
			// 		// <Tooltip title={params.row.description}>
			// 		// 	<div>Asd</div>
			// 		// </Tooltip>
			// 	),
			// },
			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnActions: false,
				enablePinning: true,
				enableSorting: false,
				visibleInShowHideMenu: false,
				enableResizing: false,
				size: 24,
				Header: () => <div></div>,
				Cell: ({ row }) => <RowActionMenuItems type='animation' row={row.original} />,
			},
		],
	};
};

export default useAnimationsColumnsProps;
