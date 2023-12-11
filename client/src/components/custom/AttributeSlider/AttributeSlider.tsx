import { AttributeType } from '../Attribute/Attribute.type';
import UIControl from '@/components/base/UIControl/UIControl';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UISlider from '@/components/base/UISlider/UISlider';
import style from './AttributeSlider.module.scss';

const AttributeSlider = ({
	label: key,
	value,
	max,
	unit,
	background,
	icon,
	onChange,
}: AttributeType) => {
	return (
		<div className={style.row}>
			<div className={style.text}>{key}</div>
			<UIIcon name={icon} height={20} width={20} />
			<UISlider value={value} max={max} delay={0} onChange={onChange} background={background} />
			<UIControl value={value} max={max} unit={unit} onChange={onChange} />
		</div>
	);
};

export default AttributeSlider;
