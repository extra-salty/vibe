import { AttributeType } from '../Attribute/Attribute.type';
import UIControl from '@/components/base/UIControl/UIControl';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UISlider from '@/components/base/UISlider/UISlider';
import style from './AttributeSlider.module.scss';

const AttributeSlider = ({ label, value, max, unit, icon, onChange, styles }: AttributeType) => {
	return (
		<div className={style.row}>
			<div className={style.text}>{label}</div>
			<UIIcon name={icon} height={20} width={20} />
			<UISlider value={value} max={max} delay={0} styles={styles} onChange={onChange} />
			<UIControl value={value} max={max} unit={unit} hasIncrements onChange={onChange} />
		</div>
	);
};

export default AttributeSlider;
