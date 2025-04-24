
import { registerPlugin } from '@capacitor/core';
import type { WellbeingPlugin } from './definitions';

const Wellbeing = registerPlugin<WellbeingPlugin>('Wellbeing');
export * from './definitions';
export { Wellbeing };

