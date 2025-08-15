import dayjs from 'dayjs';

dayjs.locale('ko');
const now = dayjs();

export const WORK_SCHEDULE_DATA = [
  {
    date: now.subtract(2, 'day').format('YYYY-MM-DD'),
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
    date: now.subtract(1, 'day').format('YYYY-MM-DD'),
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
    date: now.format('YYYY-MM-DD'),
    workCardData: [
      {
        id: 4,
        cropName: '배',
        workName: '관수',
        workTime:
          now.add(1, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          now.add(2, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: now
          .add(1, 'hour')
          .add(10, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        endTime: now
          .add(2, 'hour')
          .add(30, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        isCompleted: true,
      },
      {
        id: 5,
        cropName: '복숭아',
        workName: '웃거름',
        workTime:
          now.add(1, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          now.add(2, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: now
          .add(1, 'hour')
          .add(10, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        endTime: now
          .add(2, 'hour')
          .add(30, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        isCompleted: true,
      },
      {
        id: 6,
        cropName: '단감',
        workName: '병해충 방제',
        workTime:
          now.add(3, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          now.add(4, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: now
          .add(3, 'hour')
          .add(10, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        endTime: now
          .add(4, 'hour')
          .add(30, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        isCompleted: true,
      },
      {
        id: 7,
        cropName: '배',
        workName: '병해충 방제',
        workTime:
          now.add(5, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          now.add(6, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: now
          .add(5, 'hour')
          .add(10, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        endTime: now
          .add(6, 'hour')
          .add(30, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        isCompleted: true,
      },
      {
        id: 8,
        cropName: '배',
        workName: '병해충 방제',
        workTime:
          now.add(7, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          now.add(12, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: now
          .add(7, 'hour')
          .add(10, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        endTime: now
          .add(12, 'hour')
          .add(30, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        isCompleted: true,
      },
      {
        id: 9,
        cropName: '배',
        workName: '23시 방제',
        workTime:
          now.add(10, 'hour').add(10, 'minute').format('HH:mm') +
          ' - ' +
          now.add(15, 'hour').add(30, 'minute').format('HH:mm'),
        startTime: now
          .add(10, 'hour')
          .add(10, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        endTime: now
          .add(15, 'hour')
          .add(30, 'minute')
          .format('YYYY-MM-DDTHH:mm'),
        isCompleted: true,
      },
    ],
  },
];
