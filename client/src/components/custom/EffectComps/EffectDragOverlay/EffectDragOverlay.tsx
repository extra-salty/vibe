import styles from './EffectDragOverlay.module.scss';

const EffectDragOverlay = ({ effectName }: { effectName: string }) => {
	return <div className={styles.overlay}>{effectName}</div>;
};

export default EffectDragOverlay;
