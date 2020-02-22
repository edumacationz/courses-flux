import { AuthorActions } from '../actions';

import dispatcher from '../appDispatcher';
import Store from './baseStore';

let _authors = [];

class AuthorStore extends Store {
  getAuthors() {
    return _authors;
  }

  getAuthorById(id) {
    return _authors.find(a => a.id === id);
  }
}

dispatcher.register(action => {
  console.log('got author action', action);

  switch (action.type) {
    case AuthorActions.UPDATE_AUTHOR:
      _authors = _authors.map(a => a.id === action.payload.id ? action.payload : a);
      authorStore.emitChange();

      break;
    case AuthorActions.CREATE_AUTHOR:
      _authors.unshift(action.payload);
      authorStore.emitChange();
      break;
    case AuthorActions.LOAD_AUTHORS:
      _authors = action.payload;
      authorStore.emitChange();
      break;
    case AuthorActions.REMOVE_AUTHOR:
      _authors = _authors.filter(a => a.id !== action.payload);
      authorStore.emitChange();
      break;
    default:
      break;
  }
});

export const authorStore = new AuthorStore();

