import { AuthorActions } from './actionTypes';

import * as authorApi from '../api/authorApi';

import dispatcher from '../appDispatcher';

export function saveAuthors(author) {
  return authorApi.saveAuthor(author)
    .then(savedAuthor => dispatcher.dispatch({
      type: author?.id ? AuthorActions.UPDATE_AUTHOR : AuthorActions.CREATE_AUTHOR,
      payload: savedAuthor
    }));
}

export function loadAuthors() {
  return authorApi.getAuthors()
    .then(authors => {
      dispatcher.dispatch({ type: AuthorActions.LOAD_AUTHORS, payload: authors });
    })
}

export function removeAuthor(authorId) {
  return authorApi.deleteAuthor(authorId)
    .then(() => {
      dispatcher.dispatch({ type: AuthorActions.REMOVE_AUTHOR, payload: authorId });
    });
}