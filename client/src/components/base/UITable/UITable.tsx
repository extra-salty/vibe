import { genericMemo } from '@/misc/helpers/helpers';
import { UITableProps } from './UITable.types';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UITableOptions from '../UITableOptions/UITableOptions';
import './UITable.scss';

let UITable = <T, _>({ data, header, options, hidden, classes }: UITableProps<T>) => {
	if (hidden) return null;
	return (
		<div>
			{options ? <UITableOptions options={options} /> : null}
			<table className={appendClasses(['uiTable', classes])}>
				<thead>
					<tr>
						{header.map(({ header, classes }, i) => {
							return (
								<th key={`headCell-${i}`} className={classes || ''}>
									{header}
								</th>
							);
						})}
					</tr>
				</thead>

				<tbody>
					{data.map((row: any, i) => {
						return (
							<tr key={`row-${i}`}>
								{header.map((column, j) => {
									return <td key={`cell-${j}`}>{row[column.key]}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default UITable = genericMemo(UITable);
