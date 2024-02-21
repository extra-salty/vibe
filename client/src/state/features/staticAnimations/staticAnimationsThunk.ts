import { EffectServiceInstance } from '@/app/api/effect/_service';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getEffects = createAsyncThunk(
	'tables/effects/get',
	async () => await EffectsServiceInstance.getEffects(),
);

export const createEffect = createAsyncThunk(
	'tables/effect/post',
	async (args: { duplicateId?: string; data: FormData }) => {
		await EffectServiceInstance.createEffect(args);
	},
);

export const deleteEffects = createAsyncThunk(
	'tables/effects/delete',
	async (ids: string[]) => await EffectsServiceInstance.deleteEffects(ids),
);
