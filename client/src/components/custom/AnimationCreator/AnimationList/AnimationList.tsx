import useColumns, { HeaderT } from './useColumns';
import { useAnimations } from '@/state/features/animation/animationSelector';
import { useDroppable } from '@dnd-kit/core';
import { CSSProperties, memo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndElements } from '@/state/features/animation/animation.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import AnimationListItem from './AnimationListItem/AnimationListItem';
import UIIcon from '@/components/base/UIIcon/UIIcon';

const AnimationList = () => {
	const animations = useAnimations();
	const items = animations.map((animation, i) => `${animation.name}/${i}`);

	const headerData: HeaderT = {
		numbering: '#',
		name: 'Name',
		description: 'Description',
		frames: <UIIcon name={Icons.stack} width={15} height={15} />,
		duration: <UIIcon name={Icons.timelapse} width={15} height={15} />,
		repeat: <UIIcon name={Icons.restart} width={15} height={15} />,
		play: 'Play',
		drag: 'Drag',
	};
	const header = useColumns(headerData);

	const { setNodeRef, isOver, active } = useDroppable({
		id: DndElements.animationList,
		data: { type: DndElements.animationList },
	});

	const style: CSSProperties = {
		backgroundColor:
			isOver && active?.data.current?.type === DndElements.newAnimation ? 'gray' : undefined,
	};

	return (
		<div ref={setNodeRef} style={style} className='h-full justify-center'>
			<div className='h-6 mb-2 flex items-center '>
				{header.map(({ content, classes }, i) => (
					<div key={i} className={`${classes} `}>
						{content}
					</div>
				))}
			</div>
			{animations.length ? (
				<ul style={style} className='m-0 p-0'>
					<SortableContext items={items} strategy={verticalListSortingStrategy}>
						{animations.map((animation, i) => (
							<AnimationListItem key={animation.name} index={i} animation={animation} />
						))}
					</SortableContext>
				</ul>
			) : (
				<div style={style} className='flex p-10 justify-center gap-2 m-auto'>
					<UIIcon name={Icons.drag} />
					<div>Drag and drop an animation from the table</div>
				</div>
			)}
		</div>
	);
};

export default memo(AnimationList);

// const dispatch = useDispatch();
// const [activeEffect, setActiveEffect] = useState<string | null>(null);

// const handleDragStart = ({ active }: DragEndEvent) => setActiveEffect(String(active.id));

// const handleDragCancel = () => setActiveEffect(null);

// const handleDragOver = ({ active, over }: DragEndEvent) => {};

// const handleDragEnd = useCallback(
//   ({ active, over }: DragEndEvent) => {
//     // console.log('active', active.id);
//     // console.log('over', over?.id);

//     if (!over) {
//       setActiveEffect(null);
//       return;
//     }

//     if (active.id !== over?.id) {
//       const [startX, startY] = String(active.id).split('/');
//       const [endX, endY] = String(over.id)
//         .split('/')
//         .map((coordinate) => Number(coordinate));

//       if (startX === 'effect') {
//         dispatch(
//           addEffect({
//             effectName: startY,
//             endCoordinate: { x: endX, y: endY },
//           }),
//         );
//       } else {
//         dispatch(
//           moveEffect({
//             startCoordinate: { x: Number(startX), y: Number(startY) },
//             endCoordinate: { x: endX, y: endY },
//           }),
//         );
//       }
//     }

//     setActiveEffect(null);
//   },
//   [dispatch],
// );
