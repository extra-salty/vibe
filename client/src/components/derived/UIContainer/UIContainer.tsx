import UIComponentProps from '@/components/UIComponent.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import style from './UIContainer.module.scss';

export type UIContainerProps = UIComponentProps & {
	label?: string;
	children: React.ReactNode;
};

const UIContainer = ({ label, children, hidden, classes }: UIContainerProps) => {
	if (hidden) return null;

	return (
		<div className={appendClasses([style.uiContainer, classes])}>
			<div className={style.label}>{label}</div>
			<div className={style.content}>{children}</div>
		</div>
	);
};

export default UIContainer;
