import { useDispatch } from 'react-redux';
import { setFrameDuration } from '@/state/features/effect/effectSlice';
import { Slider } from '@mui/material';
import { useState } from 'react';

const DurationSlider = ({ frameIndex, duration }: { frameIndex: number; duration: number }) => {
	const dispatch = useDispatch();
	const [value, setValue] = useState<number>(0);

	const intervals: number[] = [1, 2, 5, 10, 100];
	let [max, sliderTransform] = scaleTransform(1, 10000, intervals);

	return (
		<Slider
			size='small'
			value={value}
			min={0}
			max={max}
			aria-label='duration-slider'
			onChange={(_: Event, value: number | number[]) => {
				dispatch(setFrameDuration({ frameIndex, value: sliderTransform(Number(value)) }));
				setValue(Number(value));
			}}
			sx={{
				'& .MuiSlider-rail': {
					opacity: '1',
				},
				'& .MuiSlider-track': {
					display: 'none',
				},
				'& .MuiSlider-thumb': {
					// background: 'red',
				},
			}}
		/>
	);
};

export default DurationSlider;

function scaleTransform(
	min: number,
	max: number,
	intervals: number[],
): [number, (input: number) => number] {
	//determine how many "points" we need
	let distributions = intervals.length;
	let descretePoints = Math.ceil(
		(max - min) / intervals.reduce((total, step) => total + step / distributions, 0),
	);

	return [
		descretePoints,
		(input: number) => {
			let stepTransforms = intervals.map((s, i) => {
				let setCount = Math.min(
					Math.ceil(input - (descretePoints * i) / distributions),
					Math.round(descretePoints / distributions),
				);
				return setCount > 0 ? setCount * s : 0;
			});

			let lastStep = 0;
			let out =
				Math.round(
					stepTransforms.reduce((total, num, i) => {
						if (num) {
							lastStep = i;
						}
						return total + num;
					}),
				) + min;

			let currentUnit = intervals[lastStep];

			return Math.min(
				Math.round(out / currentUnit) * currentUnit, //round to nearest step
				max,
			);
		},
	];
}
