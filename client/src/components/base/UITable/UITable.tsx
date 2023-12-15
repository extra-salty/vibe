import React, { useCallback, useState } from 'react';
import { Icons } from '../UIIcon/UIIcon.type';
import UITableType, { UITableColumnType } from './UITable.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UIButtonProps from '../UIButton/UIButton.type';
import UIButton from '../UIButton/UIButton';
import './UITable.scss';

const UITable = <T, K extends keyof T>({ data, header, hidden, classes }: UITableType<T, K>) => {
	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const handleRowSelect = useCallback((e: any) => {}, []);

	const renderTableHeader = useCallback(({ text, classes }: UITableColumnType<T, K>, i: number) => {
		return (
			<th key={`headCell-${i}`} className={classes || ''}>
				{text}
			</th>
		);
	}, []);

	const renderTableBody = useCallback(
		(row: any, i: number) => {
			return (
				<tr key={`row-${i}`} data-item={i} onClick={(e) => handleRowSelect(e)}>
					{header.map((column, j) => {
						return <td key={`cell-${j}`}>{row[column.key]}</td>;
					})}
				</tr>
			);
		},
		[handleRowSelect, header],
	);

	const handleCreateEffect = () => {
		// getkv;
	};

	const actions: UIButtonProps[] = [
		{
			text: 'get',
			// onClick: get(),
			onClick: () => {},
		},
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
						<tr>{header.map(renderTableHeader)}</tr>
					</thead>
					<tbody>{data.map(renderTableBody)}</tbody>
				</table>
			</div>
		</div>
	);
};

export default UITable;
