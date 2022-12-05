import Scenarist from './index.js';
import { createInterface } from 'readline';

const $ = Scenarist ( {

script: {

yallah: 'Salah Abdallah!',
meen () {

return this .yallah;

}

}

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

}

cli .prompt ();

} );

cli .prompt ();
