import { DragOverlay, DragStartEvent } from '@dnd-kit/core';

const FrameDragOverlay = ({ activeEvent }: { activeEvent: DragStartEvent | null }) => {
	return (
		<DragOverlay modifiers={[]}>
			{activeEvent ? (
				<div
					style={{
						width: '100px',
						height: '100px',
						backgroundColor: 'red',
					}}
				></div>
			) : null}
		</DragOverlay>
	);
};

export default FrameDragOverlay;
