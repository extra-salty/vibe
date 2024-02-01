import { memo } from 'react';

export const genericMemo: <T>(component: T) => T = memo;

export const generateRandomElementId = () => '_' + Math.random().toString(36).substr(2, 9);
