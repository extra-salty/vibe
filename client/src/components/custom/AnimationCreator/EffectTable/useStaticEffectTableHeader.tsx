import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Bolt, Layers, Numbers, Timelapse } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import StaticEffectTableActions from './StaticEffectTableActions/StaticEffectTableActions';
import dayjs from 'dayjs';

const useStaticEffectTableHeader = (): GridColDef[] => {
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
			// renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
			renderCell: (params) => 1,
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
			field: 'frames',
			headerName: 'Frames',
			type: 'number',
			align: 'left',
			headerAlign: 'left',
			filterable: true,
			sortable: false,
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
			align: 'left',
			headerAlign: 'left',
			sortable: false,
			width: 70,
			renderHeader: () => (
				<Tooltip title='Duration'>
					<Timelapse />
				</Tooltip>
			),
		},
		{
			field: 'power',
			headerName: 'Power consumption',
			type: 'number',
			align: 'left',
			headerAlign: 'left',
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
		},
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 1,
			renderHeader: () => null,
			renderCell: () => <StaticEffectTableActions />,
		},
	];
};

export default useStaticEffectTableHeader;
