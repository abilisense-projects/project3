export const setUnreadNotification = (numOfUnread) => {
  return {
    type: "SET_UNREAD_NOTIFICATION",
    payload: {
      numOfUnread,
    },
  };
};
