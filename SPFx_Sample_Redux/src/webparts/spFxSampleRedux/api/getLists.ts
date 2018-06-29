import * as Actions from '../actions/SPFxActions';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { IODataList } from '@microsoft/sp-odata-types';

export function getLists(spHttpClient: SPHttpClient, currentWebUrl: string) {
  return async (dispatch: any) => {

    dispatch(Actions.getListsRequest());

    try {
      const response: SPHttpClientResponse = await spHttpClient.get(`${currentWebUrl}/_api/web/lists?$filter=Hidden eq false&$select=Title`, SPHttpClient.configurations.v1);
      const responseJSON = await response.json();
      const lists: IODataList[] = responseJSON.value;
      const listTitles: string[] = lists.map(list => list.Title);
      dispatch(Actions.getListsSuccess(listTitles));

    } catch (error) {
      dispatch(Actions.getListsError(error));
    }
  };
}
