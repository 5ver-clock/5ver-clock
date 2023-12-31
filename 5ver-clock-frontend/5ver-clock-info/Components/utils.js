
import { BUTTON_HEIGHT } from './values';
import { LogBox } from 'react-native';

export const getCenterPosition = (offsetY) => {
  return getIndexFromOffset(offsetY) * BUTTON_HEIGHT;
};
export const getCenterPositionFromIndex = (index) => {
  return index * BUTTON_HEIGHT;
};
export const getIndexFromOffset = (offsetY) => {
  return Math.round(offsetY / BUTTON_HEIGHT);
};
export const fillEmpty = (visibleCount, [...values]) => {

  LogBox.ignoreLogs(['Warning: Encountered two children with the same key']); // Ignore log notification by message
  console.disableYellowBox = true;
  const fillCount = (visibleCount - 1) / 2;
  for (let i = 0; i < fillCount; i++) {
    values.unshift("");
    values.push("");
  }
  return values;
};

export const asPickerFormat = (date) => {
  const _date = new Date(date.getTime());
  const hour = _date.getHours();
  const min = _date.getMinutes();
  _date.setTime(Date.now());
  _date.setHours(hour);
  _date.setMinutes(min + (5 - (min % 5)));
  _date.setSeconds(0);
  _date.setMilliseconds(0);
  return _date;
};