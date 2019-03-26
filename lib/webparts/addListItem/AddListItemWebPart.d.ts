import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import 'jquery';
import '../../ExternalRef/css/bootstrap-datepicker.min.css';
import '../../ExternalRef/css/alertify.min.css';
import '../../ExternalRef/css/cropper.min.css';
import '../../ExternalRef/css/richtext.min.css';
export interface IAddListItemWebPartProps {
    description: string;
}
export default class AddListItemWebPart extends BaseClientSideWebPart<IAddListItemWebPartProps> {
    userflag: boolean;
    render(): void;
    AddItemPageLoad(): void;
    AddNewItem(): void;
    QuickLaunchUpload(): void;
    BannerImageUpload(): void;
    ImageGallUpload(): void;
    VideoGallUpload(): void;
    MediaImageUpload(): void;
    MediaVideoUpload(): void;
    MediaVideoStreams(): void;
    validateVideoFileType(): void;
    validateImageFileType(): void;
    pageBack(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
