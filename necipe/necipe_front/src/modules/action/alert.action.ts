export const GET_ALERT_ITEMS = "GET_ALERT_ITEMS";

export const getAlertAction = ({ friends, logs }) => ({

  type: GET_ALERT_ITEMS,
  payload: {
    friends,
    logs
  }
});
