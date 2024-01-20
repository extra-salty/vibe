import { Icons } from '../../UIIcon/UIIcon.types';
import { SortDirection, UITableOptionsProps } from '../UITable.types';
import UIIcon from '../../UIIcon/UIIcon';
import styles from './UISortableTableHeader.module.scss';

const UISortableTableHeader = ({
	children,
	id,
	options,
}: {
	children: React.ReactNode;
	id: string;
	options: UITableOptionsProps;
}) => {
	const handleSorting = () => {
		options.setSelectedOptions((prevOptions) => {
			return {
				...prevOptions,
				sortOptionValue: id,
				sortDirection:
					prevOptions.sortDirection === SortDirection.asc ? SortDirection.des : SortDirection.asc,
			};
		});
	};

	const isSortActive = options.selectedOptions?.sortOptionValue === id;
	const isFlipped = options.selectedOptions?.sortDirection === SortDirection.des;

	return (
		<div onClick={handleSorting} className={styles.header}>
			{children}
			{isSortActive && (
				<UIIcon name={Icons.next} width={12} height={12} isRotated isFlipped={isFlipped} />
			)}
		</div>
	);
};

export default UISortableTableHeader;
