import { createInterface } from 'readline';
import Nota from './index.js';

export default class Shell extends Nota {

#interface

$_interact ( play ) {

const shell =this;

shell .#interface = createInterface ( {

input: process .stdin,
output: process .stdout,
prompt: play ( Symbol .for ( 'prompt' ) ) || ': ',
completer ( line ) {

const order = line .trimStart () .split ( /\s+/ );
const input = order .pop ();
const { scenario } = play ( ... order, shell .stamp );
const index = Shell .directions ( scenario );

return [

index .filter ( direction => direction .startsWith ( input ) )
.map ( direction => direction + ' ' ),
input

]

}

} )

shell .#interface .on ( 'line', async line => {

try {

const resolution = play ( ... line .trim () .split ( /\s+/ ) );

if ( [ 'string', 'number', 'boolean' ] .includes ( typeof resolution ) )
console .log ( resolution );

} catch ( error ) {

console .error ( error .toString () );

}

shell .#interface .prompt ();

} );

shell .#interface .prompt ();

return true;

}

static directions ( scenario ) {

if ( ! scenario )
return [];

return [

... Object .keys ( Object .getOwnPropertyDescriptors ( scenario ) ) .filter ( direction => direction ?.[ 0 ] === '$' && direction ?.[ 1 ] !== '_' )
.map ( direction => direction .slice ( 1 ) ),
... Shell .directions ( Object .getPrototypeOf ( scenario ) )

];

}

};
