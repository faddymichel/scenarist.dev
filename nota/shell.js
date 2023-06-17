import { createInterface, Interface } from 'readline';
import { Console } from 'console';
import { Readable, Writable } from 'stream';

export default class Shell {

constructor ( medium = {} ) {

Object .assign ( this, {

play: medium ?.play,
input: medium ?.input instanceof Readable ? medium .input : process .stdin,
output: medium ?.output instanceof Writable ? medium .output : process .stdout,
error: medium ?.error instanceof Writable ? medium .output : process .stderr

} );

}

$_producer ( play, { stamp } ) {

const shell = this;
const { input, output, error } = shell;

shell .stamp = stamp;
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
shell .page .on ( event, ( ... order ) => play ( Symbol .for ( 'on' + event ), ... order ) );

shell .console = new Console ( output, error );

play ( Symbol .for ( 'prompt' ) );

}

$_online ( play, line ) {

const shell = this;
const { console } = shell;

Promise .resolve ( shell .play ( ... ( line = line .trim () ) ?.length ? line .split ( /\s+/ ) : [] ) )
.then ( resolution => {

if ( [ 'string', 'number', 'boolean' ] .includes ( typeof resolution ) )
console .log ( resolution );

else if ( typeof resolution === 'function' )
shell .play = resolution;

} )
.catch ( error => console .error ( error .toString () ) )
.finally ( () => play ( Symbol .for ( 'prompt' ) ) );

}

#interrupted

$_onSIGINT ( play ) {

const shell = this;
const { console } = shell;

if ( shell .page .line ?.length ) {

shell .page .line = '';
shell .#interrupted = false;

}
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

$_prompt ( play ) {

const shell = this;

shell .page .setPrompt ( shell .play ( Symbol .for ( 'prompt' ) ) + ': ' );
shell .page .prompt ();

}

};
