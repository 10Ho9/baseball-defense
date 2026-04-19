import type { FieldPoint, PositionId } from "./types";
import { fieldPoint, fieldY } from "./fieldCoordinates";

export const defaultDefensiveStarts: Record<PositionId, FieldPoint> = {
  P: fieldPoint(50, 64),
  C: fieldPoint(50, 83),
  "1B": fieldPoint(66, 57),
  "2B": fieldPoint(58.5, 48.5),
  "3B": fieldPoint(34, 57),
  SS: fieldPoint(41.5, 48.5),
  LF: fieldPoint(24.5, 38.5),
  CF: fieldPoint(50, 31),
  RF: fieldPoint(75.5, 38.5),
};

export const baseAnchors = {
  home: fieldPoint(50, 84),
  first: fieldPoint(70, 64),
  second: fieldPoint(50, 44),
  third: fieldPoint(30, 64),
};

export const foulLineAnchors = {
  left: { x: 7, y: fieldY(44) },
  right: { x: 93, y: fieldY(44) },
};

export const specialDefensiveStarts = {
  doublePlayFirstBase: fieldPoint(67.5, 61.5),
  buntFirstBase: fieldPoint(67.5, 62.5),
  buntThirdBase: fieldPoint(33.5, 62),
  cutoffThirdBase: fieldPoint(32, 62.5),
  infieldInSecondBase: fieldPoint(58, 59),
  infieldInThirdBase: fieldPoint(28, 61),
  infieldInShortstop: fieldPoint(43, 50),
} as const;
