import sidebarReducer from './sidebarReducer';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';


let store = {
  _state: {
    profilePage: {
      posts: [
        {id: 1, message: 'Post 1', likeCount: 55},
        {id: 2, message: 'Second post', likeCount: 42},
        {id: 3, message: 'Third post', likeCount: 30},
        {id: 4, message: 'Fourth post', likeCount: 18}
      ],
      newPostText: '!it-kamasutra.com!'
    },
    dialogPage: {
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
      ],
      newMessageBody: ''
    },
    sidebar: {}
  },
  _callSubscriber() {
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this);
  }
};

export default store;

