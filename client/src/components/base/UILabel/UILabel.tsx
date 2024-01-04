import UIComponentProps from '@/components/UIComponent.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UILabel.scss';

export type UILabelProps = UIComponentProps & {
	label: string;
	bold?: boolean;
	htmlFor?: string;
};

const UILabel = ({ label, htmlFor, classes, hidden }: UILabelProps) => {
	if (hidden) return null;

	return (
		<label htmlFor={htmlFor} className={appendClasses(['uiLabel', classes])}>
			{label}
		</label>
	);
};

export default UILabel;
