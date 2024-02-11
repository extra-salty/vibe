import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAnimation = createAsyncThunk(
	'animation/post',
	async (args: { duplicateId?: string; data: FormData }) => {
		await AnimationServiceInstance.createAnimation(args);
	},
);

export const createEffect = createAsyncThunk(
	'effect/post',
	async (args: { duplicateId?: string; data: FormData }) => {
		await EffectServiceInstance.createEffect(args);
	},
);

export const getAnimations = createAsyncThunk(
	'animations/get',
	async () => await AnimationsServiceInstance.getAnimations(),
);

export const getEffects = createAsyncThunk(
	'effects/get',
	async () => await EffectsServiceInstance.getEffects(),
);

export const deleteAnimations = createAsyncThunk(
	'animations/delete',
	async (ids: string[]) => await AnimationsServiceInstance.deleteAnimations(ids),
);

export const deleteEffects = createAsyncThunk(
	'animations/delete',
	async (ids: string[]) => await EffectsServiceInstance.deleteEffects(ids),
);
