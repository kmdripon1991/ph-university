import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existStartTime = new Date(`1970-01-01${schedule.startTime}`);
    const existEndTime = new Date(`1970-01-01${schedule.startTime}`);
    const newStartTime = new Date(`1970-01-01${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01${newSchedule.endTime}`);
    if (newStartTime < existEndTime && newEndTime > existStartTime) {
      return true;
    }
  }
  return false;
};
