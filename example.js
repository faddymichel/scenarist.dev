import Scenarist from './index.js';
import { createInterface } from 'readline';

const $ = Scenarist ( {

script: { yallah: 'Salah Abdallah!' }

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

console .error ( error .toString ());

}

cli .prompt ();

} );

cli .prompt ();
