export const setUser = (userData) => {
  return {
    type: 'SET_USER',
    payload: {
      userData,
    },
  };
};
