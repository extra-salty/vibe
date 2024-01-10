'user client';
import { useDraggable } from '@dnd-kit/core';
import { convertDate } from '@/misc/helpers/helpers';
import { memo } from 'react';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';
import Link from 'next/link';

const EffectListItem = ({
	effect,
	index,
	selected,
}: {
	effect: BaseEffectT;
	index: number;
	selected: boolean;
}) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: `effect/${effect.name}`,
	});

	return (
		<li ref={setNodeRef} className={'flex justify-between list-none'}>
			<div>
				<div className='flex'>
					<div>{++index}</div>
					<UICheckbox isChecked={selected} onChange={() => {}} />
				</div>
				<div className='flex'>
					<UIIcon name={Icons.stack} />
					<div>{effect.frames.length}</div>
				</div>
				<div className='flex'>
					<UIIcon name={Icons.timelapse} />
					<div>
						{effect.frames.reduce((duration, frame) => duration + frame.duration, 0) / 1000}
					</div>
				</div>
			</div>
			<div></div>
			<div>
				<div>{effect.name}</div>
				<div>{effect.description}</div>
				<div>{convertDate(effect.dateCreated)}</div>
				<div>{convertDate(effect.dateModified)}</div>
			</div>

			<div>
				<Link href={`/effect/${effect.name}`}>
					<UIIcon name={Icons.edit} width={15} height={15} />
				</Link>
			</div>
			<button {...attributes} {...listeners}>
				<UIIcon name={Icons.drag} width={20} height={20} />
			</button>
		</li>
	);
};

export default memo(EffectListItem);
