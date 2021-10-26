import moment from 'moment';

export const getUpdatedLabel = updateTimeValue => {
  const currentTime = new Date();
  const updateTime = new Date(updateTimeValue);
  const diffTime = moment.duration(
    moment(currentTime).diff(moment(updateTime)),
  );
  const yearsPassed = parseInt(diffTime.asYears());
  const monthsPassed = parseInt(diffTime.asMonths());
  const daysPassed = parseInt(diffTime.asDays());
  const hoursPassed = parseInt(diffTime.asHours());
  const minutesPassed = parseInt(diffTime.asMinutes());
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
