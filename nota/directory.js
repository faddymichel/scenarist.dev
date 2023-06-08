export default class Directory {

list = []

constructor ( directions ) {

const directory = this;

if ( typeof directions === 'object' )
Object .keys ( directions )
.filter ( direction => direction .startsWith ( '$' ) )
.forEach ( direction => {

directory [ direction ] = directions [ direction ];

directory .list .push ( direction );

} );

}

$_producer ( play, { stamp } ) {

const directory = this;

Object .defineProperty ( directory, 'stamp', { value: stamp } );

for ( const direction of directory .list )
play ( direction .startsWith ( '$_' ) ? Symbol .for ( direction .slice ( 2 ) ) : direction .slice ( 1 ) )

}

/*
[ '$.' ] ( play, ... order ) {

const { pilot: notaplay } = play ( this .stamp );

return order .length ? notaplay ( ... order ) : notaplay;

}

[ '$..' ] ( play, ... order ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { player: notaPlayer } = notaplay ( stamp );

return ( notaPlayer || notaplay ) ( '.', ... order );

}

[ '$~' ] ( play, ... order ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { pilot } = notaplay ( stamp );

return pilot ( '.', ... order );

}
*/

$_complete ( play, ... order ) {

const directory = this;
const { pilot: notaplay, player } = play ( directory .stamp );
const { scenario: nota } = notaplay ( directory .stamp );

if ( typeof nota === 'function' && nota [ Symbol .for ( 'playable' ) ] !== true )
return [];

if ( order .length > 1 )
return notaplay ( order .shift (), Symbol .for ( 'complete' ), ... order );

const input = order .pop ();
const filtered = {};
const directions = [

... ( ! player ? play ( Symbol .for ( 'directions' ), { input, filtered } ) : [] ),
... ( play ( Symbol .for ( 'directions' ), {

input, filtered,
scenario: directory

} ) || [] )

];

return [ directions, input ];

}

$_directions ( play, { scenario, input, filtered } ) {

const directory =this;

scenario = scenario !== undefined ? scenario : play ( directory .stamp ) .pilot ( directory .stamp ) .scenario;

if ( ! scenario )
return [];

const descriptor = Object .getOwnPropertyDescriptors ( scenario );

filtered = typeof filtered === 'object' ? filtered : {};

return [

... Object .keys ( descriptor )
.filter ( direction => {

const filter = filtered [ direction ] !== true
&& direction ?.[ 0 ] === '$'
&& direction ?.[ 1 ] !== '_'
&& ( typeof descriptor [ direction ] .get === 'function' || ( descriptor [ direction ] .value !== undefined && descriptor [ direction ] .value !== null ) );

filtered [ direction ] = true;

return filter;

} )
.map ( direction => direction .slice ( 1 ) )
.filter ( direction => direction .startsWith ( input ) )
.map ( direction => direction + ' ' ),
... play ( Symbol .for ( 'directions' ), {

input, filtered,
scenario: Object .getPrototypeOf ( scenario )

} )

];

}

$_director ( play, direction, ... order ) {

const { pilot: notaplay } = play ( this .stamp );

if ( ! isNaN ( parseInt ( direction ) ) && direction .includes ( '.' ) ) {

direction = direction .split ( /\.+/ );

if ( direction [ direction .length - 1 ] === '' )
direction .pop ();

return notaplay ( ... direction, ... order );

}
if ( direction ?.length )
return;

const { scenario: nota, location } = notaplay ( this .stamp );
const { $_content: note } = nota;

if ( note instanceof Array && note .length )
return location .join ( '.' ) + ( note .length ? '\n' : '' )
+ note
.map ( ( note, index ) => notaplay ( index + 1, Symbol .for ( 'director' ) ) )
.join ( '\n' );

return `${ location .join ( '.' ) } ${ ( typeof note ?.toString === 'function' ? note : new String ( note ) ) .toString () }`;

}

$_order ( play ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { location } = notaplay ( stamp );

return parseInt ( location [ location .length - 1 ] );

}

};
