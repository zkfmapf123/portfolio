export const GET_PRIVATE_ID = "GET_PRIATE_ID";

export const getPrivateIdAction = (privateId: number) => ({

  type: GET_PRIVATE_ID,
  payload : privateId
});