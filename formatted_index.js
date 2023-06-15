export default function Scenarist ( ... order ) {

if ( ! this ?.[ $ .play ] )
if ( [ 'object', 'function' ] .includes ( typeof order [ 0 ] ) ) {

const setting = {};
const play = Scenarist .bind ( {

[ $ .play ] : true,
plot : new Map ( ),
setting

} );

Object .assign ( setting, {

play,
stamp : order [ 1 ] ?.stamp,
scenario : order [ 0 ],
location : [ ],
player : order [ 1 ] ?.player,
pilot : order [ 1 ] ?.pilot || play

} );

const { location } = setting;

return Object .defineProperty ( play, 'name', {

value :
 `play${ location .length ? ( ':' + location .map ( direction => direction .toString ( ) ) .join ( '.' ) ) : '' }`

} );

}

else
throw TypeError ( "Scenarist: 'scenario' must be either an 'object' or 'function'." );
let { setting, plot } = this;
let { play, stamp, scenario, location, player, pilot } = setting;
let [ direction ] = order;
let conflict, $direction;

if ( typeof scenario === 'function' )

return scenario .call ( player ( stamp ) .scenario, player, ... order );
else if ( direction === stamp )
return setting;
else if ( [ 'string', 'number' ] .includes ( typeof direction ) && direction ?.[ 0 ] !== '_' && typeof scenario ?.[ $direction = '$' + direction ] !== 'undefined' ) {

conflict = scenario [ $direction ];

order .shift ( );

}

else if ( typeof direction === 'symbol' && ( $direction = Symbol .keyFor ( direction ) ) && typeof scenario ?.[ $direction = '$_' + $direction ] !== 'undefined' ) {

conflict = scenario [ $direction ];

order .shift ( );

}

else if ( typeof scenario .$_director !== undefined )
conflict = scenario .$_director;

else
throw Object .assign ( Error ( `Unknown direction: [ ${ [ ... location, direction ] .join ( ' ' ) } ]` ), {

direction,
location,
code : Symbol .for ( 'scenarist/error/unknown-direction' )

} );

switch ( typeof conflict ) {

case 'object' :
case 'function' :
if ( ! plot .get ( conflict ) )

plot .set ( conflict, Scenarist ( conflict, {

stamp,
player : play,
pilot

} ) );

play = plot .get ( conflict );

if ( typeof conflict === 'object' ) {

setting = play ( stamp );

setting .location = [ ... location, direction ];

}

return play ( ... order );

}

return conflict;

};

const $ = {

stamp : Symbol ( 'scenarist/stamp' ),
play : Symbol ( 'scenarist/$play' ),
location : Symbol ( 'scenarist/$location' )

};