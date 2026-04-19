import type { FieldPoint } from "./types";

export const FIELD_Y_CENTER = 50;
export const FIELD_Y_SCALE = 1.18;

export const fieldY = (value: number) =>
  FIELD_Y_CENTER + (value - FIELD_Y_CENTER) * FIELD_Y_SCALE;

export const fieldPoint = (x: number, y: number): FieldPoint => ({
  x,
  y: fieldY(y),
});
