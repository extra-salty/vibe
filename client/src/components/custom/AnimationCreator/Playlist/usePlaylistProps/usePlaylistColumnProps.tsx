import { Tooltip } from '@mui/material';
import { Bolt, Layers, Numbers, Timelapse } from '@mui/icons-material';
import { AnimationsTableColumnsT, AnimationsTablePropsT } from '@/types/animation.types';
import PlaylistRowActions from '../PlaylistToolbarActions/PlaylistRowActions/PlaylistRowActions';

const usePlaylistColumns = (): {
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
					size: 48,
					grow: false,
					enableResizing: false,
					enablePinning: false,
				},
				'mrt-row-select': {
					size: 28,
					grow: false,
					enableResizing: false,
					enablePinning: false,
				},
				'mrt-row-numbers': {
					size: 28,
					grow: false,
					enableResizing: false,
					enablePinning: false,
					// Cell: ({ row }) => {
					// 	const parentIds = row
					// 		.getParentRow()
					// 		?.id.split('.')
					// 		.map((id) => Number(id) + 1)
					// 		.join('.');
					// 	const index = row.index + 1;

					// 	return row.depth ? `${parentIds}.${index}` : index;
					// },
				},
				'mrt-row-drag': {
					header: 'Drag',
					size: 40,
					minSize: 40,
					grow: false,
					enableResizing: false,
					enablePinning: false,
				},
			},
		},
		columns: [
			{
				accessorKey: 'index',
				header: 'Index',
				size: 60,
				Header: () => (
					<Tooltip title='Index'>
						<Numbers />
					</Tooltip>
				),
				Cell: ({ row }) => {
					const parentIds = row
						.getParentRow()
						?.id.split('.')
						.map((id) => Number(id) + 1)
						.join('.');
					const index = row.index + 1;

					return row.depth ? `${parentIds}.${index}` : index;
				},
			},
			{
				accessorKey: 'name',
				header: 'Name',
				minSize: 150,
				grow: true,
				enablePinning: false,
				enableHiding: false,
				Cell: ({ row }) => (
					<Tooltip title={row.original.description}>
						<span>{row.original.name}</span>
					</Tooltip>
				),
			},
			{
				accessorKey: '_id',
				header: 'ID',
				size: 200,
				enableResizing: false,
			},
			{
				accessorKey: 'type',
				header: 'Type',
				filterVariant: 'select',
				filterSelectOptions: ['static', 'group'],
				size: 110,
				enableResizing: false,
			},
			{
				accessorKey: 'description',
				header: 'Description',
				size: 200,
				enableResizing: true,
			},
			{
				accessorKey: 'framesLength',
				header: 'Frames',
				filterVariant: 'range',
				size: 60,
				enableResizing: false,
				Header: () => (
					<Tooltip title='Number of frames'>
						<Layers />
					</Tooltip>
				),
			},
			{
				accessorKey: 'duration',
				header: 'Duration',
				// filterVariant: 'range',
				size: 60,
				enableResizing: false,
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
				size: 60,
				// sortable: false,
				enableResizing: false,
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
				visibleInShowHideMenu: false,
				enableResizing: false,
				size: 36,
				Header: () => <div></div>,
				Cell: ({ row }) => {
					return <PlaylistRowActions row={row} />;
				},
			},
		],
	};
};

export default usePlaylistColumns;