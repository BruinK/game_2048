import { combineReducers } from 'redux';
import gameUI from './gameUI';
import gameLogic from './gameLogic';

export default combineReducers({
  gameUI,
  gameLogic
});
