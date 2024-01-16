import { genericMemo } from '@/misc/helpers/helpers';
import { UITableProps } from './UITable.types';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UITableOptions from './UITableOptions/UITableOptions';
import UITableActions from './UITableActions/UITableActions';
import './UITable.scss';

let UITable = <T, _>({ data, header, actions, options, hidden, classes }: UITableProps<T>) => {
	if (hidden) return null;
	return (
		<div>
			<div className='flex gap-4'>
				{actions ? <UITableActions actions={actions} /> : null}
				{options ? <UITableOptions options={options} /> : null}
			</div>
			<div className='max-h-96 overflow-auto'>
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
		</div>
	);
};

export default UITable = genericMemo(UITable);
