import Scenarist from 'scenarist.dev';
import { createInterface } from 'readline';
import Notebook from './notebook.js';

const play = Scenarist ( new Notebook );
const cli = createInterface ( {

input: process .stdin,
output: process .stdout

} );

cli .on ( 'line', async line => {

try {

console .log ( play ( ... line .trim () .split ( /\s+/ ) ) );

} catch ( error ) {

console .error ( 'No no no!' );
console .error ( 'See what you did!', error .toString () );

}

cli .prompt ();

} );

cli .prompt ();
