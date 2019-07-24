import { App } from './app.interface';
import { TimelineEvent } from './services/timeline/timeline.interface';
import logger from './logger';
import { addNotification } from './services/timeline/scheduleNotifications';
import { addPatch } from './services/timeline/hooks/schedulePatches';
import { setStatus } from './services/timeline/hooks/setStatus';

export const scheduleTimelineNotifications = async (app: App) => {
  const service = app.service('timeline');

  // Get all events with planned end time in future.
  const results = await service.find({
    query: {
      plannedEnd: {
        $gt: new Date(),
      },
      manualMode: {
        $ne: '',
      },
    },
  }) as TimelineEvent[];

  logger.info(`Processing ${results.length} timeline event(s) for scheduled notifications...`);
  results.forEach((e) => {
    addNotification(app, e);
  });

  // Get all events with planned start time or planned end time in future.
  const futureEvents = await service.find({
    query: {
      $or: [
        { plannedStart: { $gt: new Date() } },
        { plannedEnd: { $gt: new Date() } },
      ],
    },
  }) as TimelineEvent[];

  logger.info(`Processing ${futureEvents.length} timeline event(s) for scheduled status patches...`);
  const nowTime = new Date();
  futureEvents.forEach((e) => {
    addPatch(app, e, nowTime);
  });

  // Patch all status
  const allEvents = await service.find() as TimelineEvent[];

  logger.info(`Processing ${allEvents.length} timeline event(s) for status updates...`);
  const now = new Date();
  allEvents.forEach((e) => {
    if (e.status !== setStatus(e, now)) { // patch events only if status has changed
      service.patch(e._id, e);
    }
  });
};

export default async (app: App) => {
  await scheduleTimelineNotifications(app);
};
