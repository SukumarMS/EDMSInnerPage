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
import * as strings from 'ListItemsViewWebPartStrings';
import { readItems, updateItem, formatDate, checkUserinGroup, GetQueryStringParams, batchDelete } from '../commonJS';
import 'jquery';
require('jplist-core');
require('jplist-pagination');
require('../../ExternalRef/js/jplist-core.js');
require('../../ExternalRef/js/jplist-pagination.js');
import pnp from 'sp-pnp-js';
import { Web } from 'sp-pnp-js';
var ListItemsViewWebPart = /** @class */ (function (_super) {
    __extends(ListItemsViewWebPart, _super);
    function ListItemsViewWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userflag = false;
        return _this;
    }
    ListItemsViewWebPart.prototype.render = function () {
        var _this = this;
        var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
        // Checking user details in group
        checkUserinGroup(strLocalStorage, this.context.pageContext.user.email, function (result) {
            if (result == 1) {
                _this.userflag = true;
                _this.viewlistitemdesign();
            }
            else {
                alertify.alert('Access Denied', 'Sorry You dont have access to this page', function () {
                    history.go(-1);
                }).set('closable', false);
            }
        });
    };
    ListItemsViewWebPart.prototype.viewlistitemdesign = function () {
        var siteURL = this.context.pageContext.web.absoluteUrl;
        var siteweburl = this.context.pageContext.site.absoluteUrl;
        var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
        var strLinktype = GetQueryStringParams("LinkType");
        this.domElement.innerHTML =
            "<div class='breadcrumb'>" +
                "<ol>" +
                "<li><a href='" + siteURL + "/Pages/Home.aspx' title='Home'>Home</a></li>" +
                "<li><span id='breadcrumb-name'></span></li>" +
                "</ol>" +
                "</div>" +
                "<div class='title-section'>" +
                "<div class='button-field'>" +
                "<a class='add-class pointer'  title='Add New'><i class='icon-add add-class'></i>Add New</a>" +
                "<a class='delete-icon pointer' title='Delete' id='deleteitems'><img src='" + siteweburl + "/_catalogs/masterpage/BloomHomepage/images/close-icon.png'>Delete</a>" +
                "</div>" +
                "<h2 id='ComponentName'></h2>" +
                "</div>" +
                "<div class='content-area'>" +
                "<div class='list-tabcont'>" +
                "<div class='list-tabcontsec'>" +
                "</div>" +
                "<div class='list-tabcontsec'>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='modal'><!-- Place at bottom of page --></div>";
        // localStorage.getItem("ComponentName");
        document.title = strLocalStorage + '-View';
        this.ViewListItems(GetQueryStringParams("CName").replace("%20", " "), strLinktype);
        if (this.userflag == false) {
            $('.button-field').hide();
        }
        else {
            $('.button-field').show();
        }
    };
    ListItemsViewWebPart.prototype.ViewListItems = function (strLocalStorage, strLinktype) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var $body, count, objResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $body = $('body');
                        if (strLocalStorage == "ProjectQuickLinks") {
                            document.getElementById("ComponentName").innerHTML = strLinktype;
                            document.getElementById("breadcrumb-name").innerHTML = strLinktype;
                        }
                        else {
                            document.getElementById("ComponentName").innerHTML = strLocalStorage;
                            document.getElementById("breadcrumb-name").innerHTML = strLocalStorage;
                        }
                        count = 50;
                        if (!(this.userflag == false)) return [3 /*break*/, 17];
                        if (!(strLocalStorage == "Holiday")) return [3 /*break*/, 2];
                        return [4 /*yield*/, readItems(strLocalStorage, ["ID", "Title", "Modified", "EventDate", "EndEventDate", "Display"], count, "Modified", "Display", 1)];
                    case 1:
                        objResults = _a.sent();
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 2:
                        if (!(strLocalStorage == "Announcements")) return [3 /*break*/, 4];
                        return [4 /*yield*/, readItems(strLocalStorage, ["ID", "Title", "Expires", "Modified", "Image", "Explanation", "Expires", "Display", "ViewedUsers"], count, "Modified", "Display", 1)];
                    case 3:
                        objResults = _a.sent();
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 4:
                        if (!(strLocalStorage == "Banners")) return [3 /*break*/, 6];
                        return [4 /*yield*/, readItems(strLocalStorage, ["ID", "Title", "Modified", "Image", "Display"], count, "Modified", "Display", 1)];
                    case 5:
                        objResults = _a.sent();
                        this.renderhtml(objResults, strLocalStorage);
                        return [3 /*break*/, 16];
                    case 6:
                        if (!(strLocalStorage == "Quick Links")) return [3 /*break*/, 7];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "LinkURL", "Display"], count, "Modified", "Display", 1);
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 7:
                        if (!(strLocalStorage == "Quick Launch")) return [3 /*break*/, 8];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "LinkURL", "Display"], count, "Modified", "Display", 1);
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 8:
                        if (!(strLocalStorage == "News")) return [3 /*break*/, 9];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Date", "Modified", "Image", "Display", "Explanation"], count, "Modified", "Display", 1);
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 9:
                        if (!(strLocalStorage == "Employee Corner")) return [3 /*break*/, 10];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "DocumentFile", "File_x0020_Type"], count, "Modified", "Display", 1);
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 10:
                        if (!(strLocalStorage == "Events")) return [3 /*break*/, 11];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "Explanation", "HyperLink", "StartDate", "EndDate"], count, "Modified", "Display", 1);
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 11:
                        if (!(strLocalStorage == "Polls")) return [3 /*break*/, 12];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "Question", "Options"], count, "Modified", "Display", 1);
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 12:
                        if (!(strLocalStorage == "Corporate Discount")) return [3 /*break*/, 13];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "SiteLink"], count, "Modified", "Display", 1);
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 16];
                    case 13:
                        if (!(strLocalStorage == "Media Gallery")) return [3 /*break*/, 15];
                        return [4 /*yield*/, readItems(strLocalStorage, ["MediaFileType", "ID", "Title", "Modified", "Display", "LinkURL", "Image"], count, "Modified")];
                    case 14:
                        objResults = _a.sent();
                        this.renderhtml(objResults, strLocalStorage);
                        return [3 /*break*/, 16];
                    case 15:
                        if (strLocalStorage == "ProjectQuickLinks") {
                            objResults = readItems(strLocalStorage, ["Title", "LinkURL", "LinkType", "Display"], count, "Modified", "LinkType", strLinktype);
                            objResults.then(function (items) {
                                if (strLinktype == "Documents") {
                                    _this.CheckDocuments(items);
                                }
                                else if (strLinktype == "Projects") {
                                    _this.Checksubsite(items);
                                }
                            });
                        }
                        _a.label = 16;
                    case 16: return [3 /*break*/, 30];
                    case 17:
                        if (!(strLocalStorage == "Holiday")) return [3 /*break*/, 18];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "EventDate", "EndEventDate", "Display"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 18:
                        if (!(strLocalStorage == "Announcements")) return [3 /*break*/, 19];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Expires", "Modified", "Image", "Explanation", "Expires", "Display"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 19:
                        if (!(strLocalStorage == "Banners")) return [3 /*break*/, 20];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Image", "Display"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 20:
                        if (!(strLocalStorage == "Quick Links")) return [3 /*break*/, 21];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "LinkURL"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 21:
                        if (!(strLocalStorage == "Quick Launch")) return [3 /*break*/, 22];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "LinkURL"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 22:
                        if (!(strLocalStorage == "News")) return [3 /*break*/, 23];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Date", "Modified", "Display", "Image", "Explanation"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 23:
                        if (!(strLocalStorage == "Employee Corner")) return [3 /*break*/, 24];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "DocumentFile", "File_x0020_Type"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 24:
                        if (!(strLocalStorage == "Events")) return [3 /*break*/, 25];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "Explanation", "HyperLink", "StartDate", "EndDate"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 25:
                        if (!(strLocalStorage == "Polls")) return [3 /*break*/, 26];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "Question", "Options"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 26:
                        if (!(strLocalStorage == "Corporate Discount")) return [3 /*break*/, 27];
                        objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "SiteLink"], count, "Modified");
                        objResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                        return [3 /*break*/, 30];
                    case 27:
                        if (!(strLocalStorage == "Media Gallery")) return [3 /*break*/, 29];
                        return [4 /*yield*/, readItems(strLocalStorage, ["ID", "Title", "Modified", "Display", "LinkURL", "Image", "MediaFileType"], count, "Modified")];
                    case 28:
                        objResults = _a.sent();
                        this.renderhtml(objResults, strLocalStorage);
                        return [3 /*break*/, 30];
                    case 29:
                        if (strLocalStorage == "ProjectQuickLinks") {
                            objResults = readItems(strLocalStorage, ["Title", "LinkURL", "LinkType", "Display"], count, "Modified", "LinkType", strLinktype);
                            objResults.then(function (items) {
                                if (strLinktype == "Documents") {
                                    _this.CheckDocuments(items);
                                }
                                else if (strLinktype == "Projects") {
                                    _this.Checksubsite(items);
                                }
                            });
                        }
                        _a.label = 30;
                    case 30: return [2 /*return*/];
                }
            });
        });
    };
    ListItemsViewWebPart.prototype.renderhtml = function (objResults, strLocalStorage) {
        var _this = this;
        var renderhtml = "<div id='pagination-list' class='list-section jplist'><ul class='list'>";
        var checkboxstatus = "";
        var strcheckboxstatus = "Not Displayed";
        //var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
        var siteURL = this.context.pageContext.web.absoluteUrl;
        if (objResults.length > 0) {
            objResults.sort(function (a, b) {
                return new Date(b.Modified).getTime() - new Date(a.Modified).getTime();
            });
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].Display == "1") {
                    checkboxstatus = "checked";
                    strcheckboxstatus = "Displayed";
                }
                else {
                    checkboxstatus = "";
                    strcheckboxstatus = "Not Displayed";
                }
                renderhtml += "<li class='list-item'>" +
                    "<div class='list-imgcont img-bind" + [i] + "'>" +
                    "<span class='displaydate" + [i] + "'></span>" +
                    "<h3 class='item-title" + [i] + "'></h3>" +
                    "<p class='add-description" + [i] + "'></p>" +
                    "<div class='switch'>" +
                    "<input type='checkbox' id='switch" + objResults[i].ID + "' class='switch-input' " + checkboxstatus + "/>" +
                    "<label for='switch" + objResults[i].ID + "' class='switch-label'>" + strcheckboxstatus + "</label>" +
                    "</div>" +
                    "<div class='list-icons'>" +
                    "<div class='icon-list2 viewitem' style='cursor: pointer;' id='viewitem" + objResults[i].ID + "'>" +
                    "<a  title='View' class='viewitem' ><i class='icon-eye viewitem'></i></a>" +
                    "</div>" +
                    "<div class='icon-list2 edititemuser edititem' style='cursor: pointer;' id='edititem" + objResults[i].ID + "'>" +
                    "<a  title='Edit' class='edititem' ><i class='icon-edit edititem'></i></a>" +
                    "</div>" +
                    "<div class='icon-list2 deleteitemuser likecounts" + objResults[i].ID + "'>" +
                    "<div class='check-box'>" +
                    "<input type='checkbox' name='' value='' class='delete-item' id='deleteitem" + objResults[i].ID + "'/>" +
                    "<label>Checkbox</label>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</li>";
            }
        }
        else {
            renderhtml += "<li class='list-item'>No items to display" +
                "</li>";
        }
        renderhtml += "</ul>";
        renderhtml += "<div class='jplist-panel box panel-top'>" +
            "<div class='jplist-pagination' data-control-type='pagination' data-control-name='paging' data-control-action='paging'></div>" +
            "<select class='jplist-select' data-control-type='items-per-page-select' data-control-name='paging' data-control-action='paging'>" +
            "<option data-number='5' data-default='true'> 5 </option>" +
            "<option data-number='10'> 10 </option>" +
            "<option data-number='15'> 15 </option>" +
            "</select>" +
            "</div>";
        $('.content-area').append(renderhtml);
        if (this.userflag == false) {
            $('.edititemuser').hide();
            $('.deleteitemuser').hide();
            $('.switch').hide();
        }
        else {
            $('.edititemuser').show();
            $('.deleteitemuser').show();
        }
        //console.log(strLocalStorage);
        if (strLocalStorage == 'Holiday') {
            for (var i = 0; i < objResults.length; i++) {
                $('.item-title' + i).append(objResults[i].Title);
                $('.displaydate' + i).append("<strong>" + formatDate(objResults[i].EventDate) + "</strong>");
                var eedate = "";
                if ((objResults[i].EndEventDate) != null) {
                    eedate = formatDate(objResults[i].EndEventDate);
                }
                var edate = "";
                if ((objResults[i].EventDate) != null) {
                    edate = formatDate(objResults[i].EventDate);
                }
                if (eedate == "" && edate == "") {
                    $('.add-description' + i).append("");
                }
                else if (eedate == "" && edate != "") {
                    $('.add-description' + i).append("Start date: <strong>" + edate + "</strong>");
                }
                else if (edate == "" && eedate != "") {
                    $('.add-description' + i).append("End date: <strong>" + edate + "</strong>");
                }
                else {
                    $('.add-description' + i).append("Start date: <strong>" + edate + "</strong> End date: <strong>" + eedate + "</strong>");
                }
            }
            $('.title-section').after("<div class='list-tab'><ul><li class='event-class'>Events</li><li class='active holiday-class'>Holidays</li></ul></div>");
        }
        else if (strLocalStorage == 'Announcements') {
            var defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/logo.png";
            var _loop_1 = function (i) {
                if (objResults[i].Image != null) {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + objResults[i].Image.Url + "' alt='' title=''/></div>");
                }
                else {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + defaultimage + "' alt='' title=''/></div>");
                }
                eedate = "";
                if ((objResults[i].Expires) != null) {
                    eedate = formatDate(objResults[i].Expires);
                }
                if (objResults[i].Explanation != null && objResults[i].Explanation.length > 160) {
                    objResults[i].Explanation = objResults[i].Explanation.substring(0, 160) + "...";
                }
                $('.add-description' + i).append(objResults[i].Explanation);
                $('.item-title' + i).append(objResults[i].Title);
                $('.displaydate' + i).append("<strong>" + eedate + "</strong>");
                if (this_1.userflag == false) {
                    $('.edititemuser').show();
                    $('.deleteitemuser').show();
                    $('#viewitem' + objResults[i].ID).empty();
                    $('#edititem' + objResults[i].ID).empty();
                    $('.likecounts' + objResults[i].ID).empty();
                    var ViewedUsers = 0;
                    if (objResults[i].ViewedUsers != null) {
                        if (objResults[i].ViewedUsers.split(',') != null)
                            ViewedUsers = objResults[i].ViewedUsers.split(',').length;
                        $('#viewitem' + objResults[i].ID).append("<a href='" + siteURL + "/Pages/Viewlistitem.aspx?CName=" + strLocalStorage + "&CID=" + objResults[i].ID + "' title='View' class='viewitem' ><i class='icon-eye viewitem'><span>" + ViewedUsers + "</span></i></a>");
                    }
                    else {
                        $('#viewitem' + objResults[i].ID).append("<a href='" + siteURL + "/Pages/Viewlistitem.aspx?CName=" + strLocalStorage + "&CID=" + objResults[i].ID + "' title='View' class='viewitem' ><i class='icon-eye viewitem'><span>" + ViewedUsers + "</span></i></a>");
                    }
                    objResults1 = readItems("AnnouncementComments", ["AnnouncementID"], 1000, "Modified", "AnnouncementID", objResults[i].ID);
                    objResults1.then(function (itemsCount) {
                        $('#edititem' + objResults[i].ID).append("<a href='" + siteURL + "/Pages/Viewlistitem.aspx?CName=" + strLocalStorage + "&CID=" + objResults[i].ID + "' title='View' class='viewitem' ><i class='icon-comments viewitem'><span>" + itemsCount.length + "</span></i></a>");
                    });
                    objResults2 = readItems("AnnouncementsLikes", ["AnnouncementID", "Liked"], 1000, "Modified", "AnnouncementID", objResults[i].ID);
                    objResults2.then(function (itemsCount2) {
                        var LikesCount = 0;
                        for (var j_1 = 0; j_1 < itemsCount2.length; j_1++) {
                            if (itemsCount2[j_1].Liked == true) {
                                LikesCount++;
                            }
                        }
                        $('.likecounts' + objResults[i].ID).append("<a href='" + siteURL + "/Pages/Viewlistitem.aspx?CName=" + strLocalStorage + "&CID=" + objResults[i].ID + "' title='Edit'><i class='icon-heart'><span>" + LikesCount + "</span></i></a>");
                    });
                }
            };
            var this_1 = this, eedate, objResults1, objResults2;
            for (var i = 0; i < objResults.length; i++) {
                _loop_1(i);
            }
        }
        else if (strLocalStorage == 'Banners') {
            var defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/logo.png";
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].Image != null) {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + objResults[i].Image.Url + "' alt='' title=''/></div>");
                }
                else {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + defaultimage + "' alt='' title=''/></div>");
                }
                if (objResults[i].BannerContent != null && objResults[i].BannerContent.length > 160) {
                    objResults[i].BannerContent = objResults[i].BannerContent.substring(0, 160) + "...";
                }
                $('.item-title' + i).append(objResults[i].Title);
            }
        }
        else if (strLocalStorage == 'Media Gallery') {
            var defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/logo.png";
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].Image != null) {
                    if (objResults[i].MediaFileType == "Image") {
                        $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + objResults[i].Image.Url + "' alt='' title=''/></div>");
                    }
                    else if (objResults[i].MediaFileType == "Video") {
                        $('.img-bind' + i).prepend("<div class='list-imgsec'>" +
                            "<video width='100%' height='100%' controls poster='" + objResults[i].Image.Url + "_jpg.jpg'>" +
                            "<source src='" + objResults[i].Image.Url + "' type='video/mp4'>Your browser does not support HTML5 video." +
                            "</video>" +
                            "</div>");
                    }
                    else if (objResults[i].MediaFileType == "Streams") {
                        $('.img-bind' + i).prepend("<div class='list-imgsec'><a href='" + objResults[i].LinkURL.Url + "'><img target='_blank' src='" + objResults[i].Image.Url + "' alt='' title='" + objResults[i].Title + "'/></a></div>");
                    }
                }
                else {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + defaultimage + "' alt='' title=''/></div>");
                }
                $('.item-title' + i).append(objResults[i].Title);
            }
        }
        else if (strLocalStorage == "Quick Links") {
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].LinkURL != null) {
                    $('.item-title' + i).append("<a href='" + objResults[i].LinkURL.Url + "' target='_blank'>" + objResults[i].Title + "</a>");
                }
                else {
                    $('.item-title' + i).append("<a href='#' target='_blank'>" + objResults[i].Title + "</a>");
                }
            }
        }
        else if (strLocalStorage == "Quick Launch") {
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].LinkURL != null) {
                    $('.item-title' + i).append("<a href='" + objResults[i].LinkURL.Url + "' target='_blank'>" + objResults[i].Title + "</a>");
                }
                else {
                    $('.item-title' + i).append("<a href='#' target='_blank'>" + objResults[i].Title + "</a>");
                }
            }
        }
        else if (strLocalStorage == "News") {
            var defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/logo.png";
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].Image != null) {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + objResults[i].Image.Url + "' alt='' title=''/></div>");
                }
                else {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + defaultimage + "' alt='' title=''/></div>");
                }
                if (objResults[i].Explanation != null && objResults[i].Explanation.length > 160) {
                    objResults[i].Explanation = objResults[i].Explanation.substring(0, 160) + "...";
                }
                $('.add-description' + i).append(objResults[i].Explanation);
                $('.item-title' + i).append(objResults[i].Title);
                var eedate = "";
                if ((objResults[i].Date) != null) {
                    eedate = formatDate(objResults[i].Date);
                }
                $('.displaydate' + i).append("<strong>" + eedate + "</strong>");
            }
        }
        else if (strLocalStorage == "Employee Corner") {
            var defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/logo.png";
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].DocumentFile != null) {
                    var filetype = objResults[i].DocumentFile.Url.split('.').pop();
                    if (filetype == "pdf") {
                        defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/pdf-view.png";
                    }
                    else if (filetype == "doc" || filetype == "docx") {
                        defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/doc-view.png";
                    }
                    else if (filetype == "ppt") {
                        defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/ppt-view.png";
                    }
                    else if (filetype == "xls" || filetype == "csv") {
                        defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/xls-view.png";
                    }
                    else if (filetype == "jpg" || filetype == "png" || filetype == "jpeg") {
                        defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/img-view.png";
                    }
                    $('.item-title' + i).append("<a href='" + objResults[i].DocumentFile.Url + "' target='_blank'>" + objResults[i].Title + "</a>");
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + defaultimage + "' alt='' title=''/></div>");
                }
            }
        }
        else if (strLocalStorage == 'Events') {
            for (var i = 0; i < objResults.length; i++) {
                $('.item-title' + i).append(objResults[i].Title);
                var eedate = "";
                if ((objResults[i].EndDate) != null) {
                    eedate = formatDate(objResults[i].EndDate);
                }
                var edate = "";
                if ((objResults[i].StartDate) != null) {
                    edate = formatDate(objResults[i].StartDate);
                }
                if (objResults[i].Explanation != null && objResults[i].Explanation.length > 160) {
                    objResults[i].Explanation = objResults[i].Explanation.substring(0, 160) + "...";
                }
                if (eedate == "" && edate == "") {
                    $('.add-description' + i).append(objResults[i].Explanation);
                }
                else if (eedate == "" && edate != "") {
                    $('.add-description' + i).append("Start date: <strong>" + edate + "</strong></br>" + objResults[i].Explanation);
                }
                else if (edate == "" && eedate != "") {
                    $('.add-description' + i).append("End date: <strong>" + edate + "</strong></br>" + objResults[i].Explanation);
                }
                else {
                    $('.add-description' + i).append("Start date: <strong>" + edate + "</strong> End date: <strong>" + eedate + "</strong></br>" + objResults[i].Explanation);
                }
                //$('.add-description' + i).append("Start date: <strong>" + edate + "</strong> End date: <strong>" + eedate + "</strong></br>" + objResults[i].Explanation);
                $('.displaydate' + i).append("<strong>" + formatDate(objResults[i].Modified) + "</strong>");
            }
            $('.title-section').after("<div class='list-tab'><ul><li class='active event-class'>Events</li><li class='holiday-class'>Holidays</li></ul></div>");
        }
        else if (strLocalStorage == 'Polls') {
            for (var i = 0; i < objResults.length; i++) {
                $('.item-title' + i).append(objResults[i].Question);
                if (objResults[i].Options != null && objResults[i].Options.length > 35) {
                    objResults[i].Options = objResults[i].Options.substring(0, 160) + "...";
                }
                //$('.add-description' + i).append(objResults[i].Options);
                if (objResults[i].Options.split(';') != null) {
                    //let arrOption = [];
                    var renderOptions = "";
                    var arrOption = objResults[i].Options.split(';');
                    arrOption = arrOption.filter(function (v) {
                        return /\S/.test(v);
                    });
                    for (var j = 0; j < arrOption.length; j++) {
                        renderOptions += arrOption[j] + "</br>";
                    }
                    $('.add-description' + i).append(renderOptions);
                }
                else {
                    $('.add-description' + i).append(objResults[i].Options);
                }
            }
        }
        else if (strLocalStorage == 'Corporate Discount') {
            var defaultimage = this.context.pageContext.site.absoluteUrl + "/_catalogs/masterpage/BloomHomepage/images/logo.png";
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].Image != null) {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + objResults[i].SiteLink.Url + "' alt='' title=''/></div>");
                }
                else {
                    $('.img-bind' + i).prepend("<div class='list-imgsec'><img src='" + defaultimage + "' alt='' title=''/></div>");
                }
                $('.item-title' + i).append(objResults[i].Title);
            }
        }
        else if (strLocalStorage == "ProjectQuickLinks") {
            for (var i = 0; i < objResults.length; i++) {
                if (objResults[i].LinkURL != null) {
                    $('.item-title' + i).append("<a href='" + objResults[i].LinkURL.Url + "' target='_blank'>" + objResults[i].Title + "</a>");
                }
                else {
                    $('.item-title' + i).append("<a href='#' target='_blank'>" + objResults[i].Title + "</a>");
                }
            }
            $('.list-icons,#deleteitems,.add-class').css('display', 'none');
        }
        var Viewevent = document.getElementsByClassName('viewitem');
        for (var i = 0; i < Viewevent.length; i++) {
            Viewevent[i].addEventListener("click", function (e) { return _this.viewitem(strLocalStorage); });
        }
        var Editevent = document.getElementsByClassName('edititem');
        for (var i = 0; i < Editevent.length; i++) {
            Editevent[i].addEventListener("click", function (e) { return _this.edititem(strLocalStorage); });
        }
        var eventfunction = document.getElementsByClassName('event-class');
        for (var i = 0; i < eventfunction.length; i++) {
            eventfunction[i].addEventListener("click", function (e) { return _this.eventfunction(); });
        }
        var holidayfunction = document.getElementsByClassName('holiday-class');
        for (var i = 0; i < holidayfunction.length; i++) {
            holidayfunction[i].addEventListener("click", function (e) { return _this.holidayfunction(); });
        }
        var addevent = document.getElementsByClassName('add-class');
        for (var i = 0; i < addevent.length; i++) {
            addevent[i].addEventListener("click", function (e) { return _this.addevent(strLocalStorage); });
        }
        //Adding event for delete button click 
        var deleteevent = document.getElementById("deleteitems");
        //for (let i = 0; i < addevent.length; i++) {
        deleteevent.addEventListener("click", function (e) { return _this.deleteitems(strLocalStorage); });
        //}
        $(document).on('change', '.switch-input', function (e) {
            var id = $(this).attr('id').replace('switch', '');
            var _thisid = $(this);
            if (strLocalStorage == 'Polls') {
                var strconfirm = "Do you want to display the selected poll?";
                alertify.confirm('Confirmation', strconfirm, function () {
                    $('.switch-input:checked').each(function () {
                        //var changedID=
                        var changeid = $(this).attr('id').replace('switch', '');
                        var myobj = {
                            Display: false
                        };
                        updateItem(strLocalStorage, changeid, myobj);
                        $('.switch-input').next().text("Not Displayed");
                        $(".switch-input").prop('checked', false);
                        var myobj1 = {
                            Display: true
                        };
                        updateItem(strLocalStorage, id, myobj1);
                        _thisid.next().text("Displayed");
                        _thisid.prop('checked', true);
                    });
                }, function () {
                    if (_thisid.prop("checked")) {
                        _thisid.next().text("Not Displayed");
                        _thisid.removeAttr('checked');
                    }
                    else {
                        _thisid.next().text("Displayed");
                        _thisid.prop('checked', true);
                    }
                }).set('closable', false);
            }
            else if (strLocalStorage == 'Employee Corner') {
                objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display"], 5000, "Modified", "Display", 1);
                objResults.then(function (items) {
                    if (items.length < 9 && _thisid.prop("checked")) {
                        var myobj = {
                            Display: true
                        };
                        _thisid.next().text("Displayed");
                        _thisid.prop('checked', true);
                        updateItem(strLocalStorage, id, myobj);
                    }
                    else if (items.length >= 9 && _thisid.prop("checked")) {
                        //console.log("More than the count");
                        var strconfirm = "Please select maximum number 9 to be visible";
                        alertify.confirm('Confirmation', strconfirm, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }).set('closable', false);
                    }
                    else {
                        var myobj = {
                            Display: false
                        };
                        _thisid.next().text("Not Displayed");
                        _thisid.removeAttr('checked');
                        updateItem(strLocalStorage, id, myobj);
                    }
                });
            }
            else if (strLocalStorage == 'Media Gallery') {
                objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display"], 5000, "Modified", "Display", 1);
                objResults.then(function (items) {
                    if (items.length < 3 && _thisid.prop("checked")) {
                        var myobj = {
                            Display: true
                        };
                        _thisid.next().text("Displayed");
                        _thisid.prop('checked', true);
                        updateItem(strLocalStorage, id, myobj);
                    }
                    else if (items.length >= 3 && _thisid.prop("checked")) {
                        //console.log("More than the count");
                        var strconfirm = "Please select maximum number 3 to be visible";
                        alertify.confirm('Confirmation', strconfirm, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }).set('closable', false);
                    }
                    else {
                        var myobj = {
                            Display: false
                        };
                        _thisid.next().text("Not Displayed");
                        _thisid.removeAttr('checked');
                        updateItem(strLocalStorage, id, myobj);
                    }
                });
            }
            else if (strLocalStorage == 'Banners') {
                objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display"], 5000, "Modified", "Display", 1);
                objResults.then(function (items) {
                    if (items.length < 3 && _thisid.prop("checked")) {
                        var myobj = {
                            Display: true
                        };
                        _thisid.next().text("Displayed");
                        _thisid.prop('checked', true);
                        updateItem(strLocalStorage, id, myobj);
                    }
                    else if (items.length >= 3 && _thisid.prop("checked")) {
                        //console.log("More than the count");
                        var strconfirm = "Please select maximum number 3 to be visible";
                        alertify.confirm('Confirmation', strconfirm, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }).set('closable', false);
                    }
                    else {
                        var myobj = {
                            Display: false
                        };
                        _thisid.next().text("Not Displayed");
                        _thisid.removeAttr('checked');
                        updateItem(strLocalStorage, id, myobj);
                    }
                });
            }
            else if (strLocalStorage == 'Quick Links') {
                objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display"], 5000, "Modified", "Display", 1);
                objResults.then(function (items) {
                    if (items.length < 18 && _thisid.prop("checked")) {
                        var myobj = {
                            Display: true
                        };
                        _thisid.next().text("Displayed");
                        _thisid.prop('checked', true);
                        updateItem(strLocalStorage, id, myobj);
                    }
                    else if (items.length >= 18 && _thisid.prop("checked")) {
                        //console.log("More than the count");
                        var strconfirm = "Please select maximum number 18 to be visible";
                        alertify.confirm('Confirmation', strconfirm, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }).set('closable', false);
                    }
                    else {
                        var myobj = {
                            Display: false
                        };
                        _thisid.next().text("Not Displayed");
                        _thisid.removeAttr('checked');
                        updateItem(strLocalStorage, id, myobj);
                    }
                });
            }
            else if (strLocalStorage == 'Quick Launch') {
                objResults = readItems(strLocalStorage, ["ID", "Title", "Modified", "Display"], 5000, "Modified", "Display", 1);
                objResults.then(function (items) {
                    if (items.length < 5 && _thisid.prop("checked")) {
                        var myobj = {
                            Display: true
                        };
                        _thisid.next().text("Displayed");
                        _thisid.prop('checked', true);
                        updateItem(strLocalStorage, id, myobj);
                    }
                    else if (items.length >= 5 && _thisid.prop("checked")) {
                        //console.log("More than the count");
                        var strconfirm = "Please select maximum number 5 to be visible";
                        alertify.confirm('Confirmation', strconfirm, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }, function () {
                            if (_thisid.prop("checked")) {
                                _thisid.next().text("Not Displayed");
                                _thisid.removeAttr('checked');
                                _thisid.prop('checked', false);
                            }
                            else {
                                _thisid.next().text("Displayed");
                                _thisid.prop('checked', true);
                            }
                        }).set('closable', false);
                    }
                    else {
                        var myobj = {
                            Display: false
                        };
                        _thisid.next().text("Not Displayed");
                        _thisid.removeAttr('checked');
                        updateItem(strLocalStorage, id, myobj);
                    }
                });
            }
            else {
                if (_thisid.prop("checked")) {
                    var myobj = {
                        Display: true
                    };
                    _thisid.next().text("Displayed");
                    _thisid.prop('checked', true);
                    updateItem(strLocalStorage, id, myobj);
                }
                else {
                    var myobj = {
                        Display: false
                    };
                    _thisid.next().text("Not Displayed");
                    _thisid.removeAttr('checked');
                    updateItem(strLocalStorage, id, myobj);
                }
            }
        });
        $('#pagination-list').jplist({
            itemsBox: '.list',
            itemPath: '.list-item',
            panelPath: '.jplist-panel'
        });
    };
    ListItemsViewWebPart.prototype.viewitem = function (strLocalStorage) {
        var siteURL = this.context.pageContext.web.absoluteUrl;
        $('div.viewitem').click(function () {
            var id = $(this).attr('id').replace('viewitem', '');
            window.location.href = "" + siteURL + "/Pages/Viewlistitem.aspx?CName=" + strLocalStorage + "&CID=" + $(this).attr('id').replace('viewitem', '');
        });
    };
    ListItemsViewWebPart.prototype.edititem = function (strLocalStorage) {
        var siteURL = this.context.pageContext.web.absoluteUrl;
        $('div.edititem').click(function () {
            var id = $(this).attr('id').replace('edititem', '');
            window.location.href = "" + siteURL + "/Pages/EditListItem.aspx?CName=" + strLocalStorage + "&CID=" + $(this).attr('id').replace('edititem', '');
        });
    };
    ListItemsViewWebPart.prototype.deleteitems = function (strLocalStorage) {
        // var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
        var $body = $('body');
        var deleteitemID = [];
        $('.delete-item:checked').each(function () {
            deleteitemID.push($(this).attr('id').replace('deleteitem', ''));
        });
        if (deleteitemID.length > 0) {
            var strconfirm = "Are you sure you want to delete selected item(s)?";
            var _that = this;
            alertify.confirm('Confirmation', strconfirm, function () {
                $body.addClass("loading");
                var selectedArray = deleteitemID;
                //for (var i = 0; i < selectedArray.length; i++) {
                batchDelete(strLocalStorage, selectedArray);
            }, function () { $body.removeClass("loading"); }).set('closable', false);
        }
        else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('Please select at least one item');
        }
    };
    ListItemsViewWebPart.prototype.eventfunction = function () {
        $(".content-area").empty();
        $(".list-tab").remove();
        this.ViewListItems("Events", "");
    };
    ListItemsViewWebPart.prototype.holidayfunction = function () {
        $(".content-area").empty();
        $(".list-tab").remove();
        this.ViewListItems("Holiday", "");
    };
    ListItemsViewWebPart.prototype.addevent = function (strLocalStorage) {
        var siteURL = this.context.pageContext.web.absoluteUrl;
        window.location.href = "" + siteURL + "/Pages/AddListItem.aspx?CName=" + strLocalStorage;
    };
    ListItemsViewWebPart.prototype.Checksubsite = function (ListItems) {
        var webUrl = this.context.pageContext.site.absoluteUrl + "/EDMS/Projects/";
        var subsiteList;
        var _this = this;
        var bind = 0;
        var Finalarray = [];
        var my_web = new Web(webUrl);
        // let batch = web.createBatch();
        subsiteList = my_web.webs.select().get();
        subsiteList.then(function (items) {
            for (var i = 0; i < ListItems.length; i++) {
                Finalarray.push(ListItems[i].Title);
            }
            for (var j = 0; j < items.length; j++) {
                if ($.inArray(items[j].Title, Finalarray) == -1) {
                    var itemObj = {
                        Title: items[j].Title,
                        LinkType: "Projects",
                        LinkURL: {
                            "__metadata": {
                                "type": "SP.FieldUrlValue"
                            },
                            Url: items[j].ServerRelativeUrl
                        },
                        Display: false
                    };
                    pnp.sp.web.lists.getByTitle("ProjectQuickLinks").items.add(itemObj).then(function (data) {
                        bind++;
                        if (items.length == bind) {
                            var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
                            var strLinktype = GetQueryStringParams("LinkType").replace("%20", " ");
                            var objtResults = readItems(strLocalStorage, ["Title", "ID", "LinkURL", "LinkType", "Display"], 50, "Modified", "LinkType", strLinktype);
                            objtResults.then(function (items) {
                                _this.renderhtml(items, strLocalStorage);
                            });
                        }
                    });
                }
                else {
                    bind++;
                    if (items.length == bind) {
                        var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
                        var strLinktype = GetQueryStringParams("LinkType").replace("%20", " ");
                        var objtResults = readItems(strLocalStorage, ["Title", "ID", "LinkURL", "LinkType", "Display"], 50, "Modified", "LinkType", strLinktype);
                        objtResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                    }
                }
            }
        });
    };
    ListItemsViewWebPart.prototype.CheckDocuments = function (DocumentItems) {
        var webUrl = this.context.pageContext.site.absoluteUrl + "/EDMS/Projects/";
        var subsiteList;
        var _this = this;
        var $body = $('body');
        var bind = 0;
        var Finalarray = [];
        var my_web = new Web(webUrl);
        //subsiteList =  my_web.webs.select().get();
        pnp.sp.site.getDocumentLibraries(this.context.pageContext.web.absoluteUrl).then(function (data) {
            for (var i = 0; i < DocumentItems.length; i++) {
                Finalarray.push(DocumentItems[i].Title);
            }
            for (var j = 0; j < data.length; j++) {
                if ($.inArray(data[j].Title, Finalarray) == -1) {
                    var itemObj = {
                        Title: data[j].Title,
                        LinkType: "Documents",
                        LinkURL: {
                            "__metadata": {
                                "type": "SP.FieldUrlValue"
                            },
                            Url: data[j].ServerRelativeUrl
                        },
                        Display: false
                    };
                    pnp.sp.web.lists.getByTitle("ProjectQuickLinks").items.add(itemObj).then(function (inserteddata) {
                        bind++;
                        if (data.length == bind) {
                            var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
                            var strLinktype = GetQueryStringParams("LinkType").replace("%20", " ");
                            var objtResults = readItems(strLocalStorage, ["Title", "ID", "LinkURL", "LinkType", "Display"], 50, "Modified", "LinkType", strLinktype);
                            $body.addClass("loading");
                            objtResults.then(function (items) {
                                _this.renderhtml(items, strLocalStorage);
                                $body.removeClass("loading");
                            });
                        }
                    });
                }
                else {
                    bind++;
                    if (data.length == bind) {
                        var strLocalStorage = GetQueryStringParams("CName").replace("%20", " ");
                        var strLinktype = GetQueryStringParams("LinkType").replace("%20", " ");
                        var objtResults = readItems(strLocalStorage, ["Title", "ID", "LinkURL", "LinkType", "Display"], 50, "Modified", "LinkType", strLinktype);
                        objtResults.then(function (items) {
                            _this.renderhtml(items, strLocalStorage);
                        });
                    }
                }
            }
        });
    };
    Object.defineProperty(ListItemsViewWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    ListItemsViewWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    return ListItemsViewWebPart;
}(BaseClientSideWebPart));
export default ListItemsViewWebPart;
//# sourceMappingURL=ListItemsViewWebPart.js.map