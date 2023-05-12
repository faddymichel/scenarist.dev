export default function Scenarist ( ... order ) {

if ( ! this ?.[ $ .play ] )

if ( [ 'object', 'function' ] .includes ( typeof order [ 0 ] ) ) {

const play = Scenarist .bind ( {

[ $ .play ]: true,
history: new Map (),
get play () { return play }

} );
const script = {

scenario: order [ 0 ],
location: order [ 1 ] ?.[ $ .location ] || [],
director: order [ 1 ] ?.[ $ .director ],
signature: order [ 1 ] ?.signature

};

return Object .defineProperties ( play, {

name: { value: 'play' + script .location .length ? `:${ script .location .join ( '/' ) }` : '' },
script: {

value: signature => signature === script .signature || signature === $ .signature ? script : undefined

}

} );

}

else
throw TypeError ( "Scenarist: 'scenario' must be either an 'object' or 'function'." );

const { play, history } = this;
const { scenario, location, director } = play .script ( $ .signature );
const [ direction ] = order;
let $direction;

let conflict;

if ( typeof scenario === 'function' )
return scenario .call ( director .script () .scenario, ... order );

else if ( [ 'string', 'number' ] .includes ( typeof direction ) && typeof scenario ?.[ $direction = '$' + direction ] !== 'undefined' )
conflict = order .conflict = scenario [ $direction ];

else
throw Object .assign ( Error ( 'Unknown direction' ), {

direction,
code: Symbol .for ( 'scenarist/error/unknown-direction' )

} );

order .shift ();

switch ( typeof conflict ) {

case 'object':
case 'function':

if ( ! history .get ( conflict ) )
history .set ( conflict, Scenarist ( conflict, {

[ $ .director ]: play,
[ $ .location ]: [ ... location, direction ]

} ) );

return history .get ( conflict ) ( ... order );

}

return conflict;

};

const $ = {

signature: Symbol ( 'scenarist/signature' ),
play: Symbol ( 'scenarist/$play' ),
order: Symbol ( 'scenarist/$order' ),
history: Symbol ( 'scenarist/$history' ),
location: Symbol ( 'scenarist/$location' ),
director: Symbol ( 'scenarist/director' )

};
