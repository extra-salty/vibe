import { genericMemo } from '@/misc/helpers/helpers';
import { UITableProps } from './UITable.types';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UISortableTableHeader from './UISortableTableHeader/UISortableTableHeader';
import './UITable.scss';

let UITable = <T, _>({ data, header, options, hidden, classes }: UITableProps<T>) => {
	if (hidden) return null;
	return (
		<table className={appendClasses(['uiTable', classes])}>
			<thead>
				<tr>
					{header.map(({ id, header, classes, isSortable }) => (
						<th key={id} className={appendClasses([isSortable && 'sortable', classes])}>
							{isSortable ? (
								<UISortableTableHeader id={id} options={options}>
									{header}
								</UISortableTableHeader>
							) : (
								header
							)}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{data.map((row: any, i) => {
					return (
						<tr key={`row-${i}`}>
							{header.map((column, j) => {
								return <td key={`cell-${j}`}>{row[column.id]}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default UITable = genericMemo(UITable);
