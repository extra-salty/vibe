import { useDispatch } from 'react-redux';
import { setFrameDuration } from '@/state/features/effect/effectSlice';
import { IconButton, Popover, Slider, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { TimelapseOutlined } from '@mui/icons-material';
import styles from './FrameDuration.module.scss';

const FrameDuration = ({ frameIndex, duration }: { frameIndex: number; duration: number }) => {
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const isOpen = Boolean(anchorEl);
	const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const [value, setValue] = useState<number>(0);
	const intervals: number[] = [1, 2, 5, 10, 100];
	let [max, sliderTransform] = scaleTransform(1, 10000, intervals);

	return (
		<>
			<Tooltip title={'Frame duration'} arrow>
				<IconButton
					id='frame-duration-button'
					aria-haspopup='true'
					aria-controls={isOpen ? 'frame-duration-slider' : undefined}
					aria-expanded={isOpen ? 'true' : undefined}
					onClick={handleOpen}
				>
					<div className={styles.column}>
						<TimelapseOutlined />
						<Typography fontSize={14}>{`${(duration / 1000).toFixed(2)} s`}</Typography>
					</div>
				</IconButton>
			</Tooltip>
			<Popover
				aria-labelledby='frame-duration-slider'
				id={isOpen ? 'frame-duration-popover' : undefined}
				open={isOpen}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				onClose={handleClose}
			>
				<div className={styles.sliderWrapper}>
					<span>0</span>
					<Slider
						size='small'
						value={value}
						min={0}
						max={max}
						aria-label='frame-duration-slider'
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
					<span>10</span>
				</div>
			</Popover>
		</>
	);
};

{
	/* <DurationInput frameIndex={frameIndex} duration={frame.duration} /> */
}

export default FrameDuration;

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
