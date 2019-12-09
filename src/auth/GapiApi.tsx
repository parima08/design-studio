declare var gapi : any;

export default class GapiApi {
  private _clientId; 

  constructor(clientId) {
    this._clientId = clientId;
  }
  
  public static readonly shared = new GapiApi('213328197517-079p7u328erbifqllrsimnhi3phsdos9');

  async signIn(cb){
    await gapi.load('auth2', async () => {
      const auth2 = gapi.auth2.init({client_id: this._clientId});
      await auth2.signIn();
      cb();
    });
  }

  signOut(cb){
    gapi.load('auth2', () => {
      let auth2 = gapi.auth2.getAuthInstance();
      if(!auth2){
        auth2 = gapi.auth2.init({client_id: this._clientId});
      }
      return auth2.signOut().then( () => {
        auth2.disconnect();
        cb();
      });
    });
  }
}