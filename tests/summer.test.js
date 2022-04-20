import test from 'ava';
import { DateTime } from 'luxon';

const SUMMER_DATE1 = {
    GMT: '2022-08-31T23:30:07.000Z',
    LOCAL: '2022-09-01T01:30:07.000+02:00',
};

const SUMMER_DATE2 = {
    LOCAL: '2022-08-01T00:00:00.000+02:00',
    GMT: '2022-07-31T22:00:00.000Z',
};

const SUMMER_DATE3 = {
    LOCAL: '2022-08-01T00:00',
    GMT: '2022-07-31T22:00:00.000Z',
};

const SUMMER_DATE4 = {
    LOCAL: '2022-08-01',
    GMT_START_OF_DAY: '2022-07-31T22:00:00.000Z',
};

const SUMMER_DATE5 = {
    LOCAL: '2022-08-01',
    GMT_END_OF_DAY: '2022-08-01T21:59:59.999Z',
}

test(`summer date, convert gmt date '${SUMMER_DATE1.GMT}' to local date '${SUMMER_DATE1.LOCAL}'`, (t) => {
    const dateWinterLocal = DateTime.fromISO(SUMMER_DATE1.GMT, {
        zone: 'Europe/Rome',
    });

    t.is(dateWinterLocal.toString(), SUMMER_DATE1.LOCAL);
});

test(`summer date, convert local date '${SUMMER_DATE2.LOCAL}' to gmt date '${SUMMER_DATE2.GMT}'`, (t) => {
    const dateWinterGmt = DateTime.fromISO(SUMMER_DATE2.LOCAL, { zone: 'GMT' });

    t.is(dateWinterGmt.toString(), SUMMER_DATE2.GMT);
});

test(`summer date, convert local date '${SUMMER_DATE2.LOCAL}' to gmt date '${SUMMER_DATE2.GMT}' DIFFERENT CODE, use fromISO 'Europe/Rome'`, (t) => {
    const dateWinterLocal = DateTime.fromISO(SUMMER_DATE2.LOCAL, { zone: 'Europe/Rome' });

    t.is(dateWinterLocal.toUTC().toString(), SUMMER_DATE2.GMT);
});


test(`summer date, convert local date '${SUMMER_DATE3.LOCAL}' to gmt date '${SUMMER_DATE3.GMT}' (start of day)`, (t) => {
    const dateWinterLocal = DateTime.fromISO(SUMMER_DATE3.LOCAL, {
        zone: 'Europe/Rome',
    });

    t.is(dateWinterLocal.toUTC().toString(), SUMMER_DATE3.GMT);
    t.is(dateWinterLocal.toUTC().toISO(), SUMMER_DATE3.GMT);
});

test(`summer date, convert short date '${SUMMER_DATE5.LOCAL}' to gmt date '${SUMMER_DATE5.GMT_START_OF_DAY}' (end of day)`, (t) => {
    const dateWinterLocal = DateTime.fromISO(SUMMER_DATE5.LOCAL, {
        zone: 'Europe/Rome',
    });
    t.is(
        dateWinterLocal.endOf('day').toUTC().toString(),
        SUMMER_DATE5.GMT_END_OF_DAY
    );
});

test(`summer date, convert short date '${SUMMER_DATE4.LOCAL}' to gmt date '${SUMMER_DATE4.GMT_START_OF_DAY}'`, (t) => {
    const dateWinterLocal = DateTime.fromISO(SUMMER_DATE4.LOCAL, {
        zone: 'Europe/Rome',
    });
    t.is(
        dateWinterLocal.startOf('day').toUTC().toString(),
        SUMMER_DATE4.GMT_START_OF_DAY
    );
});
