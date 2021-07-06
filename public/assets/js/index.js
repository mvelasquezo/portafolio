HTMLElement.prototype.on = function( eve, fun ) {
    let expresionRegular = /[,;\s]+/;
    let evts = eve.split( expresionRegular );

    for( let i = 0; i < evts.length; i++ ) {

        let evt = evts[i].trim();

        if( evt.isEmpty() ) continue;

        if( 'addEventListener' in window ) {

            this.addEventListener( evt, fun, false );

        } else {

            let thisEvent = 'on' + evt;

            if( 'attachEvent' in window )
                this.attachEvent( thisEvent, fun );
            else
                this[ thisEvent ] = fun;
        }
    }

    return this;
}

String.prototype.isEmpty = function() {
    return ( this.length === 0 || !this.trim() );
};

let jsBase = function() {
    let fn = {};
    fn.init = function() {};

    fn.$ = function( strObj ) {

        if( ( typeof strObj === 'string' || strObj instanceof String ) )
            return document.getElementById(strObj);

        return strObj;
    };

    fn.$$ = function( strClss ) {
        return document.querySelector( `.${ strClss }` );
    };

    fn.nvoEvt = function( elemento, evento, funcion ) {
        if( elemento.addEventListener )
            elemento.addEventListener(evento, funcion, false);
        else if( elemento.attachEvent )
            elemento.attachEvent('on' + evento, funcion);
    };

    return fn;
}();

jsBase.nvoEvt( window, 'load', function() {
    jsIndex.init( jsIndex );
});

let jsIndex = function() {

    let fn = {};

    fn.init = ( self ) => {

        jsBase.$( 'frm-hablemos' )?.on( 'submit', ( evt ) => {
            self.handleSubmit( evt );
        });

        let enlaces = document.querySelectorAll( '.menu.apa li a' );

        enlaces.forEach( a => {
            a.on( 'click', () => {
                
                enlaces.forEach( enl => {
                    enl.classList.remove( 'esta-activo' );
                });

                a.classList.add( 'esta-activo' ); 
            });
        });


        let url = window.location.href;
        let tag = url.match(/^[^#]*#(.*)/);
        let proy = (tag)?tag[ 1 ]:null;

        if( null != proy ) {
            enlaces.forEach( enl => {
                enl.classList.remove( 'esta-activo' );
            });
            jsBase.$$( 'js-proyecto' ).classList.add( 'esta-activo' );
        }
    };

    fn.handleSubmit = function( evt ) {
        var e = evt || window.event;
        e.preventDefault();

        //const frm = new FormData( document.forms.namedItem( 'nombre' ) );
        //const frm = new FormData( this );
        const frm = new FormData( e.target );

        let anc = jsBase.$( 'aEnv' );
        
        anc.setAttribute( 'href'
            , `mailto:1924821300101@ingenieria.usac.edu.gt?subject=${ frm.get( 'nombre' ) } - ${ frm.get( 'correo' ) }&body=${ frm.get( 'mensaje' ) }` );
        anc.click();

        //if( !e.defaultPrevented ) {
        //}
    }

    return fn;

}();