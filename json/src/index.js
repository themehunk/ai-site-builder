import { createRoot, render, createElement } from '@wordpress/element';
import App from './App';
const el = document.getElementById( 'root' );
const root = createRoot( el );
// import { Provider } from 'react-redux';
//import store from './store';


//store.subscribe(()=>console.log(store.getState()));

root.render( <App />);

// function Greeting( props ) {
//     return createElement( 'span', null, 'Hello ' + props.toWhom + '!' );
// }

// const domElement = document.getElementById( 'greeting' );
// const uiElement = createElement( Greeting, { toWhom: 'World' } );

// if ( createRoot ) {
//     createRoot( domElement ).render( uiElement );
// } else {
//     render( uiElement, domElement );
// }