import dayjs from 'dayjs';

export const WORK_SCHEDULE_DATA = [
  {
    date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
    workCardData: [
      {
        id: 1,
        cropName: '포도',
        workName: '관수',
        workTime: '10:00 - 12:00',
        startTime: '2025-08-06T10:00:00',
        endTime: '2025-08-06T12:00:00',
        isCompleted: false,
      },
    ],
  },
  {
    date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    workCardData: [
      {
        id: 2,
        cropName: '배',
        workName: '병해충 방제',
        workTime: '00:00 - 03:00',
        startTime: '2025-08-07T00:00:00',
        endTime: '2025-08-07T03:00:00',
        isCompleted: true,
      },

      {
        id: 3,
        cropName: '복숭아',
        workName: '신초 진정',
        workTime: '03:20 - 05:10',
        startTime: '2025-08-07T03:20:00',
        endTime: '2025-08-07T05:10:00',
        isCompleted: true,
      },
    ],
  },
  {
    date: dayjs().format('YYYY-MM-DD'),
    workCardData: [
      {
        id: 4,
        cropName: '배',
        workName: '관수',
        workTime:
          dayjs().add(1, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          dayjs().add(2, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: dayjs().add(1, 'hour').add(10, 'minute').toISOString(),
        endTime: dayjs().add(2, 'hour').add(30, 'minute').toISOString(),
        isCompleted: true,
      },
      {
        id: 5,
        cropName: '복숭아',
        workName: '웃거름',
        workTime:
          dayjs().add(1, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          dayjs().add(2, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: dayjs().add(1, 'hour').add(10, 'minute').toISOString(),
        endTime: dayjs().add(2, 'hour').add(30, 'minute').toISOString(),
        isCompleted: true,
      },
      {
        id: 6,
        cropName: '단감',
        workName: '병해충 방제',
        workTime:
          dayjs().add(3, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          dayjs().add(4, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: dayjs().add(3, 'hour').add(10, 'minute').toISOString(),
        endTime: dayjs().add(4, 'hour').add(30, 'minute').toISOString(),
        isCompleted: true,
      },
      {
        id: 7,
        cropName: '배',
        workName: '병해충 방제',
        workTime:
          dayjs().add(5, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          dayjs().add(6, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: dayjs().add(4, 'hour').add(10, 'minute').toISOString(),
        endTime: dayjs().add(5, 'hour').add(30, 'minute').toISOString(),
        isCompleted: true,
      },
      {
        id: 8,
        cropName: '배',
        workName: '병해충 방제',
        workTime:
          dayjs().add(7, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          dayjs().add(12, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: dayjs().add(8, 'hour').add(10, 'minute').toISOString(),
        endTime: dayjs().add(12, 'hour').add(30, 'minute').toISOString(),
        isCompleted: true,
      },
      {
        id: 9,
        cropName: '배',
        workName: '23시 방제',
        workTime:
          dayjs().add(10, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          dayjs().add(15, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: dayjs().add(10, 'hour').add(10, 'minute').toISOString(),
        endTime: dayjs().add(15, 'hour').add(30, 'minute').toISOString(),
        isCompleted: true,
      },
    ],
  },
];
