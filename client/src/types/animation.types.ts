import { MRT_ColumnDef, MRT_TableOptions } from 'material-react-table';

export type AnimationT = {
	type: 'animation';
	_id?: string;
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	// framesLength: number;
	// duration: number;
	// power: number;
	repeat?: number;
	speed?: number;
	children?: AnimationT;
};

export type TypesT = 'group' | 'static' | 'dynamic';

// export type AnimationStateT = Omit<AnimationT, 'effects'> & {
// 	effects: AnimationEffectStateT[];
// };

export type AnimationsTablePropsT = Partial<MRT_TableOptions<AnimationT>>;
export type AnimationsTableColumnsT = MRT_ColumnDef<AnimationT>[];

// export class AnimationEffectState implements AnimationEffectStateT {
// 	type: 'static' | 'dynamic' = 'static';
// 	repeat: number = 1;
// 	data: EffectBaseT;

// 	constructor(effect: EffectBaseT) {
// 		this.data = effect;
// 	}
// }
