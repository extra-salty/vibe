import { useCallback, useState } from 'react';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '../../base/UIIcon/UIIcon';
import UIContainerProps from './UIContainer.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import style from './UIContainer.module.scss';

const UIContainer = ({
	label,
	expandable,
	isExpanded,
	children,
	hidden,
	classes,
}: UIContainerProps) => {
	const [isExpandedLocally, setIsExpandedLocally] = useState<boolean>(true);

	const handleExpandClick = useCallback(() => {
		expandable && setIsExpandedLocally((s) => !s);
	}, [expandable]);

	const expanded = isExpanded || isExpandedLocally;

	const classNames = appendClasses([style.uiContainer, classes]);

	if (hidden) return null;
	return (
		<div className={classNames} aria-expanded={expanded ? 'true' : 'false'}>
			<div
				className={appendClasses([style.header, expandable && style.expanded])}
				onClick={handleExpandClick}
			>
				<div className={style.label}>{label}</div>
				{expandable && (
					<UIIcon
						name={Icons.expandMore}
						width={12}
						height={12}
						classes={[style.icon, expanded && style.rotated]}
					/>
				)}
			</div>
			<div className={appendClasses([style.contentWrapper, expanded && style.expanded])}>
				<div className={style.content}>{children}</div>
			</div>
		</div>
	);
};

export default UIContainer;
