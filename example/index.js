import Scenarist from '../index.js';
import script from './greeter.js';

const $ = Scenarist ( { script } );

$ ( 'greet' );

console .log ( $ ( 'Math' ) .location .join ( '.' ) + ' = ' + $ ( 'Math', 'random' ) );
