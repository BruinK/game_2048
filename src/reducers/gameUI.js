import { uiData } from './INIT_STORE';

export default function gameUI(state = uiData, action) {
  switch (action.type) {
    case 'HIDDESCORES': {
      const newState = { ...state };
      newState.isHidden = !newState.isHidden;
      return newState;
    }
    default:
      return state;
  }
}
