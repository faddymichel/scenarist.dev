import { createInterface } from 'readline';
import { Console } from 'console';
import { Readable, Writable } from 'stream';

export default class Shell {

constructor ( { stamp, scenario, channel } ) {

const shell = this;

Object .assign ( shell, {

stamp,
$_scenario: scenario,
channel: {

input: channel ?.input || process .stdin,
output: channel ?.output || process .stdout,
error: channel ?.error || process .stderr

}

} );

}

#interface

$_interact ( pilot ) {

const shell =this;
const { stamp, channel } = shell;

// Get the `play` and `location` for the root `Nota`.
const { play, location } = pilot ( Symbol .for ( 'scenario' ), stamp );

// Remove the `direction` of the s`shell` scenario from the `location` array
// to start tracking the `location` from the root `Nota`.
location .shift ();

// Start playing the shell from the root Nota
shell .play = play;

shell .#interface = createInterface ( Object .assign ( channel, {

completer ( line ) {

const { pilot } = shell .play ( shell .stamp );

try {

return pilot ( Symbol .for ( 'complete' ), ... line .trimStart () .split ( /\s+/ ) );

} catch ( error ) {}

return [];

}

} ) );

shell .console = new Console ( channel .output, channel .error );

for ( const event of [ 'line', 'SIGINT', 'error', 'close' ] )
shell .#interface .on ( event, ( ... order ) => shell [ 'on' + event ] ( ... order ) );

shell .prompt ();

}

online ( line ) {

const shell = this;
const { console } = shell;

try {

const resolution = shell .play ( ... ( line = line .trim () ) ?.length ? line .split ( /\s+/ ) : [] );

if ( [ 'string', 'number', 'boolean' ] .includes ( typeof resolution ) )
console .log ( resolution );

else if ( typeof resolution === 'function' )
shell .play = resolution;

} catch ( error ) {

console .error ( error .toString () );

}

shell .prompt ();

}

#interrupted

onSIGINT () {

const shell = this;
const { console } = shell;

if ( shell .#interface .line ?.length )
shell .#interface .line = '';

else if ( shell .#interrupted ) {

shell .#interface .input .write ( '^C' );

return shell .#interface .close ();

}

else {

console .log ( '^C\n(To exit, press Ctrl+C again or Ctrl+D)' );

shell .#interrupted = true;

}

shell .prompt ();

}

onclose () {

this .console .log ( 'Okay, yallah bye bye!' );

}

onerror ( error ) {

const shell = this;

shell .console .error ( `(${ error .toString () })` );
shell .prompt ();

}

$_complete ( play, ... order ) {

const shell = this;
const input = order .pop ();
const directions = shell .play ( ... order, Symbol .for ( 'complete' ), input );

if ( directions instanceof Array && directions .length === 2 )
return directions;

if  ( typeof directions === 'function' )
return directions ( Symbol .for ( 'complete' ), input );

}

$_directions ( play, scenario, input ) {

if ( ! scenario )
return [];

return [

... Object .keys ( Object .getOwnPropertyDescriptors ( scenario ) )
.filter ( direction => direction ?.[ 0 ] === '$' && direction ?.[ 1 ] !== '_' )
.map ( direction => direction .slice ( 1 ) )
.filter ( direction => direction .startsWith ( input ) )
.map ( direction => direction + ' ' ),
... play ( Symbol .for ( 'directions' ), Object .getPrototypeOf ( scenario ), input )

];

}

prompt () {

const shell = this;

shell .#interface .setPrompt ( shell .play ( Symbol .for ( 'prompt' ) ) || ': ' );
shell .#interface .prompt ();

}

};
