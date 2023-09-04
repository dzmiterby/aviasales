import { addTickets, changeIsLoaded, changeError, changeNoResult } from '../store/storeaviasales';

const baseUrl = 'https://aviasales-test-api.kata.academy/';

// Получение searchId
export const fetchGetSearchId = async () => {
  let searchId = sessionStorage.getItem('searchId');
  if (searchId) return searchId;
  fetch(`${baseUrl}search`)
    .then((response) => response.json())
    .then(({ searchId }) => {
      sessionStorage.setItem('searchId', searchId);
      return searchId;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Получение пачки билетов
export const fetchGetBundleTickets = async (dispatch) => {
  dispatch(changeIsLoaded(false));
  dispatch(changeNoResult(false));
  const searchId = await fetchGetSearchId();
  fetch(`${baseUrl}tickets?searchId=${searchId}`)
    .then((response) => response.json())
    .then((result) => {
      dispatch(changeIsLoaded(true));
      if (result.stop) sessionStorage.removeItem('searchId');
      dispatch(addTickets(result.tickets));
      if (result.tickets.length === 0) dispatch(changeNoResult(true));
    })
    .catch((error) => {
      dispatch(changeIsLoaded(true));
      dispatch(changeError(error));
    });
};
