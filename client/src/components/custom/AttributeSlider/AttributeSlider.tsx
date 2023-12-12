import { memo, useMemo } from 'react';
import { AttributeType } from '../Attribute/Attribute.type';
import UIControl from '@/components/base/UIControl/UIControl';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UISlider from '@/components/base/UISlider/UISlider';
import style from './AttributeSlider.module.scss';

const AttributeSlider = ({ label, value, max, unit, icon, onChange, styles }: AttributeType) => {
	const controlComp = useMemo(() => {
		return <UIControl value={value} max={max} unit={unit} onChange={() => {}} />;
	}, [max, unit, value]);

	return (
		<div className={style.row}>
			<div className={style.text}>{label}</div>

			<UIIcon name={icon} height={20} width={20} />
			<UISlider value={value} max={max} delay={0} onChange={onChange} styles={styles} />
			<UIControl value={value} max={max} unit={unit} onChange={onChange} />
			{/* {controlComp} */}
		</div>
	);
};

export default AttributeSlider;
