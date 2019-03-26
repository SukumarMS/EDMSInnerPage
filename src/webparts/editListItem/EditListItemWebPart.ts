import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './EditListItemWebPart.module.scss';
import * as strings from 'EditListItemWebPartStrings';
import * as Croppie from 'croppie';
import pnp from 'sp-pnp-js';
import { checkUserinGroup,additemsimage, updateItem, readItems, GetQueryStringParams, base64ToArrayBuffer } from '../commonJS';
import 'jquery';
import { SPComponentLoader } from '@microsoft/sp-loader';
import '../../ExternalRef/css/alertify.min.css';
import '../../ExternalRef/css/cropper.min.css';
import '../../ExternalRef/css/richtext.min.css';
require('bootstrap');
require('../../ExternalRef/js/alertify.min.js');
// require('../../ExternalRef/js/bootstrap-datepicker.min.js');
require('../../ExternalRef/js/cropper-main.js');
require('../../ExternalRef/js/cropper.min.js');
require('../../ExternalRef/js/jquery.richtext.js');

declare var $;
declare var alertify: any;
export interface IEditListItemWebPartProps {
  description: string;
}
var ItemID;
export default class EditListItemWebPart extends BaseClientSideWebPart<IEditListItemWebPartProps> {

  strcropstorage = "";
    imageValue = 0;
    imgsrc;
    siteURL = "";
    userflag: boolean = false;
    public render(): void {
        SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.3/croppie.css');
        var _this = this;
        var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
        
        //Checking user details in group
        
        checkUserinGroup(strLocalStorage, this.context.pageContext.user.email, function (result) {
          if (result == 1) {
            _this.userflag = true;
              _this.EditListItem();
          }
          else {
            alertify.alert('Access Denied', 'Sorry You dont have access to this page',function(){
                history.go(-1);
              }).set('closable', false);
          }
        })
      }

    public EditListItem() {
        var siteweburl = this.context.pageContext.web.absoluteUrl;
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split('%20').join(' ');
        var strLocalStorageBreadcrumb = GetQueryStringParams("CName");
        strLocalStorageBreadcrumb = strLocalStorageBreadcrumb.split("%20").join(' ');
        let sourceComponent = "";
        this.domElement.innerHTML =
            "<div class='breadcrumb'>" +
            "<ol>" +
            "<li><a href='" + siteweburl + "/Pages/Home.aspx' title='Home'>Home</a></li>" +
            "<li id='LIbreadTilte'><a class='pointer' id='breadTilte' title='" + strLocalStorage + "'>" + strLocalStorage + " List View</a></li>" +
            "<li><span>Edit " + strLocalStorage + "</span></li>" +
            "</ol>" +
            "</div>" +
            "<div class='title-section'>" +
            "<div class='button-field save-button'>" +
            "<a class='addbutton pointer' title='Update Item' id='UpdateItem'><i class='commonicon-save addbutton'></i>Save</a>" +
            "<a class='delete-icon close-icon pointer' class='closebutton'  title='Close' id='DelItem'><i class='commonicon-close closebutton'></i>Close</a>" +
            "</div>" +
            "<h2 id='ComponentName'>Announcements</h2>" +
            "</div>" +
            "<div class='form-section required'>" +
            "<div id='formImageSectionDiv' >" +
            "</div>" +
            "<div id='formVideoSectionDiv' >" +
            "</div>" +
            "</div>" +
            "<div class='modal-loader-cls'><!-- Place at bottom of page --></div>";

        // FOR MEDIA GALLERY - START

        $('#formImageSectionDiv').hide();
        $('#formVideoSectionDiv').hide();

        // FOR MEDIA GALLERY - END

        document.title = 'Edit ' + strLocalStorage;
        document.getElementById("ComponentName").innerHTML = GetQueryStringParams("CName").split("%20").join(" ");
        var strComponentId = GetQueryStringParams("CID");
        this.renderhtml(strComponentId);
        let Addevent = document.getElementById('UpdateItem');
        Addevent.addEventListener("click", (e: Event) => this.UpdateItem(strLocalStorage, strComponentId));
        if(strLocalStorage != "Announcements")
        {
            let breadTilte = document.getElementById('breadTilte');
            breadTilte.addEventListener("click", (e: Event) => this.pageBack());
        }
        let Closeevent = document.getElementById('DelItem');
        Closeevent.addEventListener("click", (e: Event) => this.pageBack());
        $('.content').richText();
        // $('#my-image,#use,#cancel').hide();
    }
    pageBack() {
        window.history.back();
    }
    bannersValidation() {
        if (!$('#inputImage').val()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Select Image");
            return false;
            // isAllfield = false;

        } else if (!$('#txtTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter the Title");
            return false;
            //isAllfield = false;
        }
        else if (!$('#txtrequiredDescription').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter the Description");
            return false;
            //isAllfield = false;
        }
        return true;
    }

    MediaGalleryValidation() {
        if (!$('#inputImage').val()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Select Image");
            return false;
            // isAllfield = false;

        } else if (!$('#txtTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter the Title");
            return false;
            //isAllfield = false;
        }
        return true;
    }


    quickLaunchValidation() {
        var regexp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

        if (!$('#txtTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Title");
            return false;
        } else if (!$('#txtHyper').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Link URL");
            return false;
        } else if (!regexp.test($('#txtHyper').val().trim())) {
            $('#txtHyper').focus();
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Link URL Correctly");
            return false;
        }
        return true
    }
    imagecropperChecking() {
        if ($('#canvasdisplay').css('display') == 'block') {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please save the cropper Image First");
            return false;
        }
        return true;
    }
    async UpdateItem(strLocalStorage, strComponentId) {

        if ($('.ajs-message').length > 0) {
            $('.ajs-message').remove();
        }
        var siteweburl = this.context.pageContext.site.absoluteUrl;
        var $body = $('body');
        var that = this;
        let strcrop = localStorage.getItem("crop");
        var count;

        let objResults;
        var $body = $("body");
        var isAllfield = true;

        if (strLocalStorage == "Quick Launch") {
            isAllfield = this.quickLaunchValidation();
            let myobjQl = {
                Title: $("#txtTitle").val(),
                LinkURL: {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    Url: $('#txtHyper').val()
                }
            }
            this.imagecropperChecking();
            if (isAllfield) {
                $body.addClass("loading");
                isAllfield = this.quickLaunchValidation();
                updateItem("Quick Launch", strComponentId, myobjQl)
                $body.removeClass("loading");
                that.pageBack();
                $body.removeClass("loading");
            }

        }

        if (strLocalStorage == "Banners") {
            var siteURL = this.context.pageContext.site.absoluteUrl
            var regexp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
            var files = <HTMLInputElement>document.getElementById("inputImage");
            let file = files.files[0];
            if ($('#cropped-img')[0].src && $('#cropped-img')[0].src == siteURL + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg') {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Select the Image");
                isAllfield = false;
            }
            else if (!$('#txtTitle').val().trim()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Enter the Title");
                isAllfield = false;

            } else if ($('#txtHyper').val() && !regexp.test($('#txtHyper').val().trim())) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please give a valid Link URL");
                isAllfield = false;
            }
            else if (!$('.richText-editor').text().trim()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Enter the Description");
                isAllfield = false;
            }
            if(files.files.length>0){
            var uniquename = Math.random().toString(36).substr(2, 9) + ".png";
            var file1 = $('#cropped-img').attr('src').split("base64,");
            var blob = base64ToArrayBuffer(file1[1]);
            // isAllfield=this.bannersValidation();
            this.imagecropperChecking();
            }
            if (isAllfield) {
                if (files.files.length == 0) {
                    let myobjBanners = {
                        Title: $("#txtTitle").val(),
                        BannerContent: $('.richText-editor').html(),
                        LinkURL: {
                            "__metadata": {
                                "type": "SP.FieldUrlValue"
                            },
                            Url: $('#txtHyper').val().trim(),
                        }
                    }
                    $body.addClass("loading");
                    updateItem("Banners", strComponentId, myobjBanners).then(function(e){
                        if (e.data) {
                            $body.removeClass("loading");
                            that.pageBack();
                        } else {
                            $body.removeClass("loading");
                            console.log(e);
                        }
                    });
                }
                else
                    var fileURL = window.location.origin;
                $body.addClass("loading");
                pnp.sp.web.getFolderByServerRelativeUrl("Images").files.add(uniquename, blob, true)
                    .then(function (result) {
                        pnp.sp.web.lists.getByTitle("Banners").items.getById(strComponentId).update({
                            ID: strComponentId,
                            Title: $("#txtTitle").val(),
                            BannerContent: $('.richText-editor').html(),
                            Image: {
                                "__metadata": {
                                    "type": "SP.FieldUrlValue"
                                },
                                Url: fileURL + result.data.ServerRelativeUrl
                            },
                            LinkURL: {
                                "__metadata": {
                                    "type": "SP.FieldUrlValue"
                                },
                                Url: $('#txtHyper').val().trim(),
                            }
                        }).then(r => {
                            $body.removeClass("loading");
                            window.history.back();
                       });
                    });
            }
        } if (strLocalStorage == "Media Gallery") {
             ItemID = GetQueryStringParams("CID");
            var C_objResults = await readItems("Media Gallery", ["MediaFileType"], 1, "Modified", "ID", ItemID);
            if (C_objResults[0].MediaFileType == "Image") {
                var files = <HTMLInputElement>document.getElementById("inputImage");
                let file = files.files[0];
                if (files.files.length == 0) {
                    if (!$('#txtTitle').val().trim()) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("Please Enter Title");
                        isAllfield = false;

                    } 
                    let saveData = {
                        Title: $("#txtTitle").val(),
                    }
                    this.imagecropperChecking();
                    if (isAllfield) {
                        $body.addClass("loading");
                        updateItem("Media Gallery", strComponentId, saveData).then(function (result) {
                            $body.removeClass("loading");
                            that.pageBack();
                        });
                    }
                } else {
                    if (!$('#inputImage').val()) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("Please Select Image");
                        isAllfield = false;

                    } else if (!$('#txtTitle').val().trim()) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("Please Enter Title");
                        isAllfield = false;

                    } 
                    var uniquename = Math.random().toString(36).substr(2, 9) + ".png";
                    var file1 = $('#cropped-img').attr('src').split("base64,");
                    var blob = base64ToArrayBuffer(file1[1]);
                    this.imagecropperChecking();
                    if (isAllfield) {
                        var fileURL = window.location.origin;
                        $body.addClass("loading");
                        pnp.sp.web.getFolderByServerRelativeUrl("Images").files.add(uniquename, blob, true)
                            .then(function (result) {
                                pnp.sp.web.lists.getByTitle("Media Gallery").items.getById(strComponentId).update({
                                    ID: strComponentId,
                                    Title: $("#txtTitle").val(),
                                    Image: {
                                        "__metadata": {
                                            "type": "SP.FieldUrlValue"
                                        },
                                        Url: fileURL + result.data.ServerRelativeUrl
                                    },
                                }).then(r => {
                                    $body.removeClass("loading");
                                    that.pageBack();
                                });
                            });
                    }
                }
            } else if (C_objResults[0].MediaFileType == "Streams") {
                if (!$('#txtMediaTitle').val().trim()) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Please Enter Title");
                    isAllfield = false;

                } else if (!$("#streamURLtext").val().trim()) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Please Enter URL");
                    isAllfield = false;
                }
                var C_ItemID = GetQueryStringParams("CID");
                // TYPE CASTING STRING TO NUM - START
                var U_ItemID = + C_ItemID;
                // TYPE CASTING STRING TO NUM - END
                if (isAllfield) {
                    let videoCols = {
                                Title: $("#txtMediaTitle").val().trim(),
                                LinkURL: {
                                    "__metadata": {
                                        "type": "SP.FieldUrlValue"
                                    },
                                    Url: $('#streamURLtext').val(),
                                },
                            }
                    $body.addClass("loading");
                    pnp.sp.web.lists.getByTitle(strLocalStorage).items.getById(U_ItemID).update(videoCols).then(function(result:any){
                        $body.removeClass("loading");
                        $('.addbutton').prop('disabled', true);
                        window.history.back();
                      });
                }
            } else if (C_objResults[0].MediaFileType == "Video") {
                if (!$('#txtMediaTitle').val().trim()) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Please Enter Title");
                    isAllfield = false;

                } 
                var C_ItemID = GetQueryStringParams("CID");
                // TYPE CASTING STRING TO NUM - START
                var U_ItemID = + C_ItemID;
                // TYPE CASTING STRING TO NUM - END
                if (isAllfield) {
                    let videoCols = {
                                Title: $("#txtMediaTitle").val().trim(),
                            }
                    $body.addClass("loading");
                    pnp.sp.web.lists.getByTitle(strLocalStorage).items.getById(U_ItemID).update(videoCols).then(function(result:any){
                        $body.removeClass("loading");
                        $('.addbutton').prop('disabled', true);
                        window.history.back();
                      });
                }
            }

        }

        if (strLocalStorage == "Announcements") {
            var listName = "Announcements";
            let itemObj = {
              Announcements: $('.richText-editor').html(),
            };
            if (!$('#txtTitle').val().trim()) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Enter Title");
                isAllfield = false;
    
            }
            if ($('.richText-editor').text().trim().length == 0) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Enter the Description");
                isAllfield = false;
            }
            if(isAllfield)
            {   
                $body.addClass("loading");
                updateItem(listName, ItemID, itemObj).then(result => {
                $body.removeClass("loading");
                window.location.href = this.context.pageContext.web.absoluteUrl + "/pages/Home.aspx";
            });
            }
          }
    }

    async renderhtml(strComponentId) {
        var renderhtml = "<ul>";
        var renderhtmlImage = "";
        var rendercrop = "";
        var rendertext = "";
        var renderdate = "";
        var renderDescription = "";
        var renderEventDate = "";
        var renderHyperlink = "";
        var renderHyperSitelink = "";
        var renderUploadfile = "";
        var renderCorpUploadfile = "";
        var renderRequiredDescription = "";
        var renderUploadOrganization = "";
        var renderSiteLink = "";
        var renderStartEndDate = "";
        var renderhtmlImageEvents = "";
        var renderhtmlCorporateImage = "";
        var renderQuestion = "";
        var renderAnswers = "";
        var renderDropdown = "";
        var renderNews = "";
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split('%20').join(' ');
        var renderfileuploadwithlogo;
        var strComponentMode = GetQueryStringParams("CMode");

        // FOR MEDIA GALLERY - START

        var renderOptionMediaGallery = "";
        var renderMediaCrop = "";
        var renderMediaTitle = "";
        var renderMediaSitelink = "";
        var renderUploadVideofile = "";
        var renderAnnouncementTitle = "";
        var renderAnnouncementDesc = "";
        var renderMediaRequiredDescription = "";
        var renderVideoimage="";

        renderOptionMediaGallery += "<div class='radio-btn appendOptionImage'>" +
            "<div class='col-md-12 form-group'>" +
            "<label>Choose Component</label>" +
            "<div class='radio col-md-6'>" +
            "<input id='radioImage' name='selectionradioMediaImage' type='radio' value='Image'>" +
            "<label for='radioImage' class='radio-label'>Image</label>" +
            "</div>" +
            "<div class='radio col-md-6'>" +
            "<input id='radioVideo' name='selectionradioMediaImage' type='radio' value='Video'>" +
            "<label for='radioVideo' class='radio-label'>Video</label>" +
            "</div>" +
            "</div>" +
            "</div>";

        renderMediaCrop += "<div class='form-imgsec'>" +
            "<div class='themelogo-upload'>" +
            "<label class='control-label'>Image</label>" +
            "<img id='cropped-img' src='" + this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg' />" +
            "<div class='image-upload'>" +
            "<div class='custom-upload'>" +
            "<input type='file' id='inputImage' name='file' accept='.jpg,.jpeg,.png,.gif,.bmp,.tiff' multiple='' class='file' />" +
            "<button class='btn btn-primary' type='button'><i class='icon-camera'></i></button>" +
            "</div>" +
            "<a href='#' title='Delete' id='image-delete'>" +
            "<i class='icon-delete'></i>" +
            "</a>" +
            "</div>" +
            // "<img id='my-image' src='#' />"+
            // "<div class='button-field save-button'>"+
            // "<button id='use' type='button'>Upload</button>"+
            // "<button id='cancel' type='button'>Cancel</button>"+ 
            // "</div>" +
            "</div>" +
            "</div>";

        renderMediaTitle += "<div class='input text'>" +
            "<label class='control-label'>Title</label>" +
            "<input class='form-control' type='text' value='' maxlength='30' id='txtMediaTitle' />" +
            "</div>";

        renderMediaSitelink += "<div id='mediaSiteLinkDiv' class='input text'>" +
            "<label>Link URL</label>" +
            "<input class='form-control' type='text' value='' id='streamURLtext' />" +
            "<label>Please provide URL </label>" +
            "</div>";


        renderMediaRequiredDescription += "<div id='rrdescription' class='input textarea'><label class='control-label'>Description</label><textarea class='form-control' id='txtrequiredDescription'></textarea></div>";

        renderUploadVideofile += "<div id='uploadVideoFile' class='form-imgsec'>" +
            "<div class='themelogo-upload' style='display: block;'>" +
            "<div class='custom-upload banner-upload'>" +
            "<label class='control-label'>Upload Video File</label>" +
            "<input type='file' id='uploadImageFile' name='file' accept='video/mp4,video/x-m4v,video/*' multiple='' class='file'>" +
            "<div class='input-group'>" +
            "<span class='input-group-btn input-group-sm'>" +
            "<button type='button' class='btn btn-fab btn-fab-mini'>Browse</button>" +
            "</span>" +
            "<input type='text' readonly='' class='form-control' placeholder='Upload Files'>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        renderVideoimage += '<div id="DivView-img" class="themelogo-upload1">' +
            '<label id="LblImage">Image</label>' +
            '<img id="View-img" src="" class="img-responsive">' +
            '</div>';
        // FOR MEDIA GALLERY - END


        renderhtmlImage += "<div class='form-imgsec'>" +
            "<div class='themelogo-upload'>" +
            "<label class='control-label'>Image</label>" +
            "<img class='crapImages' src=''/>" +
            "<div class='image-upload'>" +
            "<div class='custom-upload'>" +
            "<input type='file' id='inputImage' name='file' accept='.jpg,.jpeg,.png' multiple='' class='file' />" +
            "<button class='btn btn-primary' type='button'><i class='icon-camera'></i></button>" +
            "</div>" +
            "<a href='#'id='clearImage' title='Clear' id='image-delete'>delete<i class='icon-delete'></i></a>" +
            "</div>" +
            // "<img id='my-image' src='#' />"+
            // "<div class='button-field save-button'>"+
            // "<button id='use' type='button'>Upload</button>"+
            // "<button id='cancel' type='button'>Cancel</button>"+ 
            "</div>" +
            "</div>";

        rendercrop += "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12' id='canvasdisplay' style='display:none'>" +
            "<h4>Image Preview </h4>" +
            "<div class='btn-group-crop'>" +
            "<button type='button' class='btn btn-primary'id='btnCrop' ><i class='commonicon-save'></i>Save</button>" +
            "<button class='btn btn-primary crop-cancel' id='btnRestore' type='button'><i class='commonicon-close'></i>Cancel</button>" +

            "<canvas id='canvas'>" +
            "</canvas>" +
            "</div>" +
            "</div>";

        renderhtmlImageEvents += "<div class='form-imgsec'>" +
            "<div class='themelogo-upload'>" +
            "<label class='control-label'>Image</label>" +
            "<img id='cropped-img' class='crapImagesevent crop-imagedisplay' src=''/>" +
            "<div class='image-upload'>" +
            "<div class='custom-upload'>" +
            "<input type='file' id='inputImage' name='file' accept='.jpg,.jpeg,.png,.gif,.bmp,.tiff' multiple='' class='file' />" +
            "<button class='btn btn-primary' type='button'><i class='icon-camera'></i></button>" +
            "</div>" +
            "<a href='#' title='Delete' id='image-delete'>" +
            "<i class='icon-delete'></i>" +
            "</a>" +
            "</div>" +
            // "<img id='my-image' src='#' />"+
            // "<div class='button-field save-button'>"+
            // "<button id='use' type='button'>Upload</button>"+
            // "<button id='cancel' type='button'>Cancel</button>"+ 
            // "</div>" +
            "</div>" +
            "</div>";

        rendertext += "<div id='renderText' class='input text'>" +
            "<label class='control-label'>Title</label>" +
            "<input class='form-control' type='text' value='' id='txtTitle' /></div>";

        renderDescription += "<div class='input textarea'><label >Description</label><textarea class='form-control' id='txtDescription'></textarea></div>";

        renderRequiredDescription += "<div id='rrdescription' class='input textarea'><label class='control-label'>Description</label><textarea class='form-control' id='txtrequiredDescription'></textarea></div>";

        renderHyperlink += "<div class='input text'>" +
            "<label class='control-label'>Hyperlink</label>" +
            "<input class='form-control' type='text' value='' id='txtHyper' />" +
            "<span>Please enter the Hyperlink in the following format : https://www.bloomholding.com</span>" +
            "</div>";

        renderHyperSitelink += "<div class='input text'>" +
            "<label>Link URL</label>" +
            "<input class='form-control' type='text' value='' id='txtHyper' />" +
            "<label>Please given valid Announcements or Events URL</label>" +
            "</div>";

        renderUploadfile += "<div class='form-imgsec'>" +
            "<a id='filetype' href='' download><img id='fileimg' src=''></a>" +
            "<div class='themelogo-upload' style='display: block;'>" +
            "<div class='custom-upload banner-upload'>" +
            "<label class='control-label'>Document File</label>" +
            "<input type='file' id='uploadFile' name='file' accept='.doc,.docx,.xls,.ppt,.pdf,.jpg' multiple='' class='file'>" +
            "<div class='input-group'>" +
            "<span class='input-group-btn input-group-sm'>" +
            "<button type='button' class='btn btn-fab btn-fab-mini'>Browse</button>" +
            "</span>" +
            "<input type='text' class='form-control' placeholder='Upload Files'>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        renderUploadOrganization += "<div class='form-imgsec'>" +
            "<a id='filetype' href='' download><img id='fileimg' src=''></a>" +
            "<div class='themelogo-upload' style='display: block;'>" +
            "<div class='custom-upload banner-upload'>" +
            "<input type='file' id='inputImage' name='file' accept='.pdf,.doc,.docx' multiple='' class='file'>" +
            "<div class='input-group'>" +
            "<span class='input-group-btn input-group-sm'>" +
            "<button type='button' class='btn btn-fab btn-fab-mini'>Browse</button>" +
            "</span>" +
            "<input type='text' class='form-control' placeholder='Upload Files'>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        renderAnnouncementTitle += "<div class='input text'>" +
                                "<label class='control-label'>Title</label>" +
                                "<input class='form-control' type='text' value='' maxlength='30' id='txtTitle' disabled /></div>";
    

        renderAnnouncementDesc += "<div class='textarea input'>"+
                                "<label class='control-label'>Description</label>"+
                                "<textarea id='txtrequiredDescription' class='form-control content'></textarea>"+
                                "</div>";

        renderSiteLink += "<div id='siteLink' class='input text'>" +
            "<i class=''></i>" +
            "<label class='control-label'>Site Link</label>" +
            "<input class='form-control' type='text' value='' id='txtsitelink'/>" +
            "<span>Please enter the Site Link in the following format : https://www.bloomholding.com</span>" +
            "</div>";
        renderfileuploadwithlogo += "<div id='filewithLogo'></div>"

        let renderhtmlImageBanners = "";
        let requirednewrichTextEditor = "";

        renderhtmlImageBanners += "<div class='form-imgsec'>" +
        "<div class='themelogo-upload'>" +
        "<label class='control-label'>Image</label>" +
        "<img id='cropped-img' class='crapImagesevent crop-imagedisplay' src=''/>" +
        "<div class='image-upload'>" +
        "<div class='custom-upload'>" +
        "<input type='file' id='inputImage' name='file' accept='.jpg,.jpeg,.png,.gif,.bmp,.tiff' multiple='' class='file' />" +
        "<button class='btn btn-primary' type='button'><i class='icon-camera'></i></button>" +
        "</div>" +
        "<a title='Delete' id='image-delete'>" +
        "<i class='icon-delete'></i>" +
        "</a>" +
        "</div>" +
        // "<img id='my-image' src='#' />"+
        // "<div class='button-field save-button'>"+
        // "<button id='use' type='button'>Upload</button>"+
        // "<button id='cancel' type='button'>Cancel</button>"+ 
        // "</div>" +
        "</div>" +
        "</div>";

        requirednewrichTextEditor += "<div class='textarea input'>" +
        "<label class='control-label'>Description</label>" +
        "<textarea id='txtrequiredDescription' class='form-control content'></textarea>" +
        "</div>";

        this.getListItems(strComponentId);
        $('.appendsec').append(renderhtml);
        console.log(strLocalStorage);
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (strLocalStorage == 'Banners') {

            $('.form-section').append(renderhtmlImageBanners);
            $('.form-imgsec').after(rendercrop);
            $('#canvasdisplay').after(rendertext);
            $('.text').after(requirednewrichTextEditor);
            $('.textarea').after(renderHyperSitelink);
            this.ViewMode(strComponentMode);
        }
        else if (strLocalStorage == 'Quick Launch') {
            $('.form-section').append(rendertext);
            $('.text').after(renderHyperlink);
            this.ViewMode(strComponentMode);
        }
        // MEDIA GALLERY - START

        else if (strLocalStorage == 'Media Gallery') {
            $('#formVideoSectionDiv').append(renderMediaTitle + renderMediaSitelink);
            $('#formImageSectionDiv').append(renderhtmlImageEvents + rendercrop + rendertext);
            $('#formVideoSectionDiv').find('#rrdescription').remove();
            var C_ItemID = GetQueryStringParams("CID");
            var renderRequiredHtml = await readItems("Media Gallery", ["MediaFileType"], 1, "Modified", "ID", C_ItemID);
            if (renderRequiredHtml[0].MediaFileType == "Image") {
                $('#formImageSectionDiv').show()
            } else if (renderRequiredHtml[0].MediaFileType == "Video") {
                $('#formVideoSectionDiv').show();
                $('#mediaSiteLinkDiv').hide();
            } else if (renderRequiredHtml[0].MediaFileType == "Streams") {
                $('#formVideoSectionDiv').show();
            }
        }

        // MEDIA GALLERY - END

        else if(strLocalStorage == 'Announcements'){
            $('.form-section').append(renderAnnouncementTitle+renderAnnouncementDesc);
            $('#LIbreadTilte').remove();
          }


        $('.date-selector').on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

        if ($('#uploadFile').length > 0) {
            $(document).on('change', '#uploadFile', function () {
                var docname = $(this).val().split('.');
                docname = docname[docname.length - 1].toLowerCase();
                if ($.inArray(docname, ['doc', 'docx', 'xls', 'csv', 'ppt', 'pdf']) == -1) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Please Select Valid File Format");
                    $("#uploadFile").val("");
                } else {
                    $(this).parent('.custom-upload').find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
                }
            });
        }
        var _this = this;
        $('#image-delete').click(function () {
            let siteUrl = _this.context.pageContext.site.absoluteUrl;
            if ($('#cropped-img')[0].src == siteUrl + "/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg'") {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please Upload the Image File");
            }
            else if ($('#inputImage').length > 0) {
                $('#cropped-img').removeClass("crop-imagedisplay");
                $("#inputImage").val("");
                $('.image-upload').css('width', '103px');
                $("#cropped-img").attr('src', "'" + siteUrl + "/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg'");
                $("#inputImage.file").val('');
            }
            else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Please upload the Image File");
            }
        });
        if ($('#inputImage').length > 0) {
            var canvas = $("#canvas"),
                context = canvas.get(0).getContext("2d"),
                $result = $('#cropped-img');
            $('#inputImage').on('change', function () {
                var iscropflag = true;
                var docname = $(this).val().split('.');
                docname = docname[docname.length - 1].toLowerCase();
                if ($.inArray(docname, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff']) == -1) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Please Select Valid file Format");
                    $("#inputImage").val("");
                    iscropflag = false
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
                        } else {
                        }
                    } else {
                    }
                }
            });
            $('#btnCrop').click(function () {
                $result.empty();
                var croppedImageDataURL = canvas.cropper('getCroppedCanvas').toDataURL("image/png");
                $result.attr('class', 'crop-imagedisplay');
                $result.attr('src', croppedImageDataURL);
                $('#canvasdisplay').css('display', 'none');
                canvas.cropper('destroy');
            });

            $('#btnRestore').click(function () {
                var siteweburl = this.context.pageContext.site.absoluteUrl;
                canvas.cropper('reset');
                $result.empty();
                $result.attr('src', siteweburl + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg');
                $('#canvasdisplay').css('display', 'none');
                $('#inputImage').val("");
            });
        }

        // function readURL(input) {
        //     if (input.files && input.files[0]) {
        //       var reader = new FileReader();
        //       reader.onload = function(e:any) {
        //         $('#my-image').attr('src', e.target.result);
        //         var resize = new Croppie($('#my-image')[0], {
        //           viewport: { width: 100, height: 100 },
        //           boundary: { width: 300, height: 300 },
        //           showZoomer: false,
        //           enableResize: true,
        //           enableOrientation: true
        //         });
        //         $('#use').fadeIn();
        //         $('#cancel').fadeIn();
        //         $('#use').on('click', function() {
        //           resize.result({type:'base64'}).then(function(dataImg) {
        //             var data = [{ image: dataImg }, { name: 'myimgage.jpg' }];
        //             // use ajax to send data to php
        //             $('.cr-boundary').hide();
        //            // $('#inputImage').val("");
        //             console.log(dataImg);
        //             $('#cropped-img').attr('src', dataImg);
        //             $('#use,#cancel').hide();
        //           })
        //         })
      
        //         $('#cancel').on('click', function() {
        //         $('.croppie-container').hide();
        //         $('#use,#cancel').hide();
        //             //$('#cropped-img').attr('src', );
                 
        //         })
        //       }
        //       reader.readAsDataURL(input.files[0]);
        //     }
        //   }
          
        //   $("#inputImage").change(function() {
        //     readURL(this);
        //   });
    }

    public ViewMode(strComponentMode) {
        if (strComponentMode == 'ViewMode') {
            $('#UpdateItem').hide();
            $('.image-upload').hide();
            $('.form-section :input').prop("disabled", true);
        }
    }
    async getListItems(strComponentId) {
        var count = 1;
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split('%20').join(' ');
        let objResults;

        if (strLocalStorage == "Banners") {
            objResults = readItems("Banners", ["Title", "Modified", "BannerContent", "Display", "LinkURL", "Orders", "Image"], count, "Modified", "ID", strComponentId)
            objResults.then((items: any[]) => {
                $('.crapImagesevent').attr("src", items[0].Image.Url);
                $('#txtTitle').val(items[0].Title);
                $('.richText-editor').html(items[0].BannerContent)
                if (items[0].LinkURL == null) {
                    $('#txtHyper').val('');
                } else {
                    $('#txtHyper').val(items[0].LinkURL.Url)
                }
            })
        }
        if (strLocalStorage == "Media Gallery") {
            objResults = await readItems("Media Gallery", ["LinkURL", "Display", "MediaFileType", "Image", "Title"], count, "Modified", "ID", strComponentId);
            if (objResults[0].MediaFileType == "Image") {
                $('.crapImagesevent').attr("src", objResults[0].Image.Url);
                $('#txtTitle').val(objResults[0].Title);
            }
            if (objResults[0].MediaFileType == "Video") {
                $('#txtMediaTitle').val(objResults[0].Title);
            }
            if (objResults[0].MediaFileType == "Streams") {
                $('#txtMediaTitle').val(objResults[0].Title);
                $('#streamURLtext').val(objResults[0].LinkURL.Url)
            }
        } else if (strLocalStorage == "Quick Launch") {
            objResults = readItems("Quick Launch", ["Title", "Modified", "LinkURL", "Display"], count, "Modified", "ID", strComponentId)
            objResults.then((items: any[]) => {
                $('#txtTitle').val(items[0].Title);
                $('#txtHyper').val(items[0].LinkURL.Url)
            })
        }else if (strLocalStorage == "Announcements") {
            var listName = "Announcements";
            let columnArray = ["Announcements","ID","Title"];
            var Username = this.context.pageContext.user.displayName;
        
            objResults = readItems(listName, columnArray, 1, "Modified","ID",1);
            objResults.then((items: any[]) => {
            
              $('#txtrequiredDescription').val(items[0].Announcements);
              $('.richText-editor').html(items[0].Announcements)
              $('#txtTitle').val(items[0].Title);
              ItemID = items[0].ID;
            });
          }
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
