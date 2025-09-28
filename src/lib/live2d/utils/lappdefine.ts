// definitions file

import { dev } from '$app/environment';
import { LogLevel } from '$lib/live2d/Framework/src/live2dcubismframework';

export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';

//export const CanvasWidth = 50; // in vw when CanvasSize is 'auto'
//export const CanvasHeight = 70; // in vh when CanvasSize is 'auto'

export const CanvasNum = 1;

export const ViewScale = 1;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

export const ResourcesPath = '/live2d/models/';

export const ModelDir: string = 'daniel';

export const MotionGroupIdle = 'Idle';
export const MotionGroupTapBody = 'TapBody';

export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

export const MOCConsistencyValidationEnable = dev;
export const MotionConsistencyValidationEnable = dev;

export const DebugLogEnable = dev;
export const DebugTouchLogEnable = dev;

// Mouse tracking settings
export const MouseTrackingEnable = true;
export const MouseTrackingSensitivity = 1.0; // Multiplier for mouse tracking response

export const CubismLoggingLevel: LogLevel = dev ? LogLevel.LogLevel_Verbose : LogLevel.LogLevel_Off;
