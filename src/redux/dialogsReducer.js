// Action Types
export const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
  dialogs: [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrei'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Viktor'},
    {id: 6, name: 'Valera'}
  ],
  messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How is your it-kamasutra?'},
    {id: 5, message: 'Yo'},
    {id: 3, message: 'Yo1'},
    {id: 4, message: 'Yo2'}
  ]
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case (SEND_MESSAGE): {
      return {
        ...state,
        messages: [...state.messages, {
          id: state.messages.length + 1,
          message: action.payload.body
        }]
      };
    }
    default: {
      return state;
    }
  }
};
// Action creators
export const sendMessageCreator = (text) => ({type: SEND_MESSAGE, payload: {body: text}});


export default dialogsReducer;