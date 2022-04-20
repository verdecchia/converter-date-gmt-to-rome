import test from 'ava';
import { DateTime } from 'luxon';

const WINTER_DATE1 = {
  GMT: '2022-01-31T23:30:07.000Z',
  LOCAL: '2022-02-01T00:30:07.000+01:00',
};

const WINTER_DATE2 = {
  LOCAL: '2022-01-01T00:00:00.000+01:00',
  GMT: '2021-12-31T23:00:00.000Z',
};

const WINTER_DATE3 = {
  LOCAL: '2022-01-01T00:00',
  GMT: '2021-12-31T23:00:00.000Z',
};

const WINTER_DATE4 = {
  LOCAL: '2022-01-01',
  GMT_START_OF_DAY: '2021-12-31T23:00:00.000Z',
};

const WINTER_DATE5 = {
  LOCAL: '2022-01-01',
  GMT_END_OF_DAY: '2022-01-01T22:59:59.999Z',
}

test(`winter date, convert gmt date '${WINTER_DATE1.GMT}' to local date '${WINTER_DATE1.LOCAL}'`, (t) => {
  const dateWinterLocal = DateTime.fromISO(WINTER_DATE1.GMT, {
    zone: 'Europe/Rome',
  });

  t.is(dateWinterLocal.toString(), WINTER_DATE1.LOCAL);
});

test(`winter date, convert local date '${WINTER_DATE2.LOCAL}' to gmt date '${WINTER_DATE2.GMT}'`, (t) => {
  const dateWinterGmt = DateTime.fromISO(WINTER_DATE2.LOCAL, { zone: 'GMT' });

  t.is(dateWinterGmt.toString(), WINTER_DATE2.GMT);
});

test(`winter date, convert local date '${WINTER_DATE2.LOCAL}' to gmt date '${WINTER_DATE2.GMT}' DIFFERENT CODE, use fromISO 'Europe/Rome'`, (t) => {
  const dateWinterLocal = DateTime.fromISO(WINTER_DATE2.LOCAL, { zone: 'Europe/Rome' });

  t.is(dateWinterLocal.toUTC().toString(), WINTER_DATE2.GMT);
});


test(`winter date, convert local date '${WINTER_DATE3.LOCAL}' to gmt date '${WINTER_DATE3.GMT}' (start of day)`, (t) => {
  const dateWinterLocal = DateTime.fromISO(WINTER_DATE3.LOCAL, {
    zone: 'Europe/Rome',
  });

  t.is(dateWinterLocal.toUTC().toString(), WINTER_DATE3.GMT);
  t.is(dateWinterLocal.toUTC().toISO(), WINTER_DATE3.GMT);
});

test(`winter date, convert short date '${WINTER_DATE5.LOCAL}' to gmt date '${WINTER_DATE5.GMT_START_OF_DAY}' (end of day)`, (t) => {
  const dateWinterLocal = DateTime.fromISO(WINTER_DATE5.LOCAL, {
    zone: 'Europe/Rome',
  });
  t.is(
    dateWinterLocal.endOf('day').toUTC().toString(),
    WINTER_DATE5.GMT_END_OF_DAY
  );
});

test(`winter date, convert short date '${WINTER_DATE4.LOCAL}' to gmt date '${WINTER_DATE4.GMT_START_OF_DAY}'`, (t) => {
  const dateWinterLocal = DateTime.fromISO(WINTER_DATE4.LOCAL, {
    zone: 'Europe/Rome',
  });
  t.is(
    dateWinterLocal.startOf('day').toUTC().toString(),
    WINTER_DATE4.GMT_START_OF_DAY
  );
});
