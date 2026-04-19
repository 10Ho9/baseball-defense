import type { CoachRequest, CoachResponse } from "../scenarios/data/types";

export interface CoachClient {
  ask(request: CoachRequest): Promise<CoachResponse>;
}

export class NullCoachClient implements CoachClient {
  async ask(): Promise<CoachResponse> {
    throw new Error("Coach is not enabled in this build.");
  }
}

export const coachFeatureEnabled = import.meta.env.VITE_COACH_ENABLED === "true";

export const createCoachClient = (): CoachClient => new NullCoachClient();
