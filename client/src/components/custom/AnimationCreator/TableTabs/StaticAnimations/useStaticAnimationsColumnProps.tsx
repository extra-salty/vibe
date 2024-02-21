import { Tooltip } from '@mui/material';
import { Bolt, Layers, Timelapse } from '@mui/icons-material';
import dayjs from 'dayjs';
import {
	StaticAnimationTableColumnsT,
	StaticAnimationTablePropsT,
} from '@/types/staticAnimation.types';
import RowActionMenuItems from '../../../TableComps/RowActionMenuItems/RowActionMenuItems';

const useStaticAnimationsColumnProps = (): {
	columnProps: StaticAnimationTablePropsT;
	columns: StaticAnimationTableColumnsT;
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
				},
				'mrt-row-drag': {
					header: 'Drag',
					size: 40,
					grow: false,
					enableResizing: false,
					enablePinning: false,
				},
			},
		},
		columns: [
			{
				accessorKey: 'name',
				header: 'Name',
				minSize: 100,
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
				enableResizing: false,
				size: 200,
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
				size: 60,
				enableResizing: false,
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
				size: 60,
				enableResizing: false,
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
			// {
			// 	accessorKey: 'dateCreated',
			// 	header: 'Created',
			// 	size: 120,
			// 	enableResizing: false,
			// 	Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format('YY/MM/DD HH:MM:ss'),
			// },
		],
	};
};

export default useStaticAnimationsColumnProps;

// {
// 	accessorKey: 'actions',
// 	header: 'Actions',
// 	enableColumnActions: false,
// 	enablePinning: true,
// 	enableSorting: false,
// 	size: 20,
// 	// width: 1,
// 	Header: () => <div></div>,
// 	Cell: ({ row }) => <RowActionMenuItems type='animation' row={row.original} />,
// },
