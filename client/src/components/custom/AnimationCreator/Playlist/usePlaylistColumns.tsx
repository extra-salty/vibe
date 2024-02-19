import { Tooltip } from '@mui/material';
import { Bolt, Layers, Timelapse } from '@mui/icons-material';
import { MRT_ColumnDef } from 'material-react-table';
import { AnimationBaseT } from '@/types/animation.types';

const usePlaylistColumns = (): MRT_ColumnDef<AnimationBaseT>[] => {
	return [
		// {
		// 	field: 'index',
		// 	headerName: 'Index',
		// 	type: 'number',
		// 	align: 'left',
		// 	headerAlign: 'left',
		// 	sortable: false,
		// 	filterable: false,
		// 	hideable: false,
		// 	disableColumnMenu: true,
		// 	width: 1,
		// 	renderHeader: () => (
		// 		<Tooltip title='Index'>
		// 			<Numbers />
		// 		</Tooltip>
		// 	),
		// 	renderCell: (params) =>
		// 		params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
		// },
		{
			accessorKey: '_id',
			header: 'ID',
			// filterable: false,
			// width: 220,
		},
		{
			accessorKey: 'name',
			header: 'Name',
			size: 100,
			Cell: ({ row }) => (
				<Tooltip title={row.original.description}>
					<span>{row.original.name}</span>
				</Tooltip>
			),
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
			visibleInShowHideMenu: false,
			// sortable: false,
			size: 30,
			filterVariant: 'range',
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
			size: 20,
			// width: 1,
			Header: () => <div></div>,
			Cell: ({ row }) => <div></div>,
		},
	];
};

export default usePlaylistColumns;
