import * as React from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';
import { ListState } from '../state/SPFxState';
import { SPHttpClient } from '@microsoft/sp-http';
import App from '../components/SpFxSampleRedux';
import * as Actions from '../actions/SPFxActions';

import { getLists } from '../api/getLists';
import { addList } from '../api/addList';
import { getLibraryItems } from '../api/getLibraryItems';

export interface ISPFxProps {
  store: Store<ListState>;
  description: string;
  libraryName: string;
  spHttpClient: SPHttpClient;
  currentWebUrl: string;
}

export interface IConnectedDispatch {
  updateTitle: (title: string) => void;
  // getLists: (spHttpClient: SPHttpClient, currentWebUrl: string) => void;
  getLibraryItems: (spHttpClient: SPHttpClient, currentWebUrl: string, libraryName: string) => void;
  addList: (spHttpClient: SPHttpClient, currentWebUrl: string, listtitle: string) => void;
}

export interface IConnectedState {
  title: string;
  lists: string[];
}

export type ISPFxType = ISPFxProps & IConnectedDispatch & IConnectedState;


//Map the application state to the properties of the Components. Making them available in this.props inside the component.
export function mapStateToProps(state: ListState, ownProps: ISPFxProps): IConnectedState {
  return {
    title: state.title,
    lists: state.lists
  };
}

//Map the actions to the properties of the Component. Making them available in this.props inside the component.
export const mapDispatchToProps = (dispatch: Dispatch<ListState>): IConnectedDispatch => ({
  updateTitle: (title: string) => {
    dispatch(Actions.updateTitle(title));
  },
  getLibraryItems: (spHttpClient: SPHttpClient, currentWebUrl: string, libraryName: string) => {
    // dispatch(getLists(spHttpClient, currentWebUrl));
    dispatch(getLibraryItems(spHttpClient, currentWebUrl, libraryName));
  },
  addList: (spHttpClient: SPHttpClient, currentWebUrl: string, listtitle: string) => {
    dispatch(addList(spHttpClient, currentWebUrl, listtitle));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
