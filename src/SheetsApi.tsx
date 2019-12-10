import BluebirdPromise from './util/Promise';
import WebError from './util/WebError';
import parseSheetAssetList from './util/parseSheetAssetList';

export default class SheetsApi {

  public static readonly shared = new SheetsApi(); 

  loadAsyncData = (sheetId, details) => {
    const url = "https://spreadsheets.google.com/feeds/list/"+ sheetId +"/od6/public/values?alt=json";
    const mapper = (res) => {
      try{
        const data = JSON.parse(res.responseText);
        const assets : any[] = [];
        for(var i = 0; i < data.feed.entry.length; i++){
          const asset = parseSheetAssetList(data.feed.entry[i], details);
          assets.push(asset);
        }
        console.log(assets);
        return assets;        
      }
      catch( error ){
        console.log(error);
      }
    }
   
    return this._send({ path: url, data: null, mapper});
  };

  _send({
    path,
    data,
    mapper,
    headers = [],
    method = 'GET',
  }) {

    const xhr = new XMLHttpRequest();
    xhr.open(method, path, true, undefined, undefined);

    if (headers.length) {
      headers.forEach(header => xhr.setRequestHeader(header[0], header[1]));
    }

    return new BluebirdPromise((resolve, reject, onCancel) => {
      onCancel(() => xhr.abort());
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(mapper === undefined ? xhr : mapper(xhr));
          } catch (err) {
            reject(err);
          }
          return;
        }

        reject(WebError.fromXhr(xhr));
      };

      xhr.send(data);
    });
  }
}