var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'AddListItemWebPartStrings';
import pnp from 'sp-pnp-js';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { checkUserinGroup, addItems, GetQueryStringParams, base64ToArrayBuffer } from '../commonJS';
import 'jquery';
import '../../ExternalRef/css/bootstrap-datepicker.min.css';
import '../../ExternalRef/css/alertify.min.css';
import '../../ExternalRef/css/cropper.min.css';
import '../../ExternalRef/css/richtext.min.css';
require('bootstrap');
require('../../ExternalRef/js/alertify.min.js');
require('../../ExternalRef/js/bootstrap-datepicker.min.js');
require('../../ExternalRef/js/cropper-main.js');
require('../../ExternalRef/js/cropper.min.js');
require('../../ExternalRef/js/jquery.richtext.js');
var AddListItemWebPart = /** @class */ (function (_super) {
    __extends(AddListItemWebPart, _super);
    function AddListItemWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userflag = false;
        return _this;
    }
    AddListItemWebPart.prototype.render = function () {
        SPComponentLoader.loadCss("/sites/BloomHolding/_catalogs/masterpage/BloomHomepage/css/jquery-ui.min.css");
        SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.3/croppie.css');
        SPComponentLoader.loadScript("/sites/BloomHolding/_catalogs/masterpage/BloomHomepage/js/jquery-ui.min.js");
        var _this = this;
        var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
        //Checking user details in group
        checkUserinGroup(strLocalStorage, this.context.pageContext.user.email, function (result) {
            if (result == 1) {
                _this.userflag = true;
                _this.AddItemPageLoad();
            }
            else {
                alertify.alert('Access Denied', 'Sorry You dont have access to this page', function () {
                    history.go(-1);
                }).set('closable', false);
            }
        });
    };
    AddListItemWebPart.prototype.AddItemPageLoad = function () {
        var _this = this;
        var siteweburl = this.context.pageContext.web.absoluteUrl;
        var siteUrl = this.context.pageContext.site.absoluteUrl;
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split("%20").join(' ');
        this.domElement.innerHTML =
            "<div class='breadcrumb'>" +
                "<ol>" +
                "<li><a href='" + siteweburl + "/Pages/Home.aspx' title='Home'>Home</a></li>" +
                "<li><a class='pointer' id='breadTilte' title='" + strLocalStorage + "'>" + strLocalStorage + "</a></li>" +
                "<li><span>Add New" + strLocalStorage + "</span></li>" +
                "</ol>" +
                "</div>" +
                "<div class='title-section'>" +
                "<div class='button-field save-button'>" +
                "<a  title='Save' class='addbutton pointer' id='AddItem'><i class='commonicon-save addbutton'></i>Save</a>" +
                "<a class='delete-icon close-icon pointer deletebutton' class='closebutton' title='Close' id='CloseItem'><i class='commonicon-close deletebutton'></i>Close</a>" +
                "</div>" +
                "<h2 id='ComponentName'></h2>" +
                "</div>" +
                "<div class='form-section required'>" +
                // MEDIA GALLERY - DESIGN - START
                "<div id='MediaGallerySectionDiv'>" +
                // MEDIA TYPE SELECTION - START
                "<div id='radioSelctionMediaGalleryDiv' >" +
                "<div class='radio-btn appendOptionImage'>" +
                "<div class='col-md-12 form-group'>" +
                "<label class='control-label'>Choose Media Type</label>" +
                "<div class='radio col-md-6'>" +
                "<input id='radioImage' name='selectionradioMediaImage' type='radio' value='Image'>" +
                "<label for='radioImage' class='radio-label'>Image</label>" +
                "</div>" +
                "<div class='radio col-md-6'>" +
                "<input id='radioVideo' name='selectionradioMediaImage' type='radio' value='Video'>" +
                "<label for='radioVideo' class='radio-label'>Video</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                // MEDIA TYPE SELECTION - END
                "<div id='formImageSectionDiv' class='imageDivClass'>" +
                // IMAGE SECTION - START
                // HTML IMAGE EVENTS
                "<div class='form-imgsec'>" +
                "<div class='themelogo-upload'>" +
                "<label class='control-label'>Image</label>" +
                "<img id='cropped-img' src='" + siteUrl + "/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg'>" +
                "<div class='image-upload'>" +
                "<div class='custom-upload'>" +
                "<input type='file' id='inputImage' name='file' accept='.jpg,.jpeg,.png,.gif,.bmp,.tiff' multiple='' class='file' />" +
                "<button class='btn btn-primary' type='button'><i class='icon-camera'></i></button>" +
                "</div>" +
                "<a href='#' title='Delete' id='image-delete'>" +
                "<i class='icon-delete'></i>" +
                "</a>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12' id='canvasdisplay' style='display:none'>" +
                "<h4>Image Preview </h4>" +
                "<div class='btn-group-crop'>" +
                "<button type='button' class='btn btn-primary'id='btnCrop' ><i class='commonicon-save'></i>Save</button>" +
                "<button class='btn btn-primary crop-cancel' id='btnRestore' type='button'><i class='commonicon-close'></i>Cancel</button>" +
                "<canvas id='canvas'>" +
                "</canvas>" +
                "</div>" +
                "</div>" +
                // TEXT
                "<div class='input text'>" +
                "<label class='control-label'>Title</label>" +
                "<input class='form-control' type='text' value='' maxlength='30' id='txtTitle' />" +
                "</div>" +
                "</div>" +
                // IMAGE SECTION - END
                // VIDEO SECTION - START
                "<div id='formVideoSectionDiv' class='videoDivClass'>" +
                // VIDEO TYPE SELECTION - START
                "<div class='radio-btn appendOptionImage'>" +
                "<div class='col-md-12 form-group'>" +
                "<label class='control-label'>Choose Video Type</label>" +
                "<div class='radio col-md-6'>" +
                "<input id='radioUpload' name='selectionVideoType' type='radio' value='Upload'>" +
                "<label for='radioUpload' class='radio-label'>Upload</label>" +
                "</div>" +
                "<div class='radio col-md-6'>" +
                "<input id='radioStream' name='selectionVideoType' type='radio' value='Stream'>" +
                "<label for='radioStream' class='radio-label'>Stream</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                // VIDEO TYPE SELECTION - END
                "<div class='input text'>" +
                "<label class='control-label'>Title</label>" +
                "<input class='form-control' type='text' value='' maxlength='30' id='txtMediaTitle' />" +
                "</div>" +
                "<div id='mediaSiteLinkDiv' class='input text'>" +
                "<label class='control-label'>Link URL</label>" +
                "<input class='form-control' type='text' value='' id='streamURLtext' />" +
                "<label>Please provide proper URL </label>" +
                "</div>" +
                // UPLOAD VIDEO FILE - START
                "<div id='uploadVideoFile' class='form-imgsec'>" +
                "<div class='themelogo-upload' style='display: block;'>" +
                "<div class='custom-upload banner-upload'>" +
                "<label class='control-label'>Upload Video File</label>" +
                "<input type='file' id='uploadVideoFileType' name='file' accept='video/mp4,video/x-m4v,video/*' multiple='' class='file'>" +
                "<div class='input-group'>" +
                "<span class='input-group-btn input-group-sm'><button type='button' class='btn btn-fab btn-fab-mini'>Browse</button></span>" +
                "<input id='uploadFileNameText' type='text' readonly='' class='form-control' placeholder='Upload Files'>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                // UPLOAD VIDEO FILE - END
                "</div>" +
                // VIDEO SECTION - END
                "</div>" +
                // MEDIA GALLERY - DESIGN - END
                // BANNERS SECTION - START
                "<div id='BannerSectionDiv'>" +
                // IMAGE SECTION - START
                // HTML IMAGE EVENTS
                "<div class='form-imgsec'>" +
                "<div class='themelogo-upload'>" +
                "<label class='control-label'>Image</label>" +
                "<img id='cropped-img' src='" + siteUrl + "/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg'>" +
                "<div class='image-upload'>" +
                "<div class='custom-upload'>" +
                "<input type='file' id='inputImage' name='file' accept='.jpg,.jpeg,.png,.gif,.bmp,.tiff' multiple='' class='file' />" +
                "<button class='btn btn-primary' type='button'><i class='icon-camera'></i></button>" +
                "</div>" +
                "<a href='#' title='Delete' id='image-delete'>" +
                "<i class='icon-delete'></i>" +
                "</a>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12' id='canvasdisplay' style='display:none'>" +
                "<h4>Image Preview </h4>" +
                "<div class='btn-group-crop'>" +
                "<button type='button' class='btn btn-primary'id='btnCrop' ><i class='commonicon-save'></i>Save</button>" +
                "<button class='btn btn-primary crop-cancel' id='btnRestore' type='button'><i class='commonicon-close'></i>Cancel</button>" +
                "<canvas id='canvas'>" +
                "</canvas>" +
                "</div>" +
                "</div>" +
                // TEXT
                "<div class='input text'>" +
                "<label class='control-label'>Title</label>" +
                "<input class='form-control' type='text' value='' maxlength='30' id='txtTitle' />" +
                "</div>" +
                // DESCRIPTION 
                "<div id='rrdescription' class='input textarea'>" +
                "<label class='control-label'>Description</label>" +
                "<textarea class='form-control content' id='txtrequiredDescription'></textarea>" +
                "</div>" +
                // HYPER LINK
                "<div class='input text'>" +
                "<label>Link URL</label>" +
                "<input class='form-control' type='text' value='' id='txtHyper' />" +
                "<label>Please give valid URL</label>" +
                "</div>" +
                "</div>" +
                // IMAGE SECTION - END
                // BANNER SECTION - END
                // IMAGE GALLERY - START
                "<div id='ImageGallerySectionDiv'>" +
                "<div id='foldername' class='input text'>" +
                "<label class='control-label'>Folder Name</label>" +
                "<input class='form-control' type='text' value='' id='txtFolderName' /></div>" +
                "<div class='form-imgsec'>" +
                "<div class='themelogo-upload' style='display: block;'>" +
                "<div class='custom-upload banner-upload'>" +
                "<label class='control-label'>Upload Image File</label>" +
                "<input type='file' id='uploadImageFile' name='file' accept='.jpg,.jpeg,.png,.gif,.bmp,.tiff' multiple='' class='file'>" +
                "<div class='input-group'>" +
                "<span class='input-group-btn input-group-sm'>" +
                "<button type='button' class='btn btn-fab btn-fab-mini'>Browse</button>" +
                "</span>" +
                "<input id='uploadFileNameText' type='text' readonly='' class='form-control' placeholder='Upload Files'>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                // IMAGE GALLERY - END
                // VIDEO GALLERY - START
                "<div id='VideoGallerySectionDiv'>" +
                "<div class='radio-btn appendOptionImage'>" +
                "<div class='col-md-12 form-group'>" +
                "<label>Choose Component</label>" +
                "<div class='radio col-md-6'>" +
                "<input checked='checked' id='radio-3' name='selectionradioImage' type='radio' value='Upload'>" +
                "<label for='radio-3' class='radio-label'>Upload</label>" +
                "</div>" +
                "<div class='radio col-md-6'>" +
                "<input id='radio-4' name='selectionradioImage' type='radio' value='Stream'>" +
                "<label for='radio-4' class='radio-label'>Stream</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div id='foldername' class='input text'>" +
                "<label class='control-label'>Folder Name</label>" +
                "<input class='form-control' type='text' value='' id='txtFolderName' /></div>" +
                "<div class='input text'>" +
                "<label class='control-label'>Title</label>" +
                "<input class='form-control' type='text' value='' maxlength='30' id='txtTitle' /></div>" +
                "<div class='form-imgsec'>" +
                "<div class='themelogo-upload' style='display: block;'>" +
                "<div class='custom-upload banner-upload'>" +
                "<label class='control-label'>Upload Video File</label>" +
                "<input type='file' id='uploadVideoFileType' name='file' accept='video/mp4,video/x-m4v,video/*' multiple='' class='file'>" +
                "<div class='input-group'>" +
                "<span class='input-group-btn input-group-sm'>" +
                "<button type='button' class='btn btn-fab btn-fab-mini'>Browse</button>" +
                "</span>" +
                "<input type='text' id='uploadFileNameText' readonly='' class='form-control' placeholder='Upload Files'>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='input text' id='divHyperLink'>" +
                "<label class='control-label'>Link URL</label>" +
                "<input class='form-control' type='text' value='' id='txtHyper' />" +
                "<span>Please enter the Link URL in the following format : https://www.bloomholding.com</span>" +
                "</div>" +
                "</div>" +
                // VIDEO GALLERY - END
                // ANNOUNCEMENTS - START
                "<div id='AnnouncementsSectionDiv'>" +
                "</div>" +
                // ANNOUNCEMENTS - END
                // QUICK LINKS - START
                "<div id='QuickLaunchSectionDiv'>" +
                "<div class='input text'>" +
                "<label class='control-label'>Title</label>" +
                "<input class='form-control' type='text' value='' maxlength='30' id='txtTitle' />" +
                "</div>" +
                "<div class='input text'>" +
                "<label>Link URL</label>" +
                "<input class='form-control' type='text' value='' id='txtHyper' />" +
                "<label>Please Provide proper URL</label>" +
                "</div>" +
                "</div>" +
                // QUICK LINKS - END
                "</div>" +
                "<div class='modal-loader-cls'><!-- Place at bottom of page --></div>";
        // ADD RICH DESCRIPTION
        $('.content').richText();
        // GET QUERY STRING COMPONENT VALUE
        document.title = 'Add ' + strLocalStorage;
        document.getElementById("ComponentName").innerHTML = GetQueryStringParams("CName").split('%20').join(" ");
        // HIDE HTML
        $('#MediaGallerySectionDiv').hide();
        $('#ImageGallerySectionDiv').hide();
        $('#VideoGallerySectionDiv').hide();
        $('#QuickLaunchSectionDiv').hide();
        $('#BannerSectionDiv').hide();
        $('#AnnouncementsSectionDiv').hide();
        // LOAD HTML BASED ON QUERY STRING
        if (strLocalStorage == "Media Gallery") {
            $('#MediaGallerySectionDiv').show();
            $('#formImageSectionDiv').hide();
            $('#formVideoSectionDiv').hide();
            $('#mediaSiteLinkDiv').hide();
            $('#uploadVideoFile').hide();
            $('#ImageGallerySectionDiv').remove();
            $('#VideoGallerySectionDiv').remove();
            $('#QuickLaunchSectionDiv').remove();
            $('#AnnouncementsSectionDiv').remove();
            $('#BannerSectionDiv').remove();
        }
        else if (strLocalStorage == "Banners") {
            $('#BannerSectionDiv').show();
            $('#MediaGallerySectionDiv').remove();
            $('#ImageGallerySectionDiv').remove();
            $('#VideoGallerySectionDiv').remove();
            $('#QuickLaunchSectionDiv').remove();
            // $('#BannerSectionDiv').remove();
            $('#AnnouncementsSectionDiv').remove();
        }
        else if (strLocalStorage == "Image Gallery") {
            $('#ImageGallerySectionDiv').show();
            $('#MediaGallerySectionDiv').remove();
            $('#VideoGallerySectionDiv').remove();
            $('#QuickLaunchSectionDiv').remove();
            $('#BannerSectionDiv').remove();
            $('#AnnouncementsSectionDiv').remove();
            $('#MediaGallerySectionDiv').remove();
        }
        else if (strLocalStorage == "Video Gallery") {
            $('#MediaGallerySectionDiv').remove();
            $('#ImageGallerySectionDiv').remove();
            $('#VideoGallerySectionDiv').show();
            $('#divHyperLink').hide();
            $('.banner-upload').show();
            $('#QuickLaunchSectionDiv').remove();
            $('#BannerSectionDiv').remove();
            $('#AnnouncementsSectionDiv').remove();
        }
        else if (strLocalStorage == "Announcements") {
            $('#MediaGallerySectionDiv').remove();
            $('#ImageGallerySectionDiv').remove();
            $('#VideoGallerySectionDiv').remove();
            $('#QuickLaunchSectionDiv').remove();
            $('#BannerSectionDiv').remove();
            $('#AnnouncementsSectionDiv').show();
        }
        else if (strLocalStorage == "Quick Launch") {
            $('#MediaGallerySectionDiv').remove();
            $('#ImageGallerySectionDiv').remove();
            $('#VideoGallerySectionDiv').remove();
            $('#QuickLaunchSectionDiv').show();
            $('#BannerSectionDiv').remove();
            $('#AnnouncementsSectionDiv').remove();
        }
        // EVENT ONE : MEDIA TYPE
        $("input[name='selectionradioMediaImage']").click(function () {
            var radioValue = $("input[name='selectionradioMediaImage']:checked").val();
            if (radioValue == "Image") {
                $('#cropped-img').attr("src", siteUrl + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg');
                $('#formImageSectionDiv').show();
                $('#formVideoSectionDiv').hide();
                $('#txtMediaTitle').val('');
                $('#streamURLtext').val('');
                $('#inputImage').val('');
                $('#txtTitle').val('');
                $('#txtHyper').val('');
                $('#rrdescription').val('');
                $('#uploadVideoFileType').val('');
                $('#uploadFileNameText').val('');
            }
            else if (radioValue == "Video") {
                $('#txtMediaTitle').val('');
                $('#cropped-img').attr("src", siteUrl + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg');
                $('#formImageSectionDiv').hide();
                $('#formVideoSectionDiv').show();
                $('#streamURLtext').val('');
                $('#inputImage').val('');
                $('#txtTitle').val('');
                $('#txtHyper').val('');
                $('#rrdescription').val('');
                $('#uploadVideoFileType').val('');
                $('#uploadFileNameText').val('');
            }
        });
        // EVENT TWO  : VIDEO TYPE
        $("input[name='selectionVideoType']").click(function () {
            var radioValue = $("input[name='selectionVideoType']:checked").val();
            if (radioValue == "Upload") {
                $('#uploadVideoFile').show();
                $('#mediaSiteLinkDiv').hide();
                $('#txtMediaTitle').val('');
                $('#streamURLtext').val('');
                $('#cropped-img').attr("src", siteUrl + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg');
                $('#inputImage').val('');
                $('#txtTitle').val('');
                $('#txtHyper').val('');
                $('#rrdescription').val('');
                $('#uploadVideoFileType').val('');
                $('#uploadFileNameText').val('');
            }
            else if (radioValue == "Stream") {
                $('#mediaSiteLinkDiv').show();
                $('#cropped-img').attr("src", siteUrl + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg');
                $('#uploadVideoFile').hide();
                $('#txtMediaTitle').val('');
                $('#streamURLtext').val('');
                $('#inputImage').val('');
                $('#txtTitle').val('');
                $('#txtHyper').val('');
                $('#rrdescription').val('');
                $('#uploadVideoFileType').val('');
                $('#uploadFileNameText').val('');
            }
        });
        // CROPPER SECTION
        $('#image-delete').click(function () {
            var siteImageURL = window.location.origin;
            ;
            if ($('#cropped-img')[0].src == siteUrl + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg') {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Upload the Image File");
            }
            else if ($('#inputImage').length > 0) {
                $('#cropped-img').removeClass("crop-imagedisplay");
                $('.image-upload').css('width', '103px');
                $("#cropped-img").attr('src', siteUrl + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg');
                // $("#inputImage").val("");
                //    that.ImageCropping()
            }
        });
        if ($('#inputImage').length > 0) {
            var canvas = $("#canvas"), context = canvas.get(0).getContext("2d"), $result = $('#cropped-img');
            $('#inputImage').change(function () {
                var iscropflag = true;
                var docname = $(this).val().split('.');
                docname = docname[docname.length - 1].toLowerCase();
                //$(this).attr("value", "");
                if ($.inArray(docname, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff']) == -1) {
                    //alertify.set('notifier', 'position', 'bottom-right');
                    //alertify.error("Please Select Valid file Format");
                    $("#inputImage").val("");
                    iscropflag = false;
                }
                if (iscropflag) {
                    canvas.cropper('destroy');
                    if (this.files && this.files[0]) {
                        if (this.files[0].type.match(/^image\//)) {
                            var reader = new FileReader();
                            reader.onload = function (evt) {
                                var img = new Image();
                                img.onload = function () {
                                    context.canvas.height = img.height;
                                    context.canvas.width = img.width;
                                    context.drawImage(img, 0, 0);
                                    var cropper = canvas.cropper({
                                        aspectRatio: 16 / 9,
                                        built: function () {
                                            var container = $(this).cropper('getImageData');
                                            $(this).cropper('setCropBoxData', {
                                                width: container.width,
                                                height: container.height,
                                                left: container.left,
                                                top: container.top
                                            });
                                        }
                                    });
                                };
                                img.src = evt.target['result'];
                                $('#canvasdisplay').css('display', 'block');
                            };
                            reader.readAsDataURL(this.files[0]);
                        }
                        else {
                            alertify.set('notifier', 'position', 'top-right');
                            alertify.error("Invalid file type! Please select an image file.");
                        }
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("No file(s) selected.");
                    }
                }
            });
            $('#btnCrop').click(function () {
                // Get a string base 64 data url
                $result.empty();
                var croppedImageDataURL = canvas.cropper('getCroppedCanvas').toDataURL("image/png");
                $result.attr('class', 'crop-imagedisplay');
                //$('.image-upload').css('width', '42%');
                $result.attr('src', croppedImageDataURL);
                $('#canvasdisplay').css('display', 'none');
                canvas.cropper('reset');
                $result.empty();
                // $('#inputImage').val("");
            });
            $('#btnRestore').click(function () {
                canvas.cropper('reset');
                $result.empty();
                $result.attr('src', this.p + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg');
                $('#canvasdisplay').css('display', 'none');
                $('#inputImage').val("");
            });
        }
        function InputChange() {
            var _that = $('#InputImage');
            var iscropflag = true;
            var docname = _that.val().split('.');
            docname = docname[docname.length - 1].toLowerCase();
            if ($.inArray(docname, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff']) == -1) {
                //alertify.set('notifier', 'position', 'bottom-right');
                //alertify.error("Please Select Valid file Format");
                $("#inputImage").val("");
                iscropflag = false;
            }
            if (iscropflag) {
                canvas.cropper('destroy');
                if (_that.files && _that.files[0]) {
                    if (_that.files[0].type.match(/^image\//)) {
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            var img = new Image();
                            img.onload = function () {
                                context.canvas.height = img.height;
                                context.canvas.width = img.width;
                                context.drawImage(img, 0, 0);
                                var cropper = canvas.cropper({
                                    aspectRatio: 16 / 9
                                });
                            };
                            //img.src = evt.target.result;
                            img.src = evt.target['result'];
                            $('#canvasdisplay').css('display', 'block');
                        };
                        reader.readAsDataURL(this.files[0]);
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("Invalid file type! Please select an image file.");
                    }
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("No file(s) selected.");
                }
            }
        }
        // CHANGE VIDEO EVENT TYPE
        $("input[name='selectionradioImage']").click(function () {
            var radioValue = $("input[name='selectionradioImage']:checked").val();
            if (radioValue == "Upload") {
                $('#divHyperLink').hide();
                $('.banner-upload').show();
            }
            else {
                $('.banner-upload').hide();
                $('#divHyperLink').show();
            }
        });
        // FIX - SHOW FILE NAME ON UPLOAD
        $("input[type=file]").change(function () {
            if (strLocalStorage == "Video Gallery") {
                $('#uploadFileNameText').val($('#uploadVideoFileType').val().replace(/C:\\fakepath\\/i, ''));
            }
            else if (strLocalStorage == "Image Gallery") {
                $('#uploadFileNameText').val($('#uploadImageFile').val().replace(/C:\\fakepath\\/i, ''));
            }
            else if (strLocalStorage == "Media Gallery") {
                $('#uploadFileNameText').val($('#uploadVideoFileType').val().replace(/C:\\fakepath\\/i, ''));
            }
        });
        // ADD EVENTS SECTIONS
        // TRIGGER EVENT ON SAVE 
        var Addevent = document.getElementById('AddItem');
        Addevent.addEventListener("click", function (e) { return _this.AddNewItem(); });
        // TRIGGER EVENT DELETE
        var Closeevent = document.getElementById('CloseItem');
        Closeevent.addEventListener("click", function (e) { return _this.pageBack(); });
        // BREAD CRUMB NAVIGATE BACK
        var breadTilte = document.getElementById('breadTilte');
        breadTilte.addEventListener("click", function (e) { return _this.pageBack(); });
        // TRIGGER FILE VALIDATOR - VIDEO
        var videochangeEvent = document.getElementById('uploadVideoFileType');
        if (videochangeEvent) {
            videochangeEvent.addEventListener("change", function (e) { return _this.validateVideoFileType(); });
        }
        // TRIGGER FILE VALIDATOR - IMAGE
        var changeEvent = document.getElementById('uploadImageFile');
        if (changeEvent) {
            changeEvent.addEventListener("change", function (e) { return _this.validateImageFileType(); });
        }
        $('#image-delete').click(function () {
            // var siteImageURL = window.location.origin;;
            var siteUrl = this.context.pageContext.site.absoluteUrl;
            if ($('#cropped-img')[0].src == siteUrl + "/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg'") {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Upload the Image File");
            }
            else if ($('#inputImage').length > 0) {
                $('#cropped-img').removeClass("crop-imagedisplay");
                $('.image-upload').css('width', '103px');
                $("#cropped-img").attr('src', "'" + siteUrl + "/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg'");
                $("#inputImage").val("");
                $("#inputImage.file").val("");
            }
        });
        // SEARCH FOLDER NAMES FOR VIDEO GALLERY & IMAGE GALLERY
        $('#txtFolderName').keyup(function () {
            var array = [];
            $.ajax({
                url: siteweburl + "/_api/Web/Lists/GetByTitle('" + strLocalStorage + "')/Items?$expand=ContentType&$select=LinkFilename,FileSystemObjectType",
                type: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                },
                success: function (data) {
                    var ItemLength = data.d.results.length;
                    for (var i = 0; i < ItemLength; i++) {
                        if (data.d.results[i].FileSystemObjectType == 1) {
                            array.push(data.d.results[i].LinkFilename);
                        }
                    }
                    $('#txtFolderName').autocomplete({ source: array });
                },
                error: function (data) {
                    console.log(data);
                },
            });
            // let siteWebUrl = this.context.pageContext.web.absoluteUrl;
            // let columnArray: any = ["ID", "LinkFilename","FileLeafRef", "FileSystemObjectType", "FileDirRef"];
            // let picItems : any;
            // picItems = pnp.sp.web.lists.getByTitle("Image Gallery").items.select(columnArray).get().then(function(){
            //     let itemLength = picItems.length;
            //     for (let i = 0; i < itemLength; i++){
            //       if(picItems[i].FileSystemObjectType == 1){
            //         array.push(picItems[i].FileLeafRef)
            //       }
            //     }
            //     $('#txtFolderName').autocomplete({ source: array });
            //   })
        });
    };
    AddListItemWebPart.prototype.AddNewItem = function () {
        var isAllfield;
        if ($('.ajs-message').length > 0) {
            $('.ajs-message').remove();
        }
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split("%20").join(' ');
        if (strLocalStorage == "Media Gallery") {
            var radioValue = $("input[name='selectionradioMediaImage']:checked").val();
            if (radioValue == "Image") {
                this.MediaImageUpload();
            }
            else if (radioValue == "Video") {
                var radioValue = $("input[name='selectionVideoType']:checked").val();
                if (radioValue == "Upload") {
                    this.MediaVideoUpload();
                }
                else if (radioValue == "Stream") {
                    this.MediaVideoStreams();
                }
                else if (typeof radioValue == 'undefined') {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Please Choose Video Type");
                    isAllfield = false;
                }
            }
            else if (typeof radioValue == 'undefined') {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Choose Media Type");
                isAllfield = false;
            }
        }
        else if (strLocalStorage == "Banners") {
            this.BannerImageUpload();
        }
        else if (strLocalStorage == "Image Gallery") {
            this.ImageGallUpload();
        }
        else if (strLocalStorage == "Video Gallery") {
            this.VideoGallUpload();
        }
        else if (strLocalStorage == "Quick Launch") {
            this.QuickLaunchUpload();
        }
    };
    AddListItemWebPart.prototype.QuickLaunchUpload = function () {
        var isAllfield = true;
        var $body = $('body');
        var regexp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        if (!$('#txtTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Title");
            isAllfield = false;
        }
        else if (!$('#txtHyper').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Link URL");
            isAllfield = false;
        }
        else if (!regexp.test($('#txtHyper').val().trim())) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Link URL Correctly");
            isAllfield = false;
        }
        var myobjQl = {
            Title: $("#txtTitle").val().trim(),
            LinkURL: {
                "__metadata": {
                    "type": "SP.FieldUrlValue"
                },
                Url: $('#txtHyper').val().trim(),
            },
            Display: false
        };
        if (isAllfield) {
            $body.addClass("loading");
            addItems("Quick Launch", myobjQl).then(function () {
                $body.removeClass("loading");
                window.history.back();
            });
        }
    };
    AddListItemWebPart.prototype.BannerImageUpload = function () {
        var strLocalStorage = GetQueryStringParams("CName");
        var isAllfield = true;
        var $body = $('body');
        var regexp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        var files = document.getElementById("inputImage");
        var file = files.files[0];
        var siteUrl = this.context.pageContext.site.absoluteUrl;
        if ($('#cropped-img')[0].src == siteUrl + "/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Select the Image");
            isAllfield = false;
        }
        else if (!$('#txtTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter the Title");
            isAllfield = false;
        }
        else if (!$('.richText-editor').text().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter the Description");
            isAllfield = false;
        }
        else if ($('#canvasdisplay').css('display') == 'block') {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Save Cropped Image");
            isAllfield = false;
        }
        var uniquename = Math.random().toString(36).substr(2, 9) + ".png";
        var file1 = $('#cropped-img').attr('src').split("base64,");
        var blob = base64ToArrayBuffer(file1[1]);
        var myobjQl = {
            Title: $("#txtTitle").val().trim(),
            // BannerContent: $("#txtrequiredDescription").val(),
            BannerContent: $('.richText-editor').html(),
            Image: {
                "__metadata": {
                    "type": "SP.FieldUrlValue"
                },
                Url: this.context.pageContext.web.absoluteUrl + "/" + strLocalStorage + "/" + uniquename
            },
            LinkURL: {
                "__metadata": {
                    "type": "SP.FieldUrlValue"
                },
                Url: $('#txtHyper').val(),
            }
        };
        if (isAllfield) {
            $body.addClass("loading");
            pnp.sp.web.getFolderByServerRelativeUrl(strLocalStorage).files.add(uniquename, blob, true).then(function (result) {
                result.file.listItemAllFields.get().then(function (listItemAllFields) {
                    pnp.sp.web.lists.getByTitle(strLocalStorage).items.getById(listItemAllFields.Id).update(myobjQl).then(function () {
                        $body.removeClass("loading");
                        $('.addbutton').prop('disabled', true);
                        window.history.back();
                    });
                });
            });
        }
    };
    AddListItemWebPart.prototype.ImageGallUpload = function () {
        var isAllfield = true;
        var $body = $('body');
        var files = document.getElementById("uploadImageFile");
        var file = files.files[0];
        if (!$('#uploadImageFile').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Select the Image");
            isAllfield = false;
        }
        else if (!$('#txtFolderName').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please provide folder name");
            isAllfield = false;
        }
        if (isAllfield) {
            $body.addClass("loading");
            pnp.sp.web.lists.getByTitle("Image Gallery").rootFolder.folders.add($('#txtFolderName').val())
                .then(function (data) {
                pnp.sp.web.getFolderByServerRelativeUrl("Image Gallery" + "/" + $('#txtFolderName').val()).files.add(file.name, file, true)
                    .then(function (result) {
                    $body.removeClass("loading");
                    window.history.back();
                });
            });
        }
    };
    AddListItemWebPart.prototype.VideoGallUpload = function () {
        var _this = this;
        var regexp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        var isAllfield = true;
        var $body = $('body');
        var streamValidationForUrl = "https://web.microsoftstream.com";
        var radioValue = $("input[name='selectionradioImage']:checked").val();
        if (radioValue == "Upload") {
            if (!$('#txtFolderName').val()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please enter the Folder name");
                isAllfield = false;
            }
            else if (!$('#txtTitle').val()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please enter the Title");
                isAllfield = false;
            }
            else if (!$('#uploadVideoFileType').val()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Select the video File");
                isAllfield = false;
            }
        }
        if (radioValue == "Stream") {
            if (!$('#txtFolderName').val()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please enter the Folder name");
                isAllfield = false;
            }
            else if (!$('#txtTitle').val()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please enter the Title");
                isAllfield = false;
            }
            else if (!$('#txtHyper').val()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Enter the URL");
                isAllfield = false;
            }
            else if (!regexp.test($('#txtHyper').val())) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Enter valid URL");
                isAllfield = false;
            }
            else if (($('#txtHyper').val().indexOf(streamValidationForUrl) == -1)) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Only Microsoft Streams URL Allowed");
                isAllfield = false;
            }
        }
        if (isAllfield) {
            $body.addClass("loading");
            pnp.sp.web.lists.getByTitle("Video Gallery").rootFolder.folders.add($('#txtFolderName').val())
                .then(function (data) {
                if (radioValue == "Upload") {
                    var files = document.getElementById("uploadVideoFileType");
                    var file = files.files[0];
                    var VideoTitle = { Title: $('#txtTitle').val().trim() };
                    pnp.sp.web.getFolderByServerRelativeUrl("Video Gallery" + "/" + $('#txtFolderName').val()).files.add(file.name, file, true)
                        .then(function (_a) {
                        var file = _a.file;
                        return file.getItem();
                    })
                        .then(function (item) { return item.update(VideoTitle); })
                        .then(function (result) {
                        $body.removeClass("loading");
                        window.history.back();
                    });
                }
                else {
                    var Videojson = {
                        Title: $("#txtTitle").val(),
                        LinkURL: {
                            "__metadata": { "type": "SP.FieldUrlValue" },
                            Url: $('#txtHyper').val().trim()
                        }
                    };
                    if ($("#uploadVideoFileType").val() == undefined || $("#uploadVideoFileType").val() == null || $("#uploadVideoFileType").val() == '') {
                        var rootSiteUrl = _this.context.pageContext.site.absoluteUrl;
                        var siteTitle = rootSiteUrl.lastIndexOf("/") + 1;
                        $.ajax({
                            url: _this.context.pageContext.site.absoluteUrl + "/_api/web/getfilebyserverrelativeurl('/sites/" + siteTitle + "/_catalogs/masterpage/Bloom/images/logo.png')/openbinarystream",
                            type: "GET",
                            success: function (data) {
                                var name = $("#txtTitle").val().trim() + '.jpg';
                                pnp.sp.web.getFolderByServerRelativeUrl("Video Gallery" + "/" + $('#txtFolderName').val()).files.add(name, data, true)
                                    .then(function (_a) {
                                    var file = _a.file;
                                    return file.getItem();
                                })
                                    .then(function (item) { return item.update(Videojson); })
                                    .then(function (result) {
                                    $body.removeClass("loading");
                                    window.history.back();
                                });
                            },
                            error: function (data) {
                                console.log(data);
                            },
                        });
                    }
                }
            });
        }
    };
    AddListItemWebPart.prototype.MediaImageUpload = function () {
        var $body = $("body");
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split("%20").join(' ');
        var isAllfield = true;
        var file1 = $('#cropped-img').attr('src').split("base64,");
        var siteUrl = this.context.pageContext.site.absoluteUrl;
        if ($('#cropped-img')[0].src == siteUrl + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg') {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Select the Image");
            isAllfield = false;
        }
        else if (!$('#txtTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Title");
            isAllfield = false;
        }
        else if ($('#canvasdisplay').css('display') == 'block') {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Save Cropped Image");
            isAllfield = false;
        }
        var blob = base64ToArrayBuffer(file1[1]);
        var files = document.getElementById("inputImage");
        var file = files.files[0];
        var uniquename = Math.random().toString(36).substr(2, 9) + ".png";
        var myobjQl = {
            Title: $("#txtTitle").val().trim(),
            Image: {
                "__metadata": {
                    "type": "SP.FieldUrlValue"
                },
                Url: this.context.pageContext.web.absoluteUrl + "/" + strLocalStorage + "/" + uniquename
            },
        };
        if (isAllfield) {
            $body.addClass("loading");
            pnp.sp.web.getFolderByServerRelativeUrl(strLocalStorage).files.add(uniquename, file, true).then(function (result) {
                result.file.listItemAllFields.get().then(function (listItemAllFields) {
                    pnp.sp.web.lists.getByTitle(strLocalStorage).items.getById(listItemAllFields.Id).update(myobjQl).then(function (result) {
                        $('.addbutton').prop('disabled', true);
                        window.history.back();
                        $body.removeClass("loading");
                    });
                });
            });
        }
    };
    AddListItemWebPart.prototype.MediaVideoUpload = function () {
        var $body = $("body");
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split("%20").join(' ');
        var files = document.getElementById("uploadVideoFileType");
        var file = files.files[0];
        var filename = $("#uploadVideoFileType").val().split(String.fromCharCode(92));
        $("#browsedVideofile").val(filename[filename.length - 1]);
        var isAllfield = true;
        var radioValue = $("input[name='selectionVideoType']:checked").val();
        if (radioValue == "Upload") {
            if (!$('#txtMediaTitle').val().trim()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please enter the Title");
                isAllfield = false;
            }
            else if (!$('#uploadVideoFileType').val().trim()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Select the video File");
                isAllfield = false;
            }
        }
        var uniquename = Math.random().toString(36).substr(2, 9) + ".mp4";
        var siteUrl = this.context.pageContext.web.absoluteUrl;
        if (isAllfield) {
            $body.addClass("loading");
            pnp.sp.web.getFolderByServerRelativeUrl("Media Gallery").files.add(uniquename, file, true)
                .then(function (result) {
                var videoCols = {
                    Title: $("#txtMediaTitle").val().trim(),
                    Image: {
                        "__metadata": {
                            "type": "SP.FieldUrlValue"
                        },
                        Url: siteUrl + "/" + strLocalStorage + "/" + uniquename
                    },
                    MediaFileType: "Video"
                };
                result.file.listItemAllFields.get().then(function (listItemAllFields) {
                    pnp.sp.web.lists.getByTitle(strLocalStorage).items.getById(listItemAllFields.Id).update(videoCols).then(function (result) {
                        $body.removeClass("loading");
                        $('.addbutton').prop('disabled', true);
                        window.history.back();
                    });
                });
            });
        }
    };
    AddListItemWebPart.prototype.MediaVideoStreams = function () {
        var streamValidationForUrl = "https://web.microsoftstream.com";
        var regexp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        var siteUrl = this.context.pageContext.site.absoluteUrl;
        var $body = $("body");
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split("%20").join(' ');
        var isAllfield = true;
        var files = document.getElementById("inputImage");
        var file = files.files[0];
        var uniquename = Math.random().toString(36).substr(2, 9) + ".mp4";
        if (!$('#txtMediaTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please enter the Title");
            isAllfield = false;
        }
        else if (!$('#streamURLtext').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter the URL");
            isAllfield = false;
        }
        else if (!regexp.test($('#streamURLtext').val().trim())) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter valid URL");
            isAllfield = false;
        }
        else if (($('#streamURLtext').val().indexOf(streamValidationForUrl) == -1)) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Only Microsoft Streams URL Allowed..");
            isAllfield = false;
        }
        if (isAllfield) {
            $body.addClass("loading");
            pnp.sp.web.getFolderByServerRelativeUrl("Media Gallery").files.add(uniquename, file, true)
                .then(function (result) {
                var videoCols = {
                    Title: $("#txtMediaTitle").val().trim(),
                    Image: {
                        "__metadata": {
                            "type": "SP.FieldUrlValue"
                        },
                        Url: siteUrl + "/_catalogs/masterpage/Bloom/images/microsoft-stream.png"
                    },
                    MediaFileType: "Streams",
                    LinkURL: {
                        "__metadata": {
                            "type": "SP.FieldUrlValue"
                        },
                        Url: $("#streamURLtext").val()
                    }
                };
                result.file.listItemAllFields.get().then(function (listItemAllFields) {
                    pnp.sp.web.lists.getByTitle(strLocalStorage).items.getById(listItemAllFields.Id).update(videoCols).then(function (result) {
                        $body.removeClass("loading");
                        $('.addbutton').prop('disabled', true);
                        window.history.back();
                    });
                });
            });
        }
    };
    // VIDEO TYPE VALIDATION
    AddListItemWebPart.prototype.validateVideoFileType = function () {
        var fileName = $("#uploadVideoFileType").val();
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "mp4" || extFile == "x-m4v" || extFile == "m4a" || extFile == "f4v" || extFile == "m4b" || extFile == "mov" || extFile == "f4b" || extFile == "flv") {
            var filename = $("#uploadVideoFileType").val().split(String.fromCharCode(92));
            $("#browsedfileName").val(filename[filename.length - 1]);
            $(this).parent('.custom-upload').find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
        }
        else {
            $("#uploadVideoFileType").val(null);
            $("#browsedfileName").val('');
            $('#uploadFileNameText').val('');
        }
        var filename = $("#uploadVideoFileType").val().split(String.fromCharCode(92));
        $("#browsedVideofile").val(filename[filename.length - 1]);
    };
    // IMAGE TYPE VALIDATION
    AddListItemWebPart.prototype.validateImageFileType = function () {
        var fileName = $("#uploadImageFile").val();
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif" || extFile == "bmp" || extFile == "tiff") {
            var filename = $("#uploadImageFile").val().split(String.fromCharCode(92));
            $("#browsedfileName").val(filename[filename.length - 1]);
            //TO DO
        }
        else {
            $("#uploadImageFile").val(null);
            $("#browsedfileName").val('');
            $('#uploadFileNameText').val('');
        }
    };
    // PREVIOUS PAGE
    AddListItemWebPart.prototype.pageBack = function () { window.history.back(); };
    Object.defineProperty(AddListItemWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AddListItemWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return AddListItemWebPart;
}(BaseClientSideWebPart));
export default AddListItemWebPart;
//# sourceMappingURL=AddListItemWebPart.js.map