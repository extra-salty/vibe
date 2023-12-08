import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHue, setLightness, setSaturation } from '@/state/features/attributes/attributeSlice';
import { getBackgroundColor } from './Attribute.helper';
import { RootState } from '@/state/store';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import { AttributeType, Attributes, Units } from './Attribute.type';
import UIIcon from '../../base/UIIcon/UIIcon';
import UISlider from '../../base/UISlider/UISlider';
import UIControl from '../../base/UIControl/UIControl';
import style from './Attribute.module.scss';

const Attribute = () => {
	// console.log('attr');
	const dispatch = useDispatch();
	const { color } = useSelector((state: RootState) => state.attributes);
	const { hue, saturation, lightness } = color;

	const attributesSliders = useMemo((): AttributeType[] => {
		return [
			{
				key: Attributes.hue,
				value: hue,
				max: 360,
				unit: Units.degree,
				icon: Icons.palette,
				background: getBackgroundColor(color, Attributes.hue),
				onChange: (value: number) => dispatch(setHue(value)),
			},
			{
				key: Attributes.saturation,
				value: saturation,
				max: 100,
				unit: Units.percentage,
				icon: Icons.gradient,
				background: getBackgroundColor(color, Attributes.saturation),
				onChange: (value: number) => dispatch(setSaturation(value)),
			},
			{
				key: Attributes.lightness,
				value: lightness,
				unit: Units.percentage,
				max: 100,
				icon: Icons.brightness,
				background: getBackgroundColor(color, Attributes.lightness),
				onChange: (value: number) => dispatch(setLightness(value)),
			},
			{
				key: Attributes.timing,
				value: 0,
				unit: Units.second,
				max: 100,
				icon: Icons.timelapse,
				onChange: (value: number) => {},
			},
		];
	}, [color, dispatch, hue, lightness, saturation]);

	const renderAttributeSlider = useCallback(
		({ key, value, max, unit, background, icon, onChange }: AttributeType) => {
			return (
				<div key={key} className={style.row}>
					<div className={style.text}>{key}</div>
					<UIIcon name={icon} height={20} width={20} />
					<UISlider value={value} max={max} delay={0} onChange={onChange} background={background} />
					<UIControl value={value} max={max} unit={unit} onChange={onChange} />
				</div>
			);
		},
		[],
	);

	return <div className={style.attributes}>{attributesSliders.map(renderAttributeSlider)}</div>;
};

export default Attribute;
