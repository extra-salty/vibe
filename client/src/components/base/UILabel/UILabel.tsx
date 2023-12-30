import UIComponentProps from '@/components/UIComponent.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UILabel.scss';

type UILabelProps = UIComponentProps & {
	label: string;
	bold?: boolean;
	htmlFor?: string;
};

const UILabel = ({ label, htmlFor, classes, hidden }: UILabelProps) => {
	const classNames = appendClasses(['uiLabel', classes]);

	if (hidden) return null;
	return (
		<label htmlFor={htmlFor} className={classNames}>
			{label}
		</label>
	);
};

export default UILabel;
