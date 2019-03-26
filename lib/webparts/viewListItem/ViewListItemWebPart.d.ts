import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import 'jquery';
import '../../ExternalRef/css/richtext.min.css';
export interface IViewListItemWebPartProps {
    description: string;
}
export default class ViewListItemWebPart extends BaseClientSideWebPart<IViewListItemWebPartProps> {
    render(): void;
    viewitemdesign(): void;
    FetchListItems(): Promise<void>;
    GetColumns(listName: string): Promise<any[]>;
    GetDocImages(DocType: string): Promise<any>;
    renderhtml(): Promise<void>;
    SubmitComments(): void;
    GetComments(filterKey?: boolean): void;
    DeleteComments(id: string): void;
    SubmitLikes(): Promise<void>;
    GetLikes(): Promise<void>;
    nullDateValidate(nullDate: any): string;
    GetLikesCount(): Promise<void>;
    GetViewCount(Users: string): Promise<any>;
    AnnouncementValidation(): boolean;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
