export function APIUrlException(msg: any): any;
export namespace APIUrlException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export const AddFieldOptions: {
  "0": string;
  "1": string;
  "16": string;
  "2": string;
  "32": string;
  "4": string;
  "8": string;
  AddFieldCheckDisplayName: number;
  AddFieldInternalNameHint: number;
  AddFieldToDefaultView: number;
  AddToAllContentTypes: number;
  AddToDefaultContentType: number;
  AddToNoContentType: number;
  DefaultValue: number;
};
export function AlreadyInBatchException(msg: any): any;
export namespace AlreadyInBatchException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export class App {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  deploy(): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  install(): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  remove(): any;
  retract(): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  uninstall(): any;
  upgrade(): any;
  usingCaching(options: any): any;
}
export class AppCatalog {
  constructor(baseUrl: any, path: any);
  add(filename: any, content: any, shouldOverWrite: any): any;
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAppById(id: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export function AuthUrlException(data: any, msg: any): any;
export namespace AuthUrlException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export function BatchParseException(msg: any): any;
export namespace BatchParseException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export class BlobFileParser {
  constructor(...args: any[]);
  handleError(r: any, reject: any): any;
  parse(r: any): any;
  parseImpl(r: any, resolve: any): void;
  parseODataJSON(json: any): any;
}
export class BufferFileParser {
  constructor(...args: any[]);
  handleError(r: any, reject: any): any;
  parse(r: any): any;
  parseImpl(r: any, resolve: any): void;
  parseODataJSON(json: any): any;
}
export class CachingConfigurationProvider {
  constructor(wrappedProvider: any, cacheKey: any, cacheStore: any);
  wrappedProvider: any;
  store: any;
  cacheKey: any;
  getConfiguration(): any;
  getWrappedProvider(): any;
  selectPnPCache(): any;
}
export class CachingOptions {
  static storage: {
    local: any;
    session: any;
  };
  constructor(key: any);
  key: any;
  expiration: any;
  storeName: any;
}
export class CachingParserWrapper {
  constructor(_parser: any, _cacheOptions: any);
  parse(response: any): any;
}
export const CalendarType: {
  "1": string;
  "10": string;
  "11": string;
  "12": string;
  "14": string;
  "15": string;
  "16": string;
  "23": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  ChineseLunar: number;
  Gregorian: number;
  GregorianArabic: number;
  GregorianMEFrench: number;
  GregorianXLITEnglish: number;
  GregorianXLITFrench: number;
  Hebrew: number;
  Hijri: number;
  Japan: number;
  Korea: number;
  KoreaJapanLunar: number;
  SakaEra: number;
  Taiwan: number;
  Thai: number;
  UmAlQura: number;
};
export class CanvasColumn {
  constructor(section: any, order: any, factor: any, controls: any, dataVersion: any);
  addControl(control: any): any;
  fromHtml(html: any): void;
  getControl(index: any): any;
  getControlData(): any;
  toHtml(): any;
}
export class CanvasControl {
  constructor(controlType: any, dataVersion: any, column: any, order: any, id: any, controlData: any);
  controlType: any;
  dataVersion: any;
  column: any;
  order: any;
  id: any;
  controlData: any;
  fromHtml(html: any): void;
}
export class CanvasSection {
  constructor(page: any, order: any, columns: any);
  page: any;
  order: any;
  columns: any;
  addColumn(factor: any): any;
  addControl(control: any): any;
  toHtml(): any;
}
export const CheckinType: {
  "0": string;
  "1": string;
  "2": string;
  Major: number;
  Minor: number;
  Overwrite: number;
};
export const ChoiceFieldFormatType: {
  "0": string;
  "1": string;
  Dropdown: number;
  RadioButtons: number;
};
export class ClientSidePage {
  static create(library: any, pageName: any, title: any, pageLayoutType: any): any;
  static escapedStringToJson(escapedString: any): any;
  static fromFile(file: any): any;
  static jsonToEscapedString(json: any): any;
  constructor(file: any, sections: any, commentsDisabled: any);
  addBatchDependency(): any;
  addSection(): any;
  append(pathPart: any): void;
  approve(comment: any): any;
  as(factory: any): any;
  cancelUpload(uploadId: any): any;
  checkSharingPermissions(recipients: any): any;
  checkin(comment: any, checkinType: any): any;
  checkout(): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  continueUpload(uploadId: any, fileOffset: any, fragment: any): any;
  copyTo(url: any, shouldOverWrite: any): any;
  deleteCore(options: any, parser: any): any;
  deleteSharingLinkByKind(kind: any): any;
  deny(comment: any): any;
  disableComments(): any;
  enableComments(): any;
  expand(...args: any[]): any;
  findControl(predicate: any): any;
  findControlById(id: any): any;
  finishUpload(uploadId: any, fileOffset: any, fragment: any): any;
  fromHtml(html: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getBlob(): any;
  getBuffer(): any;
  getItem(...args: any[]): any;
  getJSON(): any;
  getLimitedWebPartManager(scope: any): any;
  getObjectSharingSettings(useSimplifiedRoles: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  getShareLink(kind: any, expiration: any): any;
  getShareable(): any;
  getSharingInformation(request: any): any;
  getText(): any;
  inBatch(batch: any): any;
  load(): any;
  mergeColumnToTree(column: any): void;
  mergeControlToTree(control: any): void;
  moveTo(url: any, moveOperations: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  publish(comment: any): any;
  recycle(): any;
  save(): any;
  select(...args: any[]): any;
  setCommentsOn(on: any): any;
  setContent(content: any): any;
  setContentChunked(file: any, progress: any, chunkSize: any): any;
  shareWith(loginNames: any, role: any, requireSignin: any, emailData: any): any;
  startUpload(uploadId: any, fragment: any): any;
  toHtml(): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  undoCheckout(): any;
  unpublish(comment: any): any;
  unshare(): any;
  unshareLink(kind: any, shareId: any): any;
  updateProperties(properties: any, eTag: any): any;
  usingCaching(options: any): any;
}
export class ClientSideText {
  constructor(text: any);
  fromHtml(html: any): void;
  getControlData(): any;
  toHtml(index: any): any;
}
export class ClientSideWebpart {
  static fromComponentDef(definition: any): any;
  constructor(title: any, description: any, propertieJson: any, webPartId: any, htmlProperties: any, serverProcessedContent: any);
  fromHtml(html: any): void;
  getControlData(): any;
  getProperties(): any;
  parseJsonProperties(props: any): any;
  renderHtmlProperties(): any;
  setProperties(properties: any): any;
  toHtml(index: any): any;
}
export class ConsoleListener {
  format(entry: any): any;
  log(entry: any): void;
}
export const ControlMode: {
  "1": string;
  "2": string;
  "3": string;
  Display: number;
  Edit: number;
  New: number;
};
export const DateTimeFieldFormatType: {
  "0": string;
  "1": string;
  DateOnly: number;
  DateTime: number;
};
export class Dictionary {
  constructor(keys: any, values: any);
  keys: any;
  values: any;
  add(key: any, o: any): void;
  clear(): void;
  count(): any;
  get(key: any): any;
  getKeys(): any;
  getValues(): any;
  merge(source: any): void;
  remove(key: any): any;
}
export class FetchClient {
  fetch(url: any, options: any): any;
}
export class Field {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  setShowInDisplayForm(show: any): any;
  setShowInEditForm(show: any): any;
  setShowInNewForm(show: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  update(properties: any, fieldType: any): any;
  usingCaching(options: any): any;
}
export const FieldTypes: {
  "0": string;
  "1": string;
  "10": string;
  "11": string;
  "12": string;
  "13": string;
  "14": string;
  "15": string;
  "16": string;
  "17": string;
  "18": string;
  "19": string;
  "2": string;
  "20": string;
  "21": string;
  "22": string;
  "23": string;
  "24": string;
  "25": string;
  "26": string;
  "27": string;
  "28": string;
  "29": string;
  "3": string;
  "30": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  AllDayEvent: number;
  Attachments: number;
  Boolean: number;
  Calculated: number;
  Choice: number;
  Computed: number;
  ContentTypeId: number;
  Counter: number;
  CrossProjectLink: number;
  Currency: number;
  DateTime: number;
  Error: number;
  File: number;
  GridChoice: number;
  Guid: number;
  Integer: number;
  Invalid: number;
  Lookup: number;
  ModStat: number;
  MultiChoice: number;
  Note: number;
  Number: number;
  PageSeparator: number;
  Recurrence: number;
  Text: number;
  ThreadIndex: number;
  Threading: number;
  URL: number;
  User: number;
  WorkflowEventType: number;
  WorkflowStatus: number;
};
export const FieldUserSelectionMode: {
  "0": string;
  "1": string;
  PeopleAndGroups: number;
  PeopleOnly: number;
};
export class Fields {
  constructor(baseUrl: any, path: any);
  add(title: any, fieldType: any, properties: any): any;
  addBatchDependency(): any;
  addBoolean(title: any, properties: any): any;
  addCalculated(title: any, formula: any, dateFormat: any, outputType: any, properties: any): any;
  addChoice(title: any, choices: any, format: any, fillIn: any, properties: any): any;
  addCurrency(title: any, minValue: any, maxValue: any, currencyLocalId: any, properties: any): any;
  addDateTime(title: any, displayFormat: any, calendarType: any, friendlyDisplayFormat: any, properties: any): any;
  addLookup(title: any, lookupListId: any, lookupFieldName: any, properties: any): any;
  addMultiChoice(title: any, choices: any, fillIn: any, properties: any): any;
  addMultilineText(title: any, numberOfLines: any, richText: any, restrictedMode: any, appendOnly: any, allowHyperlink: any, properties: any): any;
  addNumber(title: any, minValue: any, maxValue: any, properties: any): any;
  addText(title: any, maxLength: any, properties: any): any;
  addUrl(title: any, displayFormat: any, properties: any): any;
  addUser(title: any, selectionMode: any, properties: any): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  createFieldAsXml(xml: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getById(id: any): any;
  getByInternalNameOrTitle(name: any): any;
  getByTitle(title: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export class File {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  approve(comment: any): any;
  as(factory: any): any;
  cancelUpload(uploadId: any): any;
  checkSharingPermissions(recipients: any): any;
  checkin(comment: any, checkinType: any): any;
  checkout(): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  continueUpload(uploadId: any, fileOffset: any, fragment: any): any;
  copyTo(url: any, shouldOverWrite: any): any;
  deleteCore(options: any, parser: any): any;
  deleteSharingLinkByKind(kind: any): any;
  deny(comment: any): any;
  expand(...args: any[]): any;
  finishUpload(uploadId: any, fileOffset: any, fragment: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getBlob(): any;
  getBuffer(): any;
  getItem(...args: any[]): any;
  getJSON(): any;
  getLimitedWebPartManager(scope: any): any;
  getObjectSharingSettings(useSimplifiedRoles: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  getShareLink(kind: any, expiration: any): any;
  getShareable(): any;
  getSharingInformation(request: any): any;
  getText(): any;
  inBatch(batch: any): any;
  moveTo(url: any, moveOperations: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  publish(comment: any): any;
  recycle(): any;
  select(...args: any[]): any;
  setContent(content: any): any;
  setContentChunked(file: any, progress: any, chunkSize: any): any;
  shareWith(loginNames: any, role: any, requireSignin: any, emailData: any): any;
  startUpload(uploadId: any, fragment: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  undoCheckout(): any;
  unpublish(comment: any): any;
  unshare(): any;
  unshareLink(kind: any, shareId: any): any;
  usingCaching(options: any): any;
}
export class Files {
  constructor(baseUrl: any, path: any);
  add(url: any, content: any, shouldOverWrite: any): any;
  addBatchDependency(): any;
  addChunked(url: any, content: any, progress: any, shouldOverWrite: any, chunkSize: any): any;
  addTemplateFile(fileUrl: any, templateFileType: any): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getByName(name: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export class Folder {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  checkSharingPermissions(recipients: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  deleteSharingLinkByKind(kind: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getItem(...args: any[]): any;
  getObjectSharingSettings(useSimplifiedRoles: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  getShareLink(kind: any, expiration: any): any;
  getShareable(): any;
  getSharingInformation(request: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  recycle(): any;
  select(...args: any[]): any;
  shareWith(loginNames: any, role: any, requireSignin: any, shareEverything: any, emailData: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  unshare(): any;
  unshareLink(kind: any, shareId: any): any;
  update(properties: any): any;
  usingCaching(options: any): any;
}
export class Folders {
  constructor(baseUrl: any, path: any);
  add(url: any): any;
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getByName(name: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export function FunctionExpectedException(msg: any): any;
export namespace FunctionExpectedException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export class FunctionListener {
  constructor(method: any);
  method: any;
  log(entry: any): void;
}
export class GraphHttpClient {
  fetch(url: any, options: any): any;
  fetchRaw(url: any, options: any): any;
  get(url: any, options: any): any;
  patch(url: any, options: any): any;
  post(url: any, options: any): any;
}
export class GraphQueryable {
  constructor(baseUrl: any, path: any);
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class GraphQueryableCollection {
  constructor(...args: any[]);
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(num: any): any;
  skipToken(token: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export class GraphQueryableInstance {
  constructor(...args: any[]);
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class GraphQueryableSearchableCollection {
  constructor(...args: any[]);
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  search(query: any): any;
  select(...args: any[]): any;
  skip(num: any): any;
  skipToken(token: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export class HttpClient {
  fetch(url: any, options: any): any;
  fetchRaw(url: any, options: any): any;
  get(url: any, options: any): any;
  patch(url: any, options: any): any;
  post(url: any, options: any): any;
}
export class Item {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  breakRoleInheritance(copyRoleAssignments: any, clearSubscopes: any): any;
  checkSharingPermissions(recipients: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  currentUserHasPermissions(permission: any): any;
  deleteCore(options: any, parser: any): any;
  deleteSharingLinkByKind(kind: any): any;
  ensureListItemEntityTypeName(candidatelistItemEntityTypeFullName: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getCurrentUserEffectivePermissions(): any;
  getObjectSharingSettings(useSimplifiedRoles: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  getShareLink(kind: any, expiration: any): any;
  getSharingInformation(request: any): any;
  getUserEffectivePermissions(loginName: any): any;
  getWopiFrameUrl(action: any): any;
  hasPermissions(value: any, perm: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  recycle(): any;
  resetRoleInheritance(): any;
  select(...args: any[]): any;
  shareWith(loginNames: any, role: any, requireSignin: any, emailData: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  unshare(): any;
  unshareLink(kind: any, shareId: any): any;
  update(properties: any, eTag: any, listItemEntityTypeFullName: any): any;
  userHasPermissions(loginName: any, permission: any): any;
  usingCaching(options: any): any;
  validateUpdateListItem(formValues: any, newDocumentUpdate: any): any;
}
export class ItemVersion {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class ItemVersions {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getById(versionId: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export class Items {
  constructor(baseUrl: any, path: any);
  add(properties: any, listItemEntityTypeFullName: any): any;
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  ensureListItemEntityTypeName(candidatelistItemEntityTypeFullName: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAll(requestSize: any): any;
  getAs(parser: any, options: any): any;
  getById(id: any): any;
  getItemByStringId(stringId: any): any;
  getPaged(): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any, reverse: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export class JSONFileParser {
  constructor(...args: any[]);
  handleError(r: any, reject: any): any;
  parse(r: any): any;
  parseImpl(r: any, resolve: any): void;
  parseODataJSON(json: any): any;
}
export class List {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  breakRoleInheritance(copyRoleAssignments: any, clearSubscopes: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  currentUserHasPermissions(permission: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getChanges(query: any): any;
  getCurrentUserEffectivePermissions(): any;
  getItemsByCAMLQuery(query: any, ...args: any[]): any;
  getListItemChangesSinceToken(query: any): any;
  getListItemEntityTypeFullName(): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  getUserEffectivePermissions(loginName: any): any;
  getView(viewId: any): any;
  hasPermissions(value: any, perm: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  recycle(): any;
  renderListData(viewXml: any): any;
  renderListDataAsStream(parameters: any, overrideParameters: any): any;
  renderListFormData(itemId: any, formId: any, mode: any): any;
  reserveListItemId(): any;
  resetRoleInheritance(): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  update(properties: any, eTag: any): any;
  userHasPermissions(loginName: any, permission: any): any;
  usingCaching(options: any): any;
}
export class Lists {
  constructor(baseUrl: any, path: any);
  add(title: any, description: any, template: any, enableContentTypes: any, additionalSettings: any): any;
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  ensure(title: any, description: any, template: any, enableContentTypes: any, additionalSettings: any): any;
  ensureSiteAssetsLibrary(): any;
  ensureSitePagesLibrary(): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getById(id: any): any;
  getByTitle(title: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export const LogLevel: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "99": string;
  Error: number;
  Info: number;
  Off: number;
  Verbose: number;
  Warning: number;
};
export function Logger(): void;
export namespace Logger {
  const activeLogLevel: any;
  function clearSubscribers(): any;
  const count: any;
  const instance: any;
  function log(entry: any): void;
  function measure(name: any, f: any): any;
  function subscribe(...args: any[]): void;
  function write(message: any, level: any): void;
  function writeJSON(json: any, level: any): void;
}
export function MaxCommentLengthException(msg: any): any;
export namespace MaxCommentLengthException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export const MoveOperations: {
  "1": string;
  "8": string;
  AllowBrokenThickets: number;
  Overwrite: number;
};
export class MySocialQuery {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  followed(types: any): any;
  followedCount(types: any): any;
  followers(): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  suggestions(): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class NavigationNode {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class NavigationNodes {
  constructor(...args: any[]);
  add(title: any, url: any, visible: any): any;
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getById(id: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  moveAfter(nodeId: any, previousNodeId: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export function NoCacheAvailableException(msg: any): any;
export namespace NoCacheAvailableException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export class NodeFetchClient {
  static SharePointServicePrincipal: string;
  constructor(siteUrl: any, _clientId: any, _clientSecret: any, _realm: any);
  siteUrl: any;
  token: any;
  fetch(url: any, options: any): any;
  getAddInOnlyAccessToken(): any;
  getAuthUrl(realm: any): any;
  getFormattedPrincipal(principalName: any, hostName: any, realm: any): any;
  getRealm(): any;
  toDate(epoch: any): any;
}
export function NodeFetchClientUnsupportedException(msg: any): any;
export namespace NodeFetchClientUnsupportedException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export function NotSupportedInBatchException(operation: any): any;
export namespace NotSupportedInBatchException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export class ODataBatch {
  static ParseResponse(body: any): any;
  constructor(baseUrl: any, _batchId: any);
  baseUrl: any;
  add(url: any, method: any, options: any, parser: any): any;
  addDependency(): any;
  execute(): any;
  executeImpl(): any;
}
export class ODataDefaultParser {
  constructor(...args: any[]);
  handleError(r: any, reject: any): any;
  parse(r: any): any;
  parseImpl(r: any, resolve: any, reject: any): void;
  parseODataJSON(json: any): any;
}
export function ODataIdException(data: any, msg: any): any;
export namespace ODataIdException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export class ODataParserBase {
  handleError(r: any, reject: any): any;
  parse(r: any): any;
  parseImpl(r: any, resolve: any, reject: any): void;
  parseODataJSON(json: any): any;
}
export class ODataQueryable {
  append(pathPart: any): void;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  toUrl(): any;
  usingCaching(options: any): any;
}
export const ODataRaw: {
  handleError: Function;
  parse: Function;
  parseImpl: Function;
  parseODataJSON: Function;
};
export class ODataRawParserImpl {
  constructor(...args: any[]);
  handleError(r: any, reject: any): any;
  parse(r: any): any;
  parseImpl(r: any, resolve: any): void;
  parseODataJSON(json: any): any;
}
export function ODataValue(): any;
export const PageType: {
  "-1": string;
  "0": string;
  "1": string;
  "10": string;
  "11": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  DefaultView: number;
  DialogView: number;
  DisplayForm: number;
  DisplayFormDialog: number;
  EditForm: number;
  EditFormDialog: number;
  Invalid: number;
  NewForm: number;
  NewFormDialog: number;
  NormalView: number;
  PAGE_MAXITEMS: number;
  SolutionForm: number;
  View: number;
};
export class PagedItemCollection {
  constructor(nextUrl: any, results: any);
  nextUrl: any;
  results: any;
  getNext(): any;
}
export const PermissionKind: {
  "0": string;
  "1": string;
  "10": string;
  "12": string;
  "13": string;
  "14": string;
  "17": string;
  "18": string;
  "19": string;
  "2": string;
  "20": string;
  "21": string;
  "22": string;
  "23": string;
  "24": string;
  "25": string;
  "26": string;
  "27": string;
  "28": string;
  "29": string;
  "3": string;
  "30": string;
  "31": string;
  "32": string;
  "37": string;
  "38": string;
  "39": string;
  "4": string;
  "40": string;
  "41": string;
  "5": string;
  "6": string;
  "63": string;
  "65": string;
  "7": string;
  "8": string;
  "9": string;
  AddAndCustomizePages: number;
  AddDelPrivateWebParts: number;
  AddListItems: number;
  AnonymousSearchAccessList: number;
  AnonymousSearchAccessWebLists: number;
  ApplyStyleSheets: number;
  ApplyThemeAndBorder: number;
  ApproveItems: number;
  BrowseDirectories: number;
  BrowseUserInfo: number;
  CancelCheckout: number;
  CreateAlerts: number;
  CreateGroups: number;
  CreateSSCSite: number;
  DeleteListItems: number;
  DeleteVersions: number;
  EditListItems: number;
  EditMyUserInfo: number;
  EmptyMask: number;
  EnumeratePermissions: number;
  FullMask: number;
  ManageAlerts: number;
  ManageLists: number;
  ManagePermissions: number;
  ManagePersonalViews: number;
  ManageSubwebs: number;
  ManageWeb: number;
  Open: number;
  OpenItems: number;
  UpdatePersonalWebParts: number;
  UseClientIntegration: number;
  UseRemoteAPIs: number;
  ViewFormPages: number;
  ViewListItems: number;
  ViewPages: number;
  ViewUsageData: number;
  ViewVersions: number;
};
export function PnPClientStorage(_local: any, _session: any): void;
export class PnPClientStorageWrapper {
  constructor(store: any, defaultTimeoutMinutes: any);
  store: any;
  defaultTimeoutMinutes: any;
  enabled: any;
  cacheExpirationHandler(): void;
  createPersistable(o: any, expire: any): any;
  deleteExpired(): any;
  get(key: any): any;
  getOrPut(key: any, getter: any, expire: any): any;
  put(key: any, o: any, expire: any): void;
  test(): any;
}
export function ProcessHttpClientResponseException(status: any, statusText: any, data: any): any;
export namespace ProcessHttpClientResponseException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export const QueryPropertyValueType: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  BooleanType: number;
  Int32Type: number;
  None: number;
  StringArrayType: number;
  StringType: number;
  UnSupportedType: number;
};
export const RenderListDataOptions: {
  "0": string;
  "1": string;
  "1024": string;
  "128": string;
  "16": string;
  "16384": string;
  "2": string;
  "2048": string;
  "256": string;
  "32": string;
  "32768": string;
  "4": string;
  "4096": string;
  "512": string;
  "64": string;
  "8": string;
  "8192": string;
  ClientFormSchema: number;
  ClientSideComponentManifest: number;
  ContextInfo: number;
  DisableAutoHyperlink: number;
  EnableMediaTAUrls: number;
  FileSystemItemId: number;
  ListContentType: number;
  ListData: number;
  ListSchema: number;
  MenuView: number;
  None: number;
  PageContextInfo: number;
  ParentInfo: number;
  QuickLaunch: number;
  Spotlight: number;
  ViewMetadata: number;
  Visualization: number;
};
export const ReorderingRuleMatchType: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  ContentTypeIs: number;
  FileExtensionMatches: number;
  ManualCondition: number;
  ResultContainsKeyword: number;
  ResultHasTag: number;
  TitleContainsKeyword: number;
  TitleMatchesKeyword: number;
  UrlExactlyMatches: number;
  UrlStartsWith: number;
};
export class RoleDefinitionBindings {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export const RoleType: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  Administrator: number;
  Contributor: number;
  Guest: number;
  None: number;
  Reader: number;
  WebDesigner: number;
};
export class SPListConfigurationProvider {
  constructor(sourceWeb: any, sourceListTitle: any);
  sourceWeb: any;
  sourceListTitle: any;
  asCaching(): any;
  getConfiguration(): any;
}
export class SPRequestExecutorClient {
  convertToResponse: any;
  fetch(url: any, options: any): any;
}
export function SPRequestExecutorUndefinedException(): any;
export namespace SPRequestExecutorUndefinedException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export const SPSharedObjectType: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  File: number;
  Folder: number;
  Item: number;
  List: number;
  Max: number;
  Unknown: number;
  Web: number;
};
export class Search {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  execute(query: any): any;
  expand(...args: any[]): any;
  fixupProp(prop: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export function SearchBuiltInSourceId(): void;
export namespace SearchBuiltInSourceId {
  const Documents: string;
  const ItemsMatchingContentType: string;
  const ItemsMatchingTag: string;
  const ItemsRelatedToCurrentUser: string;
  const ItemsWithSameKeywordAsThisItem: string;
  const LocalPeopleResults: string;
  const LocalReportsAndDataResults: string;
  const LocalSharePointResults: string;
  const LocalVideoResults: string;
  const Pages: string;
  const Pictures: string;
  const Popular: string;
  const RecentlyChangedItems: string;
  const RecommendedItems: string;
  const Wiki: string;
}
export class SearchQueryBuilder {
  static create(queryText: any, queryTemplate: any): any;
  constructor(queryText: any, _query: any);
  clientType(clientType: any): any;
  collapseSpecification(spec: any): any;
  culture(culture: any): any;
  desiredSnippetLength(len: any): any;
  extendQuery(part: any): any;
  hiddenConstraints(constraints: any): any;
  hitHighlightedMultivaluePropertyLimit(limit: any): any;
  hithighlightedProperties(...args: any[]): any;
  maxSnippetLength(len: any): any;
  personalizationData(data: any): any;
  properties(...args: any[]): any;
  queryTag(...args: any[]): any;
  queryTemplatePropertiesUrl(url: any): any;
  rankingModelId(id: any): any;
  refinementFilters(...args: any[]): any;
  refiners(refiners: any): any;
  reorderingRules(...args: any[]): any;
  resultsURL(url: any): any;
  rowLimit(n: any): any;
  rowsPerPage(n: any): any;
  selectProperties(...args: any[]): any;
  sortList(...args: any[]): any;
  sourceId(id: any): any;
  startRow(n: any): any;
  summaryLength(len: any): any;
  template(template: any): any;
  text(queryText: any): any;
  timeZoneId(id: any): any;
  timeout(milliseconds: any): any;
  toSearchQuery(): any;
  trimDuplicatesIncludeId(n: any): any;
  uiLanguage(lang: any): any;
}
export class SearchResults {
  constructor(rawResponse: any, _url: any, _query: any, _raw: any, _primary: any);
  formatSearchResults(rawResults: any): any;
  getPage(pageNumber: any, pageSize: any): any;
}
export class SearchSuggest {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  execute(query: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  mapQueryToQueryString(query: any): void;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class SearchSuggestResult {
  constructor(json: any);
  PeopleNames: any;
  PersonalResults: any;
  Queries: any;
}
export class SharePointQueryable {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class SharePointQueryableCollection {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export class SharePointQueryableInstance {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export const SharingDomainRestrictionMode: {
  "0": string;
  "1": string;
  "2": string;
  AllowList: number;
  BlockList: number;
  None: number;
};
export const SharingLinkKind: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  AnonymousEdit: number;
  AnonymousView: number;
  Direct: number;
  Flexible: number;
  OrganizationEdit: number;
  OrganizationView: number;
  Uninitialized: number;
};
export const SharingOperationStatusCode: {
  "-1": string;
  "-2": string;
  "-3": string;
  "-4": string;
  "-5": string;
  "-6": string;
  "-7": string;
  "-8": string;
  "-9": string;
  "0": string;
  "1": string;
  AccessDenied: number;
  AccessRequestsQueued: number;
  CapabilityDisabled: number;
  CompletedSuccessfully: number;
  CrossSiteRequestNotSupported: number;
  EmailBodyTooLong: number;
  ListUniqueScopesExceeded: number;
  NestedGroupsNotSupported: number;
  NoResolvedUsers: number;
  ObjectNotSupported: number;
  UnknowError: number;
};
export const SharingRole: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  Edit: number;
  None: number;
  Owner: number;
  View: number;
};
export class Site {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  createBatch(): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getContextInfo(): any;
  getDocumentLibraries(absoluteWebUrl: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  getRootWeb(): any;
  getWebUrlFromPageUrl(absolutePageUrl: any): any;
  inBatch(batch: any): any;
  openWebById(webId: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class SocialQuery {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  createSocialActorInfoRequestBody(actorInfo: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  follow(actorInfo: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getFollowedDocumentsUri(): any;
  getFollowedSitesUri(): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  isFollowed(actorInfo: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  stopFollowing(actorInfo: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export const SortDirection: {
  "0": string;
  "1": string;
  "2": string;
  Ascending: number;
  Descending: number;
  FQLFormula: number;
};
export const TemplateFileType: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  ClientSidePage: number;
  FormPage: number;
  StandardPage: number;
  WikiPage: number;
};
export class TextFileParser {
  constructor(...args: any[]);
  handleError(r: any, reject: any): any;
  parse(r: any): any;
  parseImpl(r: any, resolve: any): void;
  parseODataJSON(json: any): any;
}
export function UrlException(msg: any): any;
export namespace UrlException {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export const UrlFieldFormatType: {
  "0": string;
  "1": string;
  Hyperlink: number;
  Image: number;
};
export function Util(): void;
export namespace Util {
  function combinePaths(...args: any[]): any;
  function dateAdd(date: any, interval: any, units: any): any;
  function extend(target: any, source: any, noOverwrite: any): any;
  function getCtxCallback(context: any, method: any, ...args: any[]): any;
  function getGUID(): any;
  function getRandomString(chars: any): any;
  function getUrlParamBoolByName(name: any): any;
  function getUrlParamByName(name: any): any;
  function isArray(array: any): any;
  function isFunction(candidateFunction: any): any;
  function isUrlAbsolute(url: any): any;
  function loadStylesheet(path: any, avoidCache: any): void;
  function stringInsert(target: any, index: any, s: any): any;
  function stringIsNullOrEmpty(s: any): any;
  function toAbsoluteUrl(candidateUrl: any): any;
  function urlParamExists(name: any): any;
}
export class UtilityMethod {
  static getBaseUrl(candidate: any): any;
  constructor(baseUrl: any, methodName: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  createEmailBodyForInvitation(pageAddress: any): any;
  createWikiPage(info: any): any;
  deleteCore(options: any, parser: any): any;
  excute(props: any): any;
  expandGroupsToPrincipals(inputs: any, maxCount: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getCurrentUserEmailAddresses(): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  resolvePrincipal(input: any, scopes: any, sources: any, inputIsEmailOnly: any, addToUserInfoList: any, matchUserInfoList: any): any;
  searchPrincipals(input: any, scopes: any, sources: any, groupName: any, maxCount: any): any;
  sendEmail(props: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class Web {
  static fromUrl(url: any, path: any): any;
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  addClientSidePage(pageName: any, title: any, libraryTitle: any): any;
  addClientSidePageByPath(pageName: any, listRelativePath: any, title: any): any;
  append(pathPart: any): void;
  applyTheme(colorPaletteUrl: any, fontSchemeUrl: any, backgroundImageUrl: any, shareGenerated: any): any;
  applyWebTemplate(template: any): any;
  as(factory: any): any;
  availableWebTemplates(language: any, includeCrossLanugage: any): any;
  breakRoleInheritance(copyRoleAssignments: any, clearSubscopes: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  createBatch(): any;
  currentUserHasPermissions(permission: any): any;
  deleteCore(options: any, parser: any): any;
  ensureUser(loginName: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAppCatalog(url: any): any;
  getAs(parser: any, options: any): any;
  getCatalog(type: any): any;
  getChanges(query: any): any;
  getClientSideWebParts(): any;
  getCurrentUserEffectivePermissions(): any;
  getFileByServerRelativePath(fileRelativeUrl: any): any;
  getFileByServerRelativeUrl(fileRelativeUrl: any): any;
  getFolderByServerRelativePath(folderRelativeUrl: any): any;
  getFolderByServerRelativeUrl(folderRelativeUrl: any): any;
  getList(listRelativeUrl: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  getStorageEntity(key: any): any;
  getSubwebsFilteredForCurrentUser(nWebTemplateFilter: any, nConfigurationFilter: any): any;
  getUserById(id: any): any;
  getUserEffectivePermissions(loginName: any): any;
  hasPermissions(value: any, perm: any): any;
  inBatch(batch: any): any;
  mapToIcon(filename: any, size: any, progId: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  resetRoleInheritance(): any;
  select(...args: any[]): any;
  shareObject(url: any, loginNames: any, role: any, emailData: any, group: any, propagateAcl: any, includeAnonymousLinkInEmail: any, useSimplifiedRoles: any): any;
  shareObjectRaw(options: any): any;
  shareWith(loginNames: any, role: any, emailData: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  unshareObject(url: any): any;
  update(properties: any): any;
  userHasPermissions(loginName: any, permission: any): any;
  usingCaching(options: any): any;
}
export class WebPart {
  constructor(baseUrl: any, path: any);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class WebPartDefinition {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  close(): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  moveTo(zoneId: any, zoneIndex: any): any;
  open(): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  saveChanges(): any;
  select(...args: any[]): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  usingCaching(options: any): any;
}
export class WebPartDefinitions {
  constructor(...args: any[]);
  addBatchDependency(): any;
  append(pathPart: any): void;
  as(factory: any): any;
  clone(factory: any, additionalPath: any, includeBatch: any): any;
  concat(pathPart: any): any;
  configure(options: any): any;
  deleteCore(options: any, parser: any): any;
  expand(...args: any[]): any;
  filter(filter: any): any;
  get(parser: any, options: any): any;
  getAs(parser: any, options: any): any;
  getByControlId(id: any): any;
  getById(id: any): any;
  getParent(factory: any, baseUrl: any, path: any, batch: any): any;
  inBatch(batch: any): any;
  orderBy(orderBy: any, ascending: any): any;
  patchCore(options: any, parser: any): any;
  postAsCore(options: any, parser: any): any;
  postCore(options: any, parser: any): any;
  select(...args: any[]): any;
  skip(skip: any): any;
  toRequestContext(verb: any, options: any, parser: any, pipeline: any): any;
  toUrl(): any;
  toUrlAndQuery(): any;
  top(top: any): any;
  usingCaching(options: any): any;
}
export const WebPartsPersonalizationScope: {
  "0": string;
  "1": string;
  Shared: number;
  User: number;
};
export const config: {
  add: Function;
  addJSON: Function;
  apply: Function;
  get: Function;
  getJSON: Function;
  load: Function;
};
export default _default;
export namespace _default {
  const config: {
    add: Function;
    addJSON: Function;
    apply: Function;
    get: Function;
    getJSON: Function;
    load: Function;
  };
  const graph: {
    v1: any;
  };
  function log(): void;
  namespace log {
    const activeLogLevel: any;
    function clearSubscribers(): any;
    const count: any;
    const instance: any;
    function log(entry: any): void;
    function measure(name: any, f: any): any;
    function subscribe(...args: any[]): void;
    function write(message: any, level: any): void;
    function writeJSON(json: any, level: any): void;
  }
  function setup(config: any): void;
  const sp: {
    configure: Function;
    createBatch: Function;
    crossDomainSite: Function;
    crossDomainWeb: Function;
    navigation: any;
    profiles: any;
    search: Function;
    searchSuggest: Function;
    site: any;
    social: any;
    utility: any;
    web: any;
  };
  const storage: {
    local: any;
    session: any;
  };
  function util(): void;
  namespace util {
    function combinePaths(...args: any[]): any;
    function dateAdd(date: any, interval: any, units: any): any;
    function extend(target: any, source: any, noOverwrite: any): any;
    function getCtxCallback(context: any, method: any, ...args: any[]): any;
    function getGUID(): any;
    function getRandomString(chars: any): any;
    function getUrlParamBoolByName(name: any): any;
    function getUrlParamByName(name: any): any;
    function isArray(array: any): any;
    function isFunction(candidateFunction: any): any;
    function isUrlAbsolute(url: any): any;
    function loadStylesheet(path: any, avoidCache: any): void;
    function stringInsert(target: any, index: any, s: any): any;
    function stringIsNullOrEmpty(s: any): any;
    function toAbsoluteUrl(candidateUrl: any): any;
    function urlParamExists(name: any): any;
  }
}
export const graph: {
  v1: any;
};
export function log(): void;
export namespace log {
  const activeLogLevel: any;
  function clearSubscribers(): any;
  const count: any;
  const instance: any;
  function log(entry: any): void;
  function measure(name: any, f: any): any;
  function subscribe(...args: any[]): void;
  function write(message: any, level: any): void;
  function writeJSON(json: any, level: any): void;
}
export function setup(config: any): void;
export const sp: {
  configure: Function;
  createBatch: Function;
  crossDomainSite: Function;
  crossDomainWeb: Function;
  navigation: any;
  profiles: any;
  search: Function;
  searchSuggest: Function;
  site: any;
  social: any;
  utility: any;
  web: any;
};
export function spExtractODataId(candidate: any): any;
export function spODataEntity(factory: any): any;
export function spODataEntityArray(factory: any): any;
export const storage: {
  local: any;
  session: any;
};
export function util(): void;
export namespace util {
  function combinePaths(...args: any[]): any;
  function dateAdd(date: any, interval: any, units: any): any;
  function extend(target: any, source: any, noOverwrite: any): any;
  function getCtxCallback(context: any, method: any, ...args: any[]): any;
  function getGUID(): any;
  function getRandomString(chars: any): any;
  function getUrlParamBoolByName(name: any): any;
  function getUrlParamByName(name: any): any;
  function isArray(array: any): any;
  function isFunction(candidateFunction: any): any;
  function isUrlAbsolute(url: any): any;
  function loadStylesheet(path: any, avoidCache: any): void;
  function stringInsert(target: any, index: any, s: any): any;
  function stringIsNullOrEmpty(s: any): any;
  function toAbsoluteUrl(candidateUrl: any): any;
  function urlParamExists(name: any): any;
}
