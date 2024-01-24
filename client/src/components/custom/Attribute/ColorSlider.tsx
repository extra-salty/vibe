import { Slider, SliderProps } from '@mui/material';
import { useBackgroundColor } from './useBackgroundColor';
import { ColorT } from '@/types/color.types';
import { Attributes } from './Attribute.type';

const ColorSlider = ({
	sliderProps,
	color,
	id,
}: {
	sliderProps: SliderProps;
	color: ColorT;
	id: Attributes;
}) => {
	const background = useBackgroundColor(color, id);

	return (
		<Slider
			{...sliderProps}
			orientation='vertical'
			sx={{
				'& .MuiSlider-rail': {
					opacity: '1',
					background: background,
					width: '10px',
				},
				'& .MuiSlider-track': {
					display: 'none',
				},
				'& .MuiSlider-thumb': {
					background: color[id],
				},
			}}
		/>
	);
};

export default ColorSlider;
