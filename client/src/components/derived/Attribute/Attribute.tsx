import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHue, setLightness, setSaturation } from '@/state/features/attribute/attributeSlice';
import { getBackgroundColor } from './Attribute.helper';
import { RootState } from '@/state/store';
import { Icons } from '@/components/base/Icon/Icon.type';
import { AttributeType, Attributes } from './Attribute.type';
import Icon from '../../base/Icon/Icon';
import Slider from '../../base/Slider/Slider';
import Control from '../../base/Control/Control';
import './Attribute.scss';

const Attribute = () => {
	const dispatch = useDispatch();
	const color = useSelector((state: RootState) => state.attribute);
	const { hue, saturation, lightness } = color;

	const handleControlChange = useCallback(() => {}, []);

	const attributes = useMemo((): AttributeType[] => {
		return [
			{
				key: Attributes.hue,
				value: hue,
				max: 360,
				unit: '°',
				icon: Icons.palette,
				background: getBackgroundColor(color, Attributes.hue),
				onChange: (value: number) => dispatch(setHue(value)),
			},
			{
				key: Attributes.saturation,
				value: saturation,
				max: 100,
				unit: '%',
				icon: Icons.gradient,
				background: getBackgroundColor(color, Attributes.saturation),
				onChange: (value: number) => dispatch(setSaturation(value)),
			},
			{
				key: Attributes.lightness,
				value: lightness,
				unit: '%',
				max: 100,
				icon: Icons.brightness,
				background: getBackgroundColor(color, Attributes.lightness),
				onChange: (value: number) => dispatch(setLightness(value)),
			},
			{
				key: Attributes.timing,
				value: 0,
				unit: 's',
				max: 100,
				icon: Icons.timelapse,
				onChange: (value: number) => {},
			},
		];
	}, [color, dispatch, hue, lightness, saturation]);

	const renderAttribute = useCallback(
		({ key, value, max, unit, background, icon, onChange }: AttributeType) => {
			return (
				<div key={key} className='row'>
					<Icon name={icon} height={20} width={20} />
					<Slider value={value} max={max} delay={0} onChange={onChange} background={background} />
					<Control value={value} max={max} unit={unit} onChange={onChange} />
				</div>
			);
		},
		[],
	);

	return <div className='attributes'>{attributes.map(renderAttribute)}</div>;
};

export default Attribute;
