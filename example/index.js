import play from './checklist.js';
import { createInterface } from 'readline';

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
