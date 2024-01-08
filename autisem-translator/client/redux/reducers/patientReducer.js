const initialState = {
    num: "0",
  };
  
  const patientReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_UNREAD_NOTIFICATION':
        return {
          ...state,
          num: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default patientReducer;