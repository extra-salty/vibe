import { useCallback } from 'react';
import { genericMemo } from '@/misc/helpers/helpers';
import UITableProps, { UITableHeaderType } from './UITable.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UITable.scss';

let UITable = <T, K extends keyof T>({ data, header, hidden, classes }: UITableProps<T, K>) => {
	const handleRowSelect = useCallback((e: any) => {}, []);

	const renderTableHeader = useCallback(
		({ header, classes }: UITableHeaderType<T, K>, i: number) => {
			return (
				<th key={`headCell-${i}`} className={classes || ''}>
					{header}
				</th>
			);
		},
		[],
	);

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

	const classNames = appendClasses(['uiTable', classes]);

	if (hidden) return null;
	return (
		<div className={classNames}>
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

export default UITable = genericMemo(UITable);
