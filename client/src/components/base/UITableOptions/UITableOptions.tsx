import { UISelectOptionProps } from '../UISelect/UISelect.type';
import UIInput from '../UIInput/UIInput';
import UISelect from '../UISelect/UISelect';

export type UITableOptionsProps = {
	sortOptions?: UISelectOptionProps[];
	filterOptions?: UISelectOptionProps[];
	setOptions: React.Dispatch<React.SetStateAction<UITableOptionsValueT>>;
};

export type UITableOptionsValueT = {
	sortOptionValue: string;
	filterOptionValue: string;
	filterValue: string;
};

const UITableOptions = ({ options }: { options: UITableOptionsProps }) => {
	const { sortOptions, filterOptions, setOptions } = options;
	// fix - keyof
	const handleOptionChange = (newOption: { [k: string]: string }) => {
		setOptions((prevOptions) => {
			return {
				...prevOptions,
				...newOption,
			};
		});
	};

	return (
		<div className='flex justify-between'>
			{sortOptions ? (
				<div>
					<UISelect
						label='Sort by:'
						options={sortOptions}
						onChange={(value: string) => {
							handleOptionChange({ sortOptionValue: value });
						}}
					/>
				</div>
			) : null}
			{filterOptions ? (
				<div className='flex'>
					<UISelect
						options={filterOptions}
						onChange={(value: string) => handleOptionChange({ filterOptionValue: value })}
						label='Filter by:'
					/>
					<UIInput
						placeholder='Enter filter value'
						onChange={(value: string) => handleOptionChange({ filterValue: value })}
					/>
				</div>
			) : null}
		</div>
	);
};

export default UITableOptions;
