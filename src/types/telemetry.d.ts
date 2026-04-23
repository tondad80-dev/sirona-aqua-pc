/**
 * SIRONA AQUA - CORE TELEMETRY TYPES
 * ISA-95 Compliant Data Structures
 */

export type SensorStatus = 'ONLINE' | 'OFFLINE' | 'LIMP_MODE';

export interface BaseSensor {
  id: string;
  timestamp: number;
  status: SensorStatus;
  unit: string;
}

export interface PHSensor extends BaseSensor {
  value: number; // 0.00 - 14.00
}

export interface ECSensor extends BaseSensor {
  value: number; // 0.0 - 20.0 mS/cm
}

export interface PARSensor extends BaseSensor {
  value: number; // 0 - 2500 umol
}