const initalValue = {
  requesting: false,
  message: undefined,
  transaction: null,
  list: [],
  status: undefined,
};

const todoreducer = (state = initalValue, action) => {
  switch (action.type) {
    case "DATA_RESQUEST":
      return {
        ...state,
        requesting: true,
      };
    case "DATA_SUCCESS":
      return {
        ...state,
        transaction: action.transaction,
        requesting: false,
        list: action.list,
        status: action.status,
        message: undefined,
      };
    case "DATA_ADD_SUCCESS":
      return {
        ...state,
        transaction: action.transaction,
        requesting: false,
        list: [action.data, ...state.list],
        status: action.status,
        message: undefined,
      };
    case "DATA_DELETE":
      return {
        ...state,
        transaction: action.transaction,
        requesting: false,
        message: undefined,
        list: state.list.filter(
          (item, index) => item.id !== action.transaction.deleteId
        ),
      };
    case "DATA_UPDATE":
      return {
        ...state,
        transaction: action.transaction,
        requesting: false,
        message: undefined,
        list: state.list.map((item, index) => {
          if (item.id === action.payload.updateId) {
            return {
              ...item,
              ...action.payload.data,
            };
          }
          return item;
        }),
      };
    case "CLEAR_DATA":
      return {
        ...state,
        requesting: false,
        message: undefined,
        transaction: null,
        status: undefined,
      };
    case "DATA_ERROR":
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};

export default todoreducer;
