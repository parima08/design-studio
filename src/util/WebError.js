const MAX_MESSAGE_LENGTH = 1000;

export default class WebError extends Error {

  static fromXhr( xhr ) {
    let msg = null;

    if( ( xhr.responseType === '' || xhr.responseType === 'text' ) && xhr.responseText ) {
      if( xhr.responseText.startsWith( '{' ) ) {
        try {
          let obj = JSON.parse( xhr.responseText );
          if( obj ) {
            msg = obj['error'];
          }
        } catch( ignore ) {}
      }

      if( msg == null ) {
        msg = xhr.responseText;
        if( msg && msg.length > MAX_MESSAGE_LENGTH ) {
          msg = msg.substring( 0, MAX_MESSAGE_LENGTH );
        }
      }
    } else {
      msg = xhr.statusText || xhr.status && 'Http Error' || 'Could not reach server.'
    }

    return new WebError( xhr.status,  msg );
  }
  
  
  constructor( status, message ) {
    let msg = String( status ) + ': ' + ( message || 'unknown' );
    super( msg );
    this.status = status;
  }
  
}
