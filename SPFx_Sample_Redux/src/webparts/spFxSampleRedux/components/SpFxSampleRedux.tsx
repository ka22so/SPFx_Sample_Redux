import * as React from 'react';
import styles from './SpFxSampleRedux.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

import { ISPFxType } from '../containers/SPFxContainer';

import { GroupedListBasicExample } from '../components/GroupedList';

export default class SpFxSampleRedux extends React.Component<ISPFxType, {}> {
  public render(): React.ReactElement<ISPFxType> {
    return (
      <div className={ styles.spFxSampleRedux }>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <span>Add New List:</span>
              <div>
                <input type="text" value={this.props.title} onChange={this.handleChange.bind(this)} />
                <input type="submit" value="Add" onClick={this.handleSubmit.bind(this)} />
              </div>
              <ul>
                {this.props.lists.map(list => {
                  return <li>{list}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <GroupedListBasicExample />
      </div>
    );
  }
  private handleChange(event: React.FormEvent<HTMLInputElement>){
    this.props.updateTitle(event.currentTarget.value);
  }

  private handleSubmit(event: React.MouseEvent<HTMLInputElement>){
    this.props.addList(this.props.spHttpClient, this.props.currentWebUrl, this.props.title);
  }

  private componentDidMount() {
    // this.props.getLists(this.props.spHttpClient, this.props.currentWebUrl);
    this.props.getLibraryItems(this.props.spHttpClient, this.props.currentWebUrl, this.props.libraryName);
  }
}
