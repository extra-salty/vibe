import { AnimationServiceInstance } from '@/app/api/animationGroup/_service';
import { EffectServiceInstance } from '@/app/api/staticAnimation/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAnimation = createAsyncThunk(
	'animation/get',
	async (args: { id: string; index?: number }) => {
		const animation = await AnimationServiceInstance.getAnimationGroup(args.id);
		return { animation, index: args.index };
	},
);

export const getStaticAnimation = createAsyncThunk(
	'effect/get',
	async (args: { id: string; index?: number }) => {
		const staticAnimation = await EffectServiceInstance.getStaticAnimation(args.id);
		return { staticAnimation, index: args.index };
	},
);
