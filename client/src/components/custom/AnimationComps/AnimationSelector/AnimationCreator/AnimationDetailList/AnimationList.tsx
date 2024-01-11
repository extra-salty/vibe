import { useAnimations } from '@/state/features/animation/animationSelector';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import AnimationListItem from './AnimationListItem/AnimationListItem';

const AnimationList = ({ animationDropZoneId }: { animationDropZoneId: string }) => {
	const animations = useAnimations();
	const items = animations.map((animation, i) => `${animation.name}/${i}`);

	// const { setNodeRef } = useDroppable({
	// 	id: animationDropZoneId,
	// });

	return (
		<ul className='min-w-48 h-full flex list-none m-0 p-0 bg-blue-200'>
			<SortableContext items={items} strategy={horizontalListSortingStrategy}>
				{animations.map((animation, i) => (
					<AnimationListItem key={animation.name} index={i} animation={animation} />
				))}
			</SortableContext>
		</ul>
	);
};

export default AnimationList;

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
