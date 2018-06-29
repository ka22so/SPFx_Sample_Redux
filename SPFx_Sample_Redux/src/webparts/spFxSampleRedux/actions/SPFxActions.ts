import { ActionTypes, Action } from '../actions/SPFxActionType';

//Action Creators to create and return Actions
export const updateTitle = (title: string): Action => ({
  type: ActionTypes.UPDATE_TITLE,
  payload: title
});

//Each AJAX request ideally has 3 actions: request, success and error.
//These can be used to modify the ui such as show a loading icon, show updated list, show error message etc.
export const addListRequest = (): Action => ({
  type: ActionTypes.ADD_LIST_REQUEST
});
export const addListSuccess = (list: string): Action => ({
  type: ActionTypes.ADD_LIST_SUCCESS,
  payload: list
});
export const addListError = (error: Error): Action => ({
  type: ActionTypes.ADD_LIST_ERROR,
  payload: error.message
});

//Actions for getLists
export const getListsRequest = (): Action => ({
  type: ActionTypes.GET_LISTS_REQUEST
});
export const getListsSuccess = (lists: string[]): Action => ({
  type: ActionTypes.GET_LISTS_SUCCESS,
  payload: lists
});
export const getListsError = (error: Error): Action => ({
  type: ActionTypes.GET_LISTS_ERROR,
  payload: error.message
});

//Actions for getLibraryItems
export const getLibraryItemsRequest = (): Action => ({
  type: ActionTypes.GET_LIBRARYITEMS_REQUEST
});
export const getLibraryItemsSuccess = (lists: string[]): Action => ({
  type: ActionTypes.GET_LIBRARYITEMS_SUCCESS,
  payload: lists
});
export const getLibraryItemsError = (error: Error): Action => ({
  type: ActionTypes.GET_LIBRARYITEMS_ERROR,
  payload: error.message
});

