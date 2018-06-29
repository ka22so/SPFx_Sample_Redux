import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  // PropertyPaneCheckbox,
  // PropertyPaneDropdown,
  // PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxSampleReduxWebPartStrings';
import Container, { ISPFxProps } from './containers/SPFxContainer';

import configureStore from './store/SPFxStore';
import { Provider } from 'react-redux';
const store = configureStore();

export interface ISpFxSampleReduxWebPartProps {
  description: string;
  libraryName: string;
}

export default class SpFxSampleReduxWebPart extends BaseClientSideWebPart<ISpFxSampleReduxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISPFxProps > = React.createElement(
      typeof Provider, null, React.createElement(
        Container,
        {
          store: store,
          description: this.properties.description,
          libraryName: this.properties.libraryName,
          spHttpClient: this.context.spHttpClient,
          currentWebUrl: this.context.pageContext.web.serverRelativeUrl
        }
      )
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('libraryName', {
                  label: 'LibraryName'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
