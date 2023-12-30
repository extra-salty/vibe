import { BaseEffectT } from '@/state/features/effect/effectSlice.types';

export type EffectDataUpdateT = Omit<BaseEffectT, 'dateCreated'>;

export type EffectDataOptionsT = {
	sortOption: string;
	filterOption: string;
	filterValue: string;
};
