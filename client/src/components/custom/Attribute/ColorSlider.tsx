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
	const { hue: h, saturation: s, lightness: l } = color;

	return (
		<Slider
			// style={{ backgroundColor: `white` }}
			{...sliderProps}
			orientation='vertical'
			sx={{
				'& .MuiSlider-rail': {
					background: background,
					opacity: '1',
					border: '1px solid white',
					width: '10px',
				},
				'& .MuiSlider-track': {
					display: 'none',
				},
				'& .MuiSlider-thumb': {
					background: `hsl(${h}, ${s}% , ${l}%)`,
					border: '2px solid white',
				},
			}}
		/>
	);
};

export default ColorSlider;
