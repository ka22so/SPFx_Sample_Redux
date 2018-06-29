import * as Actions from '../actions/SPFxActions';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { IODataList } from '@microsoft/sp-odata-types';


export function addList(spHttpClient: SPHttpClient, currentWebUrl: string, listTitle: string) {
  return async (dispatch: any) => {

    //Fire the 'request' action if you want to update the state to specify that an ajax request is being made.
    //This can be used to show a loading screen or a spinner.
    dispatch(Actions.addListRequest());

    const spOpts: ISPHttpClientOptions = {
      body: `{ Title: '${listTitle}', BaseTemplate: 100 }`
    };

    try {
      const response: SPHttpClientResponse = await spHttpClient.post(`${currentWebUrl}/_api/web/lists`, SPHttpClient.configurations.v1, spOpts);
      const list: IODataList = await response.json();

      //Fire the 'success' action when you want to update the state based on a successfull request.
      dispatch(Actions.addListSuccess(list.Title));

    } catch (error) {
      //Fire the 'error' action when you want to update the state based on an error request.
      dispatch(Actions.addListError(error));
    }
  };
}

