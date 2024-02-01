import { GridColDef, GridColumnHeaderParams, GridRenderCellParams } from '@mui/x-data-grid';
import { Bolt, Layers, Timelapse } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { EffectTableT } from '@/types/effect.types';
import dayjs from 'dayjs';
import UILink from '@/components/base/UILink/UILink';

const useEffectTableHeader = (effects: EffectTableT[]): GridColDef[] => {
	return [
		{
			field: 'id',
			headerName: 'ID',
		},
		{
			field: 'index',
			headerName: '#',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 1,
			renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 140,
			renderCell: (params: GridRenderCellParams<any, string>) => (
				<UILink href={`effect/${params.value}`}>
					<Tooltip title={'description'}>
						<span>{params.value}</span>
					</Tooltip>
				</UILink>
			),
		},
		{
			field: 'frames',
			type: 'number',
			align: 'left',
			headerAlign: 'left',
			filterable: true,
			sortable: false,
			width: 70,
			description: 'asdasd',
			renderHeader: () => (
				<Tooltip title='Number of frames'>
					<Layers />
				</Tooltip>
			),
		},
		{
			field: 'duration',
			type: 'number',
			description: 'blablabla',
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
	];
};

export default useEffectTableHeader;
