import { UITableOptionsProps } from '../UITable.types';
import UIInput from '../../UIInput/UIInput';
import UISelect from '../../UISelect/UISelect';

const UITableOptions = ({ options }: { options: UITableOptionsProps }) => {
	const { filterOptions, setSelectedOptions: setOptions } = options;
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
			{filterOptions ? (
				<div className='flex'>
					<UISelect
						options={filterOptions}
						onChange={(value: string) => handleOptionChange({ filterOptionValue: value })}
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
