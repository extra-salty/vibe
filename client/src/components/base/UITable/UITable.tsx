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
				<tr key={`row-${i}`} onClick={(e) => handleRowSelect(e)}>
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
		<table className={classNames}>
			<thead>
				<tr>{header.map(renderTableHeader)}</tr>
			</thead>
			<tbody>{data.map(renderTableBody)}</tbody>
		</table>
	);
};

export default UITable = genericMemo(UITable);
