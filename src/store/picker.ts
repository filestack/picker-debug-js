import Vue from 'vue';
import _set from 'lodash.set';
import _get from 'lodash.get';
import _defaultsDeep from 'lodash.defaultsdeep';

type Noop = () => void;
// eslint-disable-next-line
const noop: Noop = () => {};
const defaultConfig = {
  displayMode: 'inline',
  dropPane: {
    id: '',
    overlay: true,
    onDragEnter: noop,
    onDragLeave: noop,
    onDragOver: noop,
    onDrop: noop,
    onSuccess: noop,
    onError: noop,
    onProgress: noop,
    onClick: noop,
    disableClick: false,
    showIcon: true,
    showProgress: true,
    customText: undefined,
    // cropFiles: undefined,
  },
  // cropFiles: undefined,
  rootId: '__filestack-picker',
  cleanupImageExif: false, // todo
  fromSources: ['local_file_system', 'url', 'imagesearch', 'facebook', 'instagram', 'googledrive', 'dropbox'], // general
  accept: [], //
  concurrency: 4,
  maxSize: 100 * 1024 * 1024,
  minFiles: 1,
  maxFiles: 1,
  errorsTimeout: 5000,
  // failOverMaxFiles: false,
  supportEmail: 'support@filestack.com',
  lang: 'en',
  viewType: 'list',
  transformations: { // @todo
    crop: {},
    circle: true,
    rotate: true,
  },
  disableTransformer: false,
  imageMin: undefined,
  imageMax: undefined,
  imageDim: undefined,
  imageMinMaxBlock: false,

  startUploadingWhenMaxFilesReached: false,
  // loadCss: undefined,
  storeTo: undefined, // --------------------
  uploadConfig: undefined, // --------------------
  customText: undefined,
  hideModalWhenUploading: false,
  uploadInBackground: false,
  allowManualRetry: true,
  disableThumbnails: false,
  disableStorageKey: false,
  // CBs
  onUploadStarted: noop,
  onFileSelected: noop,
  onFileUploadStarted: noop,
  onFileUploadProgress: noop,
  onFileUploadFinished: noop,
  onFileUploadFailed: noop,
  // onFileCropped: noop,
  onOpen: noop,
  onCancel: noop,
  onClose: noop,
  onUploadDone: noop,
  videoResolution: undefined,
  customSourceContainer: undefined,
  customSourceName: undefined,
  customSourcePath: undefined,
};

const runCode = `
// Client implementation is hardcoded and started with your apikey, cname and options provided in forms
try {
  const picker = client.picker({
    displayMode: 'inline', // we suggest to use picker in inline mode for debug purposes
    container: '#picker-demo', // please do not change it - its important for mounting picker in our debug demo
    onUploadDone: debugDoneCallback, // this will inform debug application about upload finish, and send logs to filestack support
    // your picker options
  });
  picker.open();
} catch(e) {
  console.error(e.message);
  console.error(e.details);
}
`;

export default {
  namespaced: true,
  state: {
    runCode: runCode + '',
    sources: ['local_file_system', 'url', 'imagesearch', 'facebook', 'instagram', 'googledrive', 'dropbox'],
    langs: ['ca', 'da', 'de', 'en', 'es', 'fr', 'he', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'sv', 'ru', 'vi', 'zh', 'tr', 'ar'],
    // config: Object.assign({}, defaultConfig),
    // importedConfig: {},
  },
  getters: {
    runCode:  (st: any) => st.runCode,
    getConfigKey: (st: any) => (key: string) => _get(st.config, key),
    sources: (st: any) => st.sources,
    langs: (st: any) => st.langs,
  },
  mutations: {
    setRunCode: (st: any, code: string) => {
      Vue.set(st, 'runCode', code);
    },
    // eslint-disable-next-line
    setConfigKey: (st: any, { key, value }: { key: string, value: string}) => _set(st.config, key, value),
    setImportedConfig: (st: any, data: any) => {
      st.importedConfig = data;
      st.config = _defaultsDeep(data, st.config);
      console.log(st.config);
    },
  },
  actions: {
    
  },
  modules: {

  }
};
