import Icon, { Icons } from '../Icon/Icon';
import './Control.scss';

type ControlType = {
	value: number;
	max: number;
	onChange: (e: any) => void;
};

const Control = ({ value, max, onChange }: ControlType) => {
	return (
		<input
			className='control'
			type='number'
			min='10'
			max='100'
		/>
		// <div className='control'>
		// 	<div className='value'>{value}</div>
		// 	<div className='increment'>
		// 		<Icon
		// 			name={Icons.expandMore}
		// 			height={10}
		// 			classes='reverse'
		// 		/>
		// 		<Icon
		// 			name={Icons.expandMore}
		// 			height={10}
		// 		/>
		// 	</div>
		// </div>
	);
};

export default Control;
