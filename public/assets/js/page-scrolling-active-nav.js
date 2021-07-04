const secciones = [
    jsBase.$( 'heroe' )
    , jsBase.$( 'proyecto' )
    , jsBase.$( 'frm-hablemos' )
];
  
const navItems = {
    heroe: jsBase.$$( 'js-heroe' )
    , proyecto: jsBase.$$( 'js-proyecto' )
    , 'frm-hablemos': jsBase.$$( 'js-hablemos' )
};

const observerOpts = {
    root: null
    , rootMargin: '0px'
    , threshold: 0.7
};

function observerFn( entradas, observer ) {
    entradas.forEach( ( entrada ) => {
      if( entrada.isIntersecting ) {
        
        const navItem = navItems[ entrada.target.id ];
        navItem.classList.add( 'esta-activo' );

        Object.values( navItems ).forEach( ( item ) => {
            if( item != navItem )
                item.classList.remove( 'esta-activo' );
        });
      }
    });
}

const obs = new IntersectionObserver( observerFn, observerOpts );

secciones.forEach( ( secc ) => obs.observe( secc ) );