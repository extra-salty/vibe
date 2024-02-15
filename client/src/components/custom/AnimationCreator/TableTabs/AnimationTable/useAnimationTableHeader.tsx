import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { Bolt, Layers, Numbers, Timelapse } from '@mui/icons-material';
import TableRowMenu from '../../../TableComps/TableRowMenu/TableRowMenu';
import AnimationTableDragButton from './AnimationTableDragButton/AnimationTableDragButton';
import dayjs from 'dayjs';

const useAnimationTableHeader = (): GridColDef[] => {
	return [
		{
			field: 'index',
			headerName: 'Index',
			type: 'number',
			align: 'left',
			headerAlign: 'left',
			sortable: false,
			filterable: false,
			hideable: false,
			disableColumnMenu: true,
			width: 1,
			renderHeader: () => (
				<Tooltip title='Index'>
					<Numbers />
				</Tooltip>
			),
			renderCell: (params) =>
				params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
		},
		{
			field: '_id',
			headerName: 'ID',
			filterable: false,
			width: 220,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 140,
			renderCell: (params: GridRenderCellParams<any, string>) => (
				<Tooltip title={params.row.description}>
					<span>{params.value}</span>
				</Tooltip>
			),
		},
		{
			field: 'description',
			headerName: 'Description',
			width: 200,
			sortable: false,
		},
		{
			field: 'framesLength',
			headerName: 'Frames',
			type: 'number',
			sortable: false,
			filterable: true,
			width: 70,
			renderHeader: () => (
				<Tooltip title='Number of frames'>
					<Layers />
				</Tooltip>
			),
		},
		{
			field: 'duration',
			headerName: 'Duration',
			type: 'number',
			sortable: false,
			width: 70,
			renderHeader: () => (
				<Tooltip title='Duration'>
					<Timelapse />
				</Tooltip>
			),
			valueFormatter: (params) => Number((params.value / 1000).toFixed(2)),
		},
		{
			field: 'power',
			headerName: 'Power consumption',
			type: 'number',
			sortable: false,
			width: 70,
			renderHeader: () => (
				<Tooltip title='Power consumption'>
					<Bolt />
				</Tooltip>
			),
		},
		{
			field: 'dateModified',
			headerName: 'Date modified',
			type: 'dateTime',
			width: 140,
			valueFormatter: (params) => dayjs(params.value).format('YY/MM/DD HH:MM:ss'),
		},
		{
			field: 'dateCreated',
			headerName: 'Date created',
			type: 'dateTime',
			width: 140,
			valueFormatter: (params) => dayjs(params.value).format('YY/MM/DD HH:MM:ss'),
		},
		{
			field: 'drag',
			headerName: 'Drag',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 60,
			renderCell: (params: GridRenderCellParams<any, string>) => (
				<AnimationTableDragButton animation={params.row} />
				// <Tooltip title={params.row.description}>
				// 	<div>Asd</div>
				// </Tooltip>
			),
		},
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 1,
			renderHeader: () => null,
			renderCell: (params) => (
				<TableRowMenu
					type='animation'
					rowParams={{
						_id: params.row._id,
						name: params.row.name,
						description: params.row.description,
					}}
				/>
			),
		},
	];
};

export default useAnimationTableHeader;
