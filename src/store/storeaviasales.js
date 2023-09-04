const defaultState = {
  tickets: [],
  tabStatus: 'cheap',
  chechStatus: [true, true, true, true, true],
  count: 5,
  isLoaded: true,
  error: null,
  noResult: false,
};

const ADD_TICKETS = 'ADD_TICKETS';
const INCREASE_COUNT = 'INCREASE_COUNT';
const SWITCH_BY_TABS = 'SWITCH_BY_TABS';
const SWITCH_BY_FILTER = 'SWITCH_BY_FILTER';
const CHANGE_IS_LOADED = 'CHANGE_IS_LOADED';
const CHANGE_ERROR = 'CHANGE_ERROR';
const CHANGE_NO_RESULT = 'CHANGE_NO_RESULT';

export const aviasalesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TICKETS:
      return {
        ...state,
        tickets: [...action.payload],
      };
    case INCREASE_COUNT:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case SWITCH_BY_TABS:
      return {
        ...state,
        tabStatus: action.payload,
      };
    case SWITCH_BY_FILTER:
      return {
        ...state,
        chechStatus: [...action.payload],
      };
    case CHANGE_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CHANGE_NO_RESULT:
      return {
        ...state,
        noResult: action.payload,
      };
    default:
      return state;
  }
};

export const addTickets = (payload) => ({ type: ADD_TICKETS, payload });
export const increaseCount = (payload) => ({ type: INCREASE_COUNT, payload });
export const switchByTabs = (payload) => ({ type: SWITCH_BY_TABS, payload });
export const switchByFilter = (payload) => ({ type: SWITCH_BY_FILTER, payload });
export const changeIsLoaded = (payload) => ({ type: CHANGE_IS_LOADED, payload });
export const changeError = (payload) => ({ type: CHANGE_ERROR, payload });
export const changeNoResult = (payload) => ({ type: CHANGE_NO_RESULT, payload });
