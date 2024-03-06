import { useDispatch } from 'react-redux';
import NumberInput from '@/components/misc/NumberInput/NumberInput';

const DurationInput = ({
	frameIndex,
	duration,
}: {
	frameIndex: number;
	duration: number;
}) => {
	const dispatch = useDispatch();

	return (
		<NumberInput
			value={duration}
			min={0}
			max={10000}
			aria-label='duration-input'
			placeholder='Set duration'
			onChange={(
				_: React.FocusEvent | React.PointerEvent | React.KeyboardEvent,
				value: number | undefined,
			) => {}}
			//  dispatch(setFrameDuration({ frameIndex, value: Number(value) }))}
		/>
	);
};

export default DurationInput;
