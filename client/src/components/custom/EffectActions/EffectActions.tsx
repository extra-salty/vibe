import UIButtonType from '@/components/base/UIButton/UIButton.type';
import style from './EffectActions.module.scss';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import { Actions } from '@/state/features/effect/effectSlice.type';

type Props = {};

const EffectActions = (props: Props) => {
	// const actions: UIButtonType[] = [
	// 	{
	// 		text: Actions.reset,
	// 		icon: Icons.restart,
	// 		onClick: () => setIsModalOpen(true),
	// 		onPress: () => {},
	// 		disabled: actionsState.Reset,
	// 	},
	// 	{
	// 		text: Actions.lock,
	// 		activeText: Actions.unlock,
	// 		icon: Icons.lock,
	// 		activeIcon: Icons.unlock,
	// 		onClick: () => {},
	// 		onPress: () => {},
	// 	},
	// ];

	return <div className={style.actions}>{}</div>;
};

export default EffectActions;
