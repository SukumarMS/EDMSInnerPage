import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import 'jquery';
import '../../ExternalRef/css/alertify.min.css';
import '../../ExternalRef/css/cropper.min.css';
import '../../ExternalRef/css/richtext.min.css';
export interface IEditListItemWebPartProps {
    description: string;
}
export default class EditListItemWebPart extends BaseClientSideWebPart<IEditListItemWebPartProps> {
    strcropstorage: string;
    imageValue: number;
    imgsrc: any;
    siteURL: string;
    userflag: boolean;
    render(): void;
    EditListItem(): void;
    pageBack(): void;
    bannersValidation(): boolean;
    MediaGalleryValidation(): boolean;
    quickLaunchValidation(): boolean;
    imagecropperChecking(): boolean;
    UpdateItem(strLocalStorage: any, strComponentId: any): Promise<void>;
    renderhtml(strComponentId: any): Promise<void>;
    ViewMode(strComponentMode: any): void;
    getListItems(strComponentId: any): Promise<void>;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
