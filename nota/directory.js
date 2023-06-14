const $ = Symbol .for;

export default class Directory {

list = []

$_producer ( play, { stamp } ) {

Object .defineProperty ( this, 'stamp', { value: stamp } );

}

$_complete ( play, ... order ) {

const directory = this;
const { pilot: notaplay, player } = play ( directory .stamp );
const { scenario: nota } = notaplay ( directory .stamp );

if ( typeof nota === 'function' && nota [ $ ( 'playable' ) ] !== true )
return [];

if ( ( typeof order [ 0 ] === 'string' && ! isNaN ( parseInt ( order [ 0 ] ) ) && order [ 0 ] .includes ( '.' ) ) || order .length > 1 )
return notaplay ( order .shift (), $ ( 'complete' ), ... order );

const input = order .pop () || '';
const filtered = {};
const directions = [

... ( play ( $ ( 'directions' ), {

input, filtered,
scenario: directory

} ) || [] ),
... ( ! player ? play ( $ ( 'directions' ), { input, filtered } ) : [] ),

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
... play ( $ ( 'directions' ), {

input, filtered,
scenario: Object .getPrototypeOf ( scenario )

} )

];

}

$_director ( play, direction, ... order ) {

const { pilot: notaplay } = play ( this .stamp );

if ( typeof direction === 'string' && ! isNaN ( parseInt ( direction ) ) && direction .includes ( '.' ) ) {

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
return location .join ( '.' )
+ ( nota .title ?.length ? ` ${ nota .title }` : '' )
+ ( note .length ? '\n' : '' )
+ note
.map ( ( note, index ) => notaplay ( index + 1, $ ( 'director' ) ) )
.join ( '\n' );

return `${ location .join ( '.' ) } ${ ( typeof note ?.toString === 'function' ? note : new String ( note ) ) .toString () }`;

}

$_order ( play ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { location } = notaplay ( stamp );

return parseInt ( location [ location .length - 1 ] );

}

$_extension ( play, scenario ) {

Object .assign ( this, scenario );

Object .keys ( scenario )
.filter ( direction => direction .startsWith ('$' ) )
.forEach ( direction => play ( direction .startsWith ( '$_' ) ? $ ( direction .slice ( 2 ) ) : direction .slice ( 1 ) ) );

}

};
