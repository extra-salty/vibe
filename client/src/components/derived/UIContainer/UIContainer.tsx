import { useCallback, useState } from 'react';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import UIIcon from '../../base/UIIcon/UIIcon';
import UIContainerType from './UIContainer.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import style from './UIContainer.module.scss';

const UIContainer = ({ label, expanded, children, hidden, classes }: UIContainerType) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(true);

	const handleExpandClick = useCallback(() => {
		setIsExpanded((s) => !s);
	}, []);

	const asd = expanded || isExpanded;

	const classNames = appendClasses([style.uiContainer, classes]);

	if (hidden) return null;
	return (
		<div className={classNames} aria-expanded={isExpanded ? 'true' : 'false'}>
			<div className={style.header} onClick={handleExpandClick}>
				<div className={style.label}>{label}</div>
				<UIIcon
					name={Icons.expandMore}
					width={12}
					height={12}
					classes={[style.icon, isExpanded && style.rotated]}
				/>
			</div>
			<div className={appendClasses([style.contentWrapper, isExpanded && style.expanded])}>
				<div className={style.content}>{children}</div>
			</div>
		</div>
	);
};

export default UIContainer;
