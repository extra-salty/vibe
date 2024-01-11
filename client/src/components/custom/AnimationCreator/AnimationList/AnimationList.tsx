import { useAnimations } from '@/state/features/animation/animationSelector';
import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { DndElements } from '@/state/features/animation/animation.types';
import AnimationListItem from './AnimationListItem/AnimationListItem';

const AnimationList = () => {
	const animations = useAnimations();
	const items = animations.map((animation, i) => `${animation.name}`);

	const { setNodeRef } = useDroppable({
		id: DndElements.animationList,
		data: { type: DndElements.animationList },
	});

	return (
		<div ref={setNodeRef} className='flex justify-center w-full bg-gray-500'>
			{animations.length ? (
				<ul className='h-full flex list-none m-0 p-0'>
					<SortableContext items={items} strategy={horizontalListSortingStrategy}>
						{animations.map((animation, i) => (
							<AnimationListItem key={animation.name} index={i} animation={animation} />
						))}
					</SortableContext>
				</ul>
			) : (
				<div className='m-auto'>Drop an animation from the table</div>
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
