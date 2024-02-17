import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Table ------------------------------------------------------------------------------
export const getAnimations = createAsyncThunk(
	'tables/animations/get',
	async () => await AnimationsServiceInstance.getAnimations(),
);

export const getEffects = createAsyncThunk(
	'tables/effects/get',
	async () => await EffectsServiceInstance.getEffects(),
);

export const createAnimation = createAsyncThunk(
	'tables/animation/post',
	async (args: { duplicateId?: string; data: FormData }) => {
		await AnimationServiceInstance.createAnimation(args);
	},
);

export const createEffect = createAsyncThunk(
	'tables/effect/post',
	async (args: { duplicateId?: string; data: FormData }) => {
		await EffectServiceInstance.createEffect(args);
	},
);

export const deleteAnimations = createAsyncThunk(
	'tables/animations/delete',
	async (ids: string[]) => await AnimationsServiceInstance.deleteAnimations(ids),
);

export const deleteEffects = createAsyncThunk(
	'tables/effects/delete',
	async (ids: string[]) => await EffectsServiceInstance.deleteEffects(ids),
);

// Playlist ------------------------------------------------------------------------------
export const getAnimation = createAsyncThunk(
	'animation/get',
	async (args: { id: string; index?: number }) => {
		const animation = await AnimationServiceInstance.getAnimation(args.id);
		return { animation, index: args.index };
	},
);

export const getEffect = createAsyncThunk(
	'effect/get',
	async (args: { id: string; index?: number }) => {
		const animation = await EffectServiceInstance.getEffectDetails(args.id);
		return { animation, index: args.index };
	},
);
