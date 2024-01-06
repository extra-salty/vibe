import styles from './EffectDragOverlay.module.scss';

type Props = {
	effectName: string;
};

const EffectDragOverlay = ({ effectName }: Props) => {
	return <div className={styles.overlay}>{effectName}</div>;
};

export default EffectDragOverlay;
