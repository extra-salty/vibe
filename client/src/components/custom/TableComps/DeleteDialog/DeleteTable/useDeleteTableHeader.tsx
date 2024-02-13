import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { Layers, Numbers, Timelapse } from '@mui/icons-material';
import dayjs from 'dayjs';

const useDeleteTableHeader = (): GridColDef[] => {
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
			renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
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
			sortable: false,
			width: 200,
		},
		{
			field: 'framesLength',
			headerName: 'Frames',
			type: 'number',
			sortable: false,
			width: 50,
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
			width: 50,
			renderHeader: () => (
				<Tooltip title='Duration'>
					<Timelapse />
				</Tooltip>
			),
			valueFormatter: (params) => (params.value / 1000).toFixed(2),
		},
		{
			field: 'dateModified',
			headerName: 'Date modified',
			type: 'dateTime',
			width: 140,
			valueFormatter: (params) => dayjs(params.value).format('YY/MM/DD HH:MM:ss'),
		},
	];
};

export default useDeleteTableHeader;
