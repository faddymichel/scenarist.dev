export default function Scenarist ( ... order ) {

if ( ! this ?.[ $ .play ] )

if ( [ 'object', 'function' ] .includes ( typeof order [ 0 ] ) ) {

const production = {};
let play = Scenarist .bind ( {

[ $ .play ]: true,
plot: new Map (),
production

} );

Object .assign ( production, {

play,
stamp: order [ 1 ] ?.stamp,
scenario: order [ 0 ],
player: order [ 1 ] ?.player,
pilot: order [ 1 ] ?.pilot || play,
location: order [ 1 ] ?.[ $ .location ] || []

} );

production .setting = order [ 1 ] ?.setting || production .scenario;

const { location } = production;

play = Object .defineProperty ( play, 'name', {

value: 
`play${ location .length ? ( ':' + location .map ( direction => ( typeof direction ?.toString === 'function' ? direction : new String ( direction ) ) .toString () ) .join ( '.' ) ) : '' }`

} );

if ( production .scenario .$_producer !== undefined )
play ( Symbol .for ( 'producer' ), production );

return play;

}

else
throw TypeError ( "Scenarist: 'scenario' must be either an 'object' or 'function'." );

let { production, plot } = this;
let { play, stamp, scenario, setting, location, player, pilot } = production;
let [ direction ] = order;
let conflict, $direction;
let directed = true;

if ( typeof scenario === 'function' )
return scenario .call ( setting, player, ... order );

else if ( direction === stamp )
return production;

else if ( [ 'string', 'number' ] .includes ( typeof direction ) && direction ?.[ 0 ] !== '_' && typeof scenario ?.[ $direction = '$' + direction ] !== 'undefined' ) {

conflict = scenario [ $direction ];

order .shift ();

}

else if ( typeof direction === 'symbol' && ( $direction = Symbol .keyFor ( direction ) ) && typeof scenario ?.[ $direction = '$_' + $direction ] !== 'undefined' ) {

conflict = scenario [ $direction ];

order .shift ();

}

else if ( typeof scenario .$_director !== undefined ) {

conflict = scenario .$_director;
direction = Symbol .for ( 'director' );
directed = true;

}

else
throw Object .assign ( Error ( `Unknown direction: [ ${ [ ... location, direction ] .join ( ' ' ) } ]` ), {

direction,
location,
code: Symbol .for ( 'senarist.dev/error/unknown-direction' )

} );

switch ( typeof conflict ) {

case 'object':
case 'function':

if ( ! plot .get ( conflict ) )
plot .set ( conflict, Scenarist ( conflict, {

stamp,
player: play,
pilot,
setting: directed ? setting : undefined,
[ $ .location ]: [ ... location, direction ]

} ) );

play = plot .get ( conflict );

return play ( ... order );

}

return conflict;

};

const $ = {

stamp: Symbol ( 'senarist.dev/stamp' ),
play: Symbol ( 'senarist.dev/$play' ),
location: Symbol ( 'senarist.dev/$location' )

};
