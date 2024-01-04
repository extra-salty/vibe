import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { ObjectId } from 'mongodb';

export type EffectDataUpdateT = Omit<BaseEffectT, 'dateCreated'>;

export type EffectDataOptionsT = {
	sortOption?: string;
	filterOption?: string;
	filterValue?: string | ObjectId;
};
