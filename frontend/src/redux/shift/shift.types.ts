export type Shift = {
  startTime: string;
  endTime: string;
  notes: string;
};

export type ShiftRequest = Shift & {
  staffId: string;
};
