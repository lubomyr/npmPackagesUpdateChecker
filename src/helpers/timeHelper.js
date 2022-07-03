import moment from 'moment';

export const getUpdatedLabel = updateTimeValue => {
  const currentTime = new Date();
  const updateTime = new Date(updateTimeValue);
  const diffTime = moment.duration(
    moment(currentTime).diff(moment(updateTime)),
  );
  const yearsPassed = parseInt(diffTime.asYears(), 2);
  const monthsPassed = parseInt(diffTime.asMonths(), 2);
  const daysPassed = parseInt(diffTime.asDays(), 2);
  const hoursPassed = parseInt(diffTime.asHours(), 2);
  const minutesPassed = parseInt(diffTime.asMinutes(), 2);
  return yearsPassed
    ? `${yearsPassed} years ago`
    : monthsPassed
    ? `${monthsPassed} months ago`
    : daysPassed
    ? `${daysPassed} days ago`
    : hoursPassed
    ? `${hoursPassed} hours ago`
    : `${minutesPassed} minutes ago`;
};
