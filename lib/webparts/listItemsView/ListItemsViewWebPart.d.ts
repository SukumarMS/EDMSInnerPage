import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import 'jquery';
export interface IListItemsViewWebPartProps {
    description: string;
}
export default class ListItemsViewWebPart extends BaseClientSideWebPart<IListItemsViewWebPartProps> {
    userflag: boolean;
    render(): void;
    viewlistitemdesign(): void;
    ViewListItems(strLocalStorage: any, strLinktype: any): Promise<void>;
    renderhtml(objResults: any, strLocalStorage: any): void;
    viewitem(strLocalStorage: any): void;
    edititem(strLocalStorage: any): void;
    deleteitems(strLocalStorage: any): void;
    eventfunction(): void;
    holidayfunction(): void;
    addevent(strLocalStorage: any): void;
    Checksubsite(ListItems: any[]): void;
    CheckDocuments(DocumentItems: any[]): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
