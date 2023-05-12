import Scenarist from 'scenarist.dev';
import { createInterface } from 'readline';
import Checklist from './checklist.js';

const play = Scenarist ( new Checklist );
const cli = createInterface ( {

input: process .stdin,
output: process .stdout

} );

cli .on ( 'line', async line => {

try {

console .log ( play ( ... line .trim () .toLowerCase () .split ( /\s+/ ) ) );

} catch ( error ) {

console .error ( 'No no no!' );
console .error ( 'See what you did!', error .toString () );

}

cli .prompt ();

} );

cli .prompt ();
