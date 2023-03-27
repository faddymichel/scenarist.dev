import Scenarist from './index.js';
import { createInterface } from 'readline';

const $ = Scenarist ( {

//director: true,
script: Object .setPrototypeOf ( {

koko: 'wawa',
$yallah: 'Salah Abdallah!',
$meen () {

return this .$yallah;

}

}, console )

} );
const cli = createInterface ( {

input: process .stdin,
output: process .stdout,
prompt: 'Say yallah!\n'

} );

cli .on ( 'line', line => {

try {

console .log ( $ ( ... line .trim () .toLowerCase () .split ( /\s+/ ) ) );

} catch ( error ) {

console .error ( 'No no no!' );
console .error ( 'See what you did!', error .toString () );

}

cli .prompt ();

} );

cli .prompt ();
