import React, { useCallback, useState } from 'react';
import { Icons } from '../UIIcon/UIIcon.type';
import UITableType, { TableColumnType } from './UITable.type';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import UIButtonProps from '../UIButton/UIButton.type';
import UIButton from '../UIButton/UIButton';
import './UITable.scss';

const UITable = <T, K extends keyof T>({ data, columns, hidden, classes }: UITableType<T, K>) => {
	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const handleRowSelect = useCallback((e: any) => {}, []);

	const renderTableHeader = useCallback(({ header, classes }: TableColumnType<T, K>, i: number) => {
		return (
			<th key={`headCell-${i}`} className={classes || ''}>
				{header}
			</th>
		);
	}, []);

	const renderTableBody = useCallback(
		(row: any, i: number) => {
			return (
				<tr key={`row-${i}`} data-item={i} onClick={(e) => handleRowSelect(e)}>
					{columns.map((column, j) => {
						return <td key={`cell-${j}`}>{row[column.key]}</td>;
					})}
				</tr>
			);
		},
		[columns, handleRowSelect],
	);

	const actions: UIButtonProps[] = [
		{
			text: 'Delete',
			onClick: () => {},
		},
		{
			text: 'Duplicate',
			onClick: () => {},
		},
		{
			text: 'Read only',
			onClick: () => {},
		},
	];

	const renderActions = (props: UIButtonProps, i: number) => {
		return <UIButton key={i} {...props} />;
	};

	const renderSortActions = (props: UIButtonProps) => {
		return <UIButton {...props} />;
	};

	const classNames = appendClasses(['uiTable', classes]);

	if (hidden) return null;
	return (
		<div className={classNames}>
			<div className='actions'>{actions.map(renderActions)}</div>
			{/* <div className='sortActions'>{sortActions.map(renderSortActions)}</div> */}
			<div className='tableWrapper'>
				<table>
					<thead>
						<tr>{columns.map(renderTableHeader)}</tr>
					</thead>
					<tbody>{data.map(renderTableBody)}</tbody>
				</table>
			</div>
		</div>
	);
};

export default UITable;
