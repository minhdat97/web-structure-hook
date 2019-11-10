const initialState = {
    datas: {},
    isFetching: false,
    hasError: false
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_DATA_REQUEST":
        return {
          ...state,
          isFetching: true,
          hasError: false
        };
      case "FETCH_DATA_SUCCESS":
        return {
          ...state,
          isFetching: false,
          datas: action.payload
        };
      case "FETCH_DATA_FAILURE":
        return {
          ...state,
          hasError: true,
          isFetching: false
        };
  
      case "CHANGE_PASSWORD":
        return {
          ...state,
          ...action.httpResponse
        };
      default:
        return state;
    }
  };
  
  export default usersReducer;
  