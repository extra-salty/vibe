import { AttributeType } from '../../Attribute/Attribute.type';
import UIControl from '@/components/misc/UIControl/UIControl';
import style from './AttributeSlider.module.scss';

const AttributeSlider = ({ label, value, max, unit, icon, onChange }: AttributeType) => {
	return (
		<div className={style.row}>
			{/* <div className={style.label}>{label}</div>
			<UIIcon name={icon} height={20} width={20} />
			<UISlider value={value} max={max} delay={0} styles={styles} onChange={onChange} />
			<UIControl
				value={value}
				max={max}
				unit={unit}
				hasIncrements
				onChange={onChange}
				classes={[style.control]}
			/> */}
		</div>
	);
};

export default AttributeSlider;
