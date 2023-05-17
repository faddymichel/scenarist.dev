import { createInterface } from 'readline';

export default class Shell {

constructor ( { stamp, scenario } ) {

this .stamp = stamp;
this .$_scenario = scenario;

}

#interface

$_interact ( pilot ) {

const shell =this;
const { stamp } = shell;
const { play, location } = pilot ( Symbol .for ( 'scenario' ), stamp );

location .shift ();

shell .play = play;
shell .#interface = createInterface ( {

input: process .stdin,
output: process .stdout,
completer ( line ) {

const order = line .trimStart () .split ( /\s+/ );
const input = order .pop ();

try {

const directions = shell .play ( ... order, Symbol .for ( 'complete' ), input );

if ( directions instanceof Array && directions .length === 2 )
return directions;

} catch ( error ) {}

return [];

}

} );

for ( const event of [ 'line' ] )
shell .#interface .on ( event, ( ... order ) => shell [ 'on' + event ] ( ... order ) );

shell .prompt ();

}

online ( line ) {

const shell = this;

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

$_completeLine ( play, line ) {

const shell = this;
const { scenario } = shell .play ( this .stamp );
const directions = shell .play ( Symbol .for ( 'directions' ) );

return directions .filter ( direction => direction .startsWith ( input ) )
.map ( direction => direction + ' ' );

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
