import Director from './director.js';
import { createInterface, Interface } from 'readline';
import { Console } from 'console';
import { Readable, Writable } from 'stream';

export default class Shell extends Director {

constructor ( medium = {} ) {

super ( medium );

const { input, output, error } = medium;

Object .assign ( this, {

input: input instanceof Readable ? medium .input : process .stdin,
output: output instanceof Writable ? medium .output : process .stdout,
error: error instanceof Writable ? medium .output : process .stderr

} );

}

$_producer ( play ) {

const shell = this;
const { stamp, input, output, error } = shell;
const { pilot } = play ( stamp );

shell .play = pilot;
shell .page = createInterface ( {

input, output,
completer ( line ) {

try {

const completion = shell .play ( Symbol .for ( 'complete' ), ... line .trimStart () .split ( /\s+/ ) );

if ( completion instanceof Array && completion .length === 2 )
return completion;

} catch ( error ) {

console .error ( error );

}

return [];

}

} );

for ( const event of [ 'line', 'SIGINT', 'error', 'close' ] )
shell .page .on ( event, ( ... order ) => shell .play ( Symbol .for ( 'on' + event ), ... order ) );

shell .console = new Console ( output, error );

play ( Symbol .for ( 'prompt' ) );

shell .$_producer = false;

}

$_online ( play, line ) {

const shell = this;
const { console } = shell;
const resolution = shell .play ( ... ( line = line .trim () ) ?.length ? line .split ( /\s+/ ) : [] );

if ( [ 'string', 'number', 'boolean' ] .includes ( typeof resolution ) )
console .log ( resolution );

else if ( typeof resolution === 'function' )
shell .play = play = resolution;

play ( Symbol .for ( 'prompt' ) );

}

#interrupted

$_onSIGINT ( play ) {

const shell = this;
const { console } = shell;

if ( shell .page .line ?.length )
shell .page .line = '';

else if ( shell .#interrupted ) {

shell .page .input .write ( '^C' );

return shell .page .close ();

}

else {

console .log ( '^C\n(To exit, press Ctrl+C again or Ctrl+D)' );

shell .#interrupted = true;

}

play ( Symbol .for ( 'prompt' ) );

}

$_onclose () {

this .console .log ( 'Okay, yallah bye bye!' );

}

$_onerror ( play, error ) {

this .console .error ( `(${ error .toString () })` );

play ( Symbol .for ( 'prompt' ) );

}

$_complete ( play, ... order ) {

const shell = this;
const input = order .pop ();

if ( order .length )
return play ( '.', ... order, Symbol .for ( 'complete' ), input );

const directions = play ( Symbol .for ( 'directions' ), input );

if ( directions instanceof Array )
return [ directions, input ];

if  ( typeof directions === 'function' )
return directions ( Symbol .for ( 'complete' ), input );

}

#scenario = Symbol ( 'shell/secret' )

$_directions ( play, input, secret = {} ) {

const shell =this;
const scenario = secret [ shell .#scenario ] === undefined ? play ( shell .stamp ) .pilot ( shell .stamp ) .scenario : secret [ shell .#scenario ];

if ( ! scenario )
return [];

return [

... Object .keys ( Object .getOwnPropertyDescriptors ( scenario ) )
.filter ( direction => direction ?.[ 0 ] === '$' && direction ?.[ 1 ] !== '_' )
.map ( direction => direction .slice ( 1 ) )
.filter ( direction => direction .startsWith ( input ) )
.map ( direction => direction + ' ' ),
... play ( Symbol .for ( 'directions' ), input, {

[ shell .#scenario ]: Object .getPrototypeOf ( scenario )

} )

];

}

$_prompt ( play ) {

const shell = this;
const { pilot } = play ( shell .stamp );

shell .page .setPrompt ( `${ pilot ( this .stamp ) .location .join ( '.' ) }: ` );
shell .page .prompt ();

}

};
