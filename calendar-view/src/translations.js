import localizedStrings from './localized_strings.json';



export const _vz = (txt) => {
  let lang = 'es';
  if (window && window.vz_calendar_view_params && window.vz_calendar_view_params.lang) {
    lang = window.vz_calendar_view_params.lang.substring(0, 2);
  }
  if (localizedStrings[txt] && localizedStrings[txt][lang]) {
    return localizedStrings[txt][lang];
  }
  console.log(`No localized string for ${txt}`);
  return txt;
};

export const Month = (month) => {
  return _vz('months').split(',')[month];
};

export const WeekDays = (day) => {
  return _vz('weekdays').split(',')[day];
};

export const formatDate = (date = new Date()) => {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });
  return [year, month, day].join('-');
}

const translations = {
  _vz,
  Month,
  WeekDays,
  formatDate,
};


export default translations;