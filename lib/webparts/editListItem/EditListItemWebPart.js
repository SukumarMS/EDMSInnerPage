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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'EditListItemWebPartStrings';
import pnp from 'sp-pnp-js';
import { checkUserinGroup, updateItem, readItems, GetQueryStringParams, base64ToArrayBuffer } from '../commonJS';
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
var ItemID;
var EditListItemWebPart = /** @class */ (function (_super) {
    __extends(EditListItemWebPart, _super);
    function EditListItemWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.strcropstorage = "";
        _this.imageValue = 0;
        _this.siteURL = "";
        _this.userflag = false;
        return _this;
    }
    EditListItemWebPart.prototype.render = function () {
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
                alertify.alert('Access Denied', 'Sorry You dont have access to this page', function () {
                    history.go(-1);
                }).set('closable', false);
            }
        });
    };
    EditListItemWebPart.prototype.EditListItem = function () {
        var _this = this;
        var siteweburl = this.context.pageContext.web.absoluteUrl;
        var strLocalStorage = GetQueryStringParams("CName");
        strLocalStorage = strLocalStorage.split('%20').join(' ');
        var strLocalStorageBreadcrumb = GetQueryStringParams("CName");
        strLocalStorageBreadcrumb = strLocalStorageBreadcrumb.split("%20").join(' ');
        var sourceComponent = "";
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
        var Addevent = document.getElementById('UpdateItem');
        Addevent.addEventListener("click", function (e) { return _this.UpdateItem(strLocalStorage, strComponentId); });
        if (strLocalStorage != "Announcements") {
            var breadTilte = document.getElementById('breadTilte');
            breadTilte.addEventListener("click", function (e) { return _this.pageBack(); });
        }
        var Closeevent = document.getElementById('DelItem');
        Closeevent.addEventListener("click", function (e) { return _this.pageBack(); });
        $('.content').richText();
        // $('#my-image,#use,#cancel').hide();
    };
    EditListItemWebPart.prototype.pageBack = function () {
        window.history.back();
    };
    EditListItemWebPart.prototype.bannersValidation = function () {
        if (!$('#inputImage').val()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Select Image");
            return false;
            // isAllfield = false;
        }
        else if (!$('#txtTitle').val().trim()) {
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
    };
    EditListItemWebPart.prototype.MediaGalleryValidation = function () {
        if (!$('#inputImage').val()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Select Image");
            return false;
            // isAllfield = false;
        }
        else if (!$('#txtTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter the Title");
            return false;
            //isAllfield = false;
        }
        return true;
    };
    EditListItemWebPart.prototype.quickLaunchValidation = function () {
        var regexp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        if (!$('#txtTitle').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Title");
            return false;
        }
        else if (!$('#txtHyper').val().trim()) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Link URL");
            return false;
        }
        else if (!regexp.test($('#txtHyper').val().trim())) {
            $('#txtHyper').focus();
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Link URL Correctly");
            return false;
        }
        return true;
    };
    EditListItemWebPart.prototype.imagecropperChecking = function () {
        if ($('#canvasdisplay').css('display') == 'block') {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please save the cropper Image First");
            return false;
        }
        return true;
    };
    EditListItemWebPart.prototype.UpdateItem = function (strLocalStorage, strComponentId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var siteweburl, $body, that, strcrop, count, objResults, $body, isAllfield, myobjQl, siteURL, regexp, files, file, uniquename, file1, blob, myobjBanners, fileURL, C_objResults, files, file, saveData, uniquename, file1, blob, fileURL, C_ItemID, U_ItemID, videoCols, C_ItemID, U_ItemID, videoCols, listName, itemObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ($('.ajs-message').length > 0) {
                            $('.ajs-message').remove();
                        }
                        siteweburl = this.context.pageContext.site.absoluteUrl;
                        $body = $('body');
                        that = this;
                        strcrop = localStorage.getItem("crop");
                        $body = $("body");
                        isAllfield = true;
                        if (strLocalStorage == "Quick Launch") {
                            isAllfield = this.quickLaunchValidation();
                            myobjQl = {
                                Title: $("#txtTitle").val(),
                                LinkURL: {
                                    "__metadata": {
                                        "type": "SP.FieldUrlValue"
                                    },
                                    Url: $('#txtHyper').val()
                                }
                            };
                            this.imagecropperChecking();
                            if (isAllfield) {
                                $body.addClass("loading");
                                isAllfield = this.quickLaunchValidation();
                                updateItem("Quick Launch", strComponentId, myobjQl);
                                $body.removeClass("loading");
                                that.pageBack();
                                $body.removeClass("loading");
                            }
                        }
                        if (strLocalStorage == "Banners") {
                            siteURL = this.context.pageContext.site.absoluteUrl;
                            regexp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
                            files = document.getElementById("inputImage");
                            file = files.files[0];
                            if ($('#cropped-img')[0].src && $('#cropped-img')[0].src == siteURL + '/_catalogs/masterpage/BloomHomepage/images/prof-img.jpg') {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.error("Please Select the Image");
                                isAllfield = false;
                            }
                            else if (!$('#txtTitle').val().trim()) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.error("Please Enter the Title");
                                isAllfield = false;
                            }
                            else if ($('#txtHyper').val() && !regexp.test($('#txtHyper').val().trim())) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.error("Please give a valid Link URL");
                                isAllfield = false;
                            }
                            else if (!$('.richText-editor').text().trim()) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.error("Please Enter the Description");
                                isAllfield = false;
                            }
                            if (files.files.length > 0) {
                                uniquename = Math.random().toString(36).substr(2, 9) + ".png";
                                file1 = $('#cropped-img').attr('src').split("base64,");
                                blob = base64ToArrayBuffer(file1[1]);
                                // isAllfield=this.bannersValidation();
                                this.imagecropperChecking();
                            }
                            if (isAllfield) {
                                if (files.files.length == 0) {
                                    myobjBanners = {
                                        Title: $("#txtTitle").val(),
                                        BannerContent: $('.richText-editor').html(),
                                        LinkURL: {
                                            "__metadata": {
                                                "type": "SP.FieldUrlValue"
                                            },
                                            Url: $('#txtHyper').val().trim(),
                                        }
                                    };
                                    $body.addClass("loading");
                                    updateItem("Banners", strComponentId, myobjBanners).then(function (e) {
                                        if (e.data) {
                                            $body.removeClass("loading");
                                            that.pageBack();
                                        }
                                        else {
                                            $body.removeClass("loading");
                                            console.log(e);
                                        }
                                    });
                                }
                                else
                                    fileURL = window.location.origin;
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
                                    }).then(function (r) {
                                        $body.removeClass("loading");
                                        window.history.back();
                                    });
                                });
                            }
                        }
                        if (!(strLocalStorage == "Media Gallery")) return [3 /*break*/, 2];
                        ItemID = GetQueryStringParams("CID");
                        return [4 /*yield*/, readItems("Media Gallery", ["MediaFileType"], 1, "Modified", "ID", ItemID)];
                    case 1:
                        C_objResults = _a.sent();
                        if (C_objResults[0].MediaFileType == "Image") {
                            files = document.getElementById("inputImage");
                            file = files.files[0];
                            if (files.files.length == 0) {
                                if (!$('#txtTitle').val().trim()) {
                                    alertify.set('notifier', 'position', 'top-right');
                                    alertify.error("Please Enter Title");
                                    isAllfield = false;
                                }
                                saveData = {
                                    Title: $("#txtTitle").val(),
                                };
                                this.imagecropperChecking();
                                if (isAllfield) {
                                    $body.addClass("loading");
                                    updateItem("Media Gallery", strComponentId, saveData).then(function (result) {
                                        $body.removeClass("loading");
                                        that.pageBack();
                                    });
                                }
                            }
                            else {
                                if (!$('#inputImage').val()) {
                                    alertify.set('notifier', 'position', 'top-right');
                                    alertify.error("Please Select Image");
                                    isAllfield = false;
                                }
                                else if (!$('#txtTitle').val().trim()) {
                                    alertify.set('notifier', 'position', 'top-right');
                                    alertify.error("Please Enter Title");
                                    isAllfield = false;
                                }
                                uniquename = Math.random().toString(36).substr(2, 9) + ".png";
                                file1 = $('#cropped-img').attr('src').split("base64,");
                                blob = base64ToArrayBuffer(file1[1]);
                                this.imagecropperChecking();
                                if (isAllfield) {
                                    fileURL = window.location.origin;
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
                                        }).then(function (r) {
                                            $body.removeClass("loading");
                                            that.pageBack();
                                        });
                                    });
                                }
                            }
                        }
                        else if (C_objResults[0].MediaFileType == "Streams") {
                            if (!$('#txtMediaTitle').val().trim()) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.error("Please Enter Title");
                                isAllfield = false;
                            }
                            else if (!$("#streamURLtext").val().trim()) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.error("Please Enter URL");
                                isAllfield = false;
                            }
                            C_ItemID = GetQueryStringParams("CID");
                            U_ItemID = +C_ItemID;
                            // TYPE CASTING STRING TO NUM - END
                            if (isAllfield) {
                                videoCols = {
                                    Title: $("#txtMediaTitle").val().trim(),
                                    LinkURL: {
                                        "__metadata": {
                                            "type": "SP.FieldUrlValue"
                                        },
                                        Url: $('#streamURLtext').val(),
                                    },
                                };
                                $body.addClass("loading");
                                pnp.sp.web.lists.getByTitle(strLocalStorage).items.getById(U_ItemID).update(videoCols).then(function (result) {
                                    $body.removeClass("loading");
                                    $('.addbutton').prop('disabled', true);
                                    window.history.back();
                                });
                            }
                        }
                        else if (C_objResults[0].MediaFileType == "Video") {
                            if (!$('#txtMediaTitle').val().trim()) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.error("Please Enter Title");
                                isAllfield = false;
                            }
                            C_ItemID = GetQueryStringParams("CID");
                            U_ItemID = +C_ItemID;
                            // TYPE CASTING STRING TO NUM - END
                            if (isAllfield) {
                                videoCols = {
                                    Title: $("#txtMediaTitle").val().trim(),
                                };
                                $body.addClass("loading");
                                pnp.sp.web.lists.getByTitle(strLocalStorage).items.getById(U_ItemID).update(videoCols).then(function (result) {
                                    $body.removeClass("loading");
                                    $('.addbutton').prop('disabled', true);
                                    window.history.back();
                                });
                            }
                        }
                        _a.label = 2;
                    case 2:
                        if (strLocalStorage == "Announcements") {
                            listName = "Announcements";
                            itemObj = {
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
                            if (isAllfield) {
                                $body.addClass("loading");
                                updateItem(listName, ItemID, itemObj).then(function (result) {
                                    $body.removeClass("loading");
                                    window.location.href = _this.context.pageContext.web.absoluteUrl + "/pages/Home.aspx";
                                });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditListItemWebPart.prototype.renderhtml = function (strComponentId) {
        return __awaiter(this, void 0, void 0, function () {
            var renderhtml, renderhtmlImage, rendercrop, rendertext, renderdate, renderDescription, renderEventDate, renderHyperlink, renderHyperSitelink, renderUploadfile, renderCorpUploadfile, renderRequiredDescription, renderUploadOrganization, renderSiteLink, renderStartEndDate, renderhtmlImageEvents, renderhtmlCorporateImage, renderQuestion, renderAnswers, renderDropdown, renderNews, strLocalStorage, renderfileuploadwithlogo, strComponentMode, renderOptionMediaGallery, renderMediaCrop, renderMediaTitle, renderMediaSitelink, renderUploadVideofile, renderAnnouncementTitle, renderAnnouncementDesc, renderMediaRequiredDescription, renderVideoimage, renderhtmlImageBanners, requirednewrichTextEditor, date, today, C_ItemID, renderRequiredHtml, _this, canvas, context, $result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renderhtml = "<ul>";
                        renderhtmlImage = "";
                        rendercrop = "";
                        rendertext = "";
                        renderdate = "";
                        renderDescription = "";
                        renderEventDate = "";
                        renderHyperlink = "";
                        renderHyperSitelink = "";
                        renderUploadfile = "";
                        renderCorpUploadfile = "";
                        renderRequiredDescription = "";
                        renderUploadOrganization = "";
                        renderSiteLink = "";
                        renderStartEndDate = "";
                        renderhtmlImageEvents = "";
                        renderhtmlCorporateImage = "";
                        renderQuestion = "";
                        renderAnswers = "";
                        renderDropdown = "";
                        renderNews = "";
                        strLocalStorage = GetQueryStringParams("CName");
                        strLocalStorage = strLocalStorage.split('%20').join(' ');
                        strComponentMode = GetQueryStringParams("CMode");
                        renderOptionMediaGallery = "";
                        renderMediaCrop = "";
                        renderMediaTitle = "";
                        renderMediaSitelink = "";
                        renderUploadVideofile = "";
                        renderAnnouncementTitle = "";
                        renderAnnouncementDesc = "";
                        renderMediaRequiredDescription = "";
                        renderVideoimage = "";
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
                        renderAnnouncementDesc += "<div class='textarea input'>" +
                            "<label class='control-label'>Description</label>" +
                            "<textarea id='txtrequiredDescription' class='form-control content'></textarea>" +
                            "</div>";
                        renderSiteLink += "<div id='siteLink' class='input text'>" +
                            "<i class=''></i>" +
                            "<label class='control-label'>Site Link</label>" +
                            "<input class='form-control' type='text' value='' id='txtsitelink'/>" +
                            "<span>Please enter the Site Link in the following format : https://www.bloomholding.com</span>" +
                            "</div>";
                        renderfileuploadwithlogo += "<div id='filewithLogo'></div>";
                        renderhtmlImageBanners = "";
                        requirednewrichTextEditor = "";
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
                        date = new Date();
                        today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        if (!(strLocalStorage == 'Banners')) return [3 /*break*/, 1];
                        $('.form-section').append(renderhtmlImageBanners);
                        $('.form-imgsec').after(rendercrop);
                        $('#canvasdisplay').after(rendertext);
                        $('.text').after(requirednewrichTextEditor);
                        $('.textarea').after(renderHyperSitelink);
                        this.ViewMode(strComponentMode);
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(strLocalStorage == 'Quick Launch')) return [3 /*break*/, 2];
                        $('.form-section').append(rendertext);
                        $('.text').after(renderHyperlink);
                        this.ViewMode(strComponentMode);
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(strLocalStorage == 'Media Gallery')) return [3 /*break*/, 4];
                        $('#formVideoSectionDiv').append(renderMediaTitle + renderMediaSitelink);
                        $('#formImageSectionDiv').append(renderhtmlImageEvents + rendercrop + rendertext);
                        $('#formVideoSectionDiv').find('#rrdescription').remove();
                        C_ItemID = GetQueryStringParams("CID");
                        return [4 /*yield*/, readItems("Media Gallery", ["MediaFileType"], 1, "Modified", "ID", C_ItemID)];
                    case 3:
                        renderRequiredHtml = _a.sent();
                        if (renderRequiredHtml[0].MediaFileType == "Image") {
                            $('#formImageSectionDiv').show();
                        }
                        else if (renderRequiredHtml[0].MediaFileType == "Video") {
                            $('#formVideoSectionDiv').show();
                            $('#mediaSiteLinkDiv').hide();
                        }
                        else if (renderRequiredHtml[0].MediaFileType == "Streams") {
                            $('#formVideoSectionDiv').show();
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (strLocalStorage == 'Announcements') {
                            $('.form-section').append(renderAnnouncementTitle + renderAnnouncementDesc);
                            $('#LIbreadTilte').remove();
                        }
                        _a.label = 5;
                    case 5:
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
                                }
                                else {
                                    $(this).parent('.custom-upload').find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
                                }
                            });
                        }
                        _this = this;
                        $('#image-delete').click(function () {
                            var siteUrl = _this.context.pageContext.site.absoluteUrl;
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
                            canvas = $("#canvas"), context = canvas.get(0).getContext("2d"), $result = $('#cropped-img');
                            $('#inputImage').on('change', function () {
                                var iscropflag = true;
                                var docname = $(this).val().split('.');
                                docname = docname[docname.length - 1].toLowerCase();
                                if ($.inArray(docname, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff']) == -1) {
                                    alertify.set('notifier', 'position', 'top-right');
                                    alertify.error("Please Select Valid file Format");
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
                                        }
                                    }
                                    else {
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
                        return [2 /*return*/];
                }
            });
        });
    };
    EditListItemWebPart.prototype.ViewMode = function (strComponentMode) {
        if (strComponentMode == 'ViewMode') {
            $('#UpdateItem').hide();
            $('.image-upload').hide();
            $('.form-section :input').prop("disabled", true);
        }
    };
    EditListItemWebPart.prototype.getListItems = function (strComponentId) {
        return __awaiter(this, void 0, void 0, function () {
            var count, strLocalStorage, objResults, listName, columnArray, Username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 1;
                        strLocalStorage = GetQueryStringParams("CName");
                        strLocalStorage = strLocalStorage.split('%20').join(' ');
                        if (strLocalStorage == "Banners") {
                            objResults = readItems("Banners", ["Title", "Modified", "BannerContent", "Display", "LinkURL", "Orders", "Image"], count, "Modified", "ID", strComponentId);
                            objResults.then(function (items) {
                                $('.crapImagesevent').attr("src", items[0].Image.Url);
                                $('#txtTitle').val(items[0].Title);
                                $('.richText-editor').html(items[0].BannerContent);
                                if (items[0].LinkURL == null) {
                                    $('#txtHyper').val('');
                                }
                                else {
                                    $('#txtHyper').val(items[0].LinkURL.Url);
                                }
                            });
                        }
                        if (!(strLocalStorage == "Media Gallery")) return [3 /*break*/, 2];
                        return [4 /*yield*/, readItems("Media Gallery", ["LinkURL", "Display", "MediaFileType", "Image", "Title"], count, "Modified", "ID", strComponentId)];
                    case 1:
                        objResults = _a.sent();
                        if (objResults[0].MediaFileType == "Image") {
                            $('.crapImagesevent').attr("src", objResults[0].Image.Url);
                            $('#txtTitle').val(objResults[0].Title);
                        }
                        if (objResults[0].MediaFileType == "Video") {
                            $('#txtMediaTitle').val(objResults[0].Title);
                        }
                        if (objResults[0].MediaFileType == "Streams") {
                            $('#txtMediaTitle').val(objResults[0].Title);
                            $('#streamURLtext').val(objResults[0].LinkURL.Url);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (strLocalStorage == "Quick Launch") {
                            objResults = readItems("Quick Launch", ["Title", "Modified", "LinkURL", "Display"], count, "Modified", "ID", strComponentId);
                            objResults.then(function (items) {
                                $('#txtTitle').val(items[0].Title);
                                $('#txtHyper').val(items[0].LinkURL.Url);
                            });
                        }
                        else if (strLocalStorage == "Announcements") {
                            listName = "Announcements";
                            columnArray = ["Announcements", "ID", "Title"];
                            Username = this.context.pageContext.user.displayName;
                            objResults = readItems(listName, columnArray, 1, "Modified", "ID", 1);
                            objResults.then(function (items) {
                                $('#txtrequiredDescription').val(items[0].Announcements);
                                $('.richText-editor').html(items[0].Announcements);
                                $('#txtTitle').val(items[0].Title);
                                ItemID = items[0].ID;
                            });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(EditListItemWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    EditListItemWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    return EditListItemWebPart;
}(BaseClientSideWebPart));
export default EditListItemWebPart;
//# sourceMappingURL=EditListItemWebPart.js.map