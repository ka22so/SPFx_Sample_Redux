import * as Actions from '../actions/SPFxActions';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { IODataListItem } from '@microsoft/sp-odata-types';

export function getLibraryItems(spHttpClient: SPHttpClient, currentWebUrl: string, libraryName: string) {
  return async (dispatch: any) => {

    dispatch(Actions.getLibraryItemsRequest());

    try {
      const response: SPHttpClientResponse = await spHttpClient.get(`${currentWebUrl}/_api/web/lists/GetByTitle('${libraryName}')/items?$select=FileLeafRef`, SPHttpClient.configurations.v1);
      const responseJSON = await response.json();
      const lists: any[] = responseJSON.value;
      const listTitles: string[] = lists.map(list => list.FileLeafRef);
      dispatch(Actions.getLibraryItemsSuccess(listTitles));

    } catch (error) {
      dispatch(Actions.getLibraryItemsError(error));
    }
  };
}
