import * as React from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';
import { ListState } from '../state/ListState';
import { SPHttpClient } from '@microsoft/sp-http';
import App from '../components/SpFxSampleRedux';
import * as Actions from '../actions/ListActions';

export interface ISPFxProps {
  store: Store<ListState>;
  description: string;
  libraryName: string;
  spHttpClient: SPHttpClient;
  currentWebUrl: string;
}

export interface IConnectedDispatch {
  updateTitle: (title: string) => void;
  getLists: (spHttpClient: SPHttpClient, currentWebUrl: string) => void;
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
  getLists: (spHttpClient: SPHttpClient, currentWebUrl: string) => {
    dispatch(Actions.getLists(spHttpClient, currentWebUrl));
  },
  addList: (spHttpClient: SPHttpClient, currentWebUrl: string, listtitle: string) => {
    dispatch(Actions.addList(spHttpClient, currentWebUrl, listtitle));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
