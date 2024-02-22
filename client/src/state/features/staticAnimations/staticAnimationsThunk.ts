import { EffectServiceInstance } from '@/app/api/staticAnimation/_service';
import { StaticAnimationsServiceInstance } from '@/app/api/staticAnimations/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getEffects = createAsyncThunk(
	'tables/effects/get',
	async () => await StaticAnimationsServiceInstance.getStaticAnimations(),
);

export const createEffect = createAsyncThunk(
	'tables/effect/post',
	async (args: { duplicateId?: string; data: FormData }) => {
		await EffectServiceInstance.createEffect(args);
	},
);

export const deleteEffects = createAsyncThunk(
	'tables/effects/delete',
	async (ids: string[]) =>
		await StaticAnimationsServiceInstance.deleteStaticAnimations(ids),
);
