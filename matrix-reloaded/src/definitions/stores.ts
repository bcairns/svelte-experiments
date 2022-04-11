import * as Defaults from '../definitions/defaults';
import { writable } from 'svelte/store';

export const charWidth = writable(Defaults.charWidth);
export const charHeight = writable(Defaults.charHeight);

export const agingChance = writable(Defaults.agingChance);
export const flipChance = writable(Defaults.flipChance);
export const halfSpeedChance = writable(Defaults.halfSpeedChance);

export const trailLength = writable(Defaults.trailLength);
