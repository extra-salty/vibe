import { useSelector, useDispatch } from 'react-redux';
import { setHue, setLightness, setSaturation } from '@/state/features/attributes/attributeSlice';
import { getBackgroundColor } from './Attribute.helper';
import { RootState } from '@/state/store';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import { AttributeType, Attributes, Units } from './Attribute.type';
import AttributeSlider from '../AttributeSlider/AttributeSlider';
import style from './Attribute.module.scss';

const Attribute = () => {
	const dispatch = useDispatch();
	const { color } = useSelector((state: RootState) => state.attributes);
	const { hue, saturation, lightness } = color;

	const attributesSliders: AttributeType[] = [
		{
			label: Attributes.hue,
			value: hue,
			max: 360,
			unit: Units.degree,
			icon: Icons.palette,
			background: getBackgroundColor(color, Attributes.hue),
			onChange: (value: number) => dispatch(setHue(value)),
		},
		{
			label: Attributes.saturation,
			value: saturation,
			max: 100,
			unit: Units.percentage,
			icon: Icons.gradient,
			background: getBackgroundColor(color, Attributes.saturation),
			onChange: (value: number) => dispatch(setSaturation(value)),
		},
		{
			label: Attributes.lightness,
			value: lightness,
			unit: Units.percentage,
			max: 100,
			icon: Icons.brightness,
			background: getBackgroundColor(color, Attributes.lightness),
			onChange: (value: number) => dispatch(setLightness(value)),
		},
		{
			label: Attributes.timing,
			value: 0,
			unit: Units.second,
			max: 100,
			icon: Icons.timelapse,
			onChange: (value: number) => {},
		},
	];

	return (
		<div className={style.attributes}>
			{attributesSliders.map((attribute: AttributeType, i: number) => {
				return <AttributeSlider key={i} {...attribute} />;
			})}
		</div>
	);
};

export default Attribute;
