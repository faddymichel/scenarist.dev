export default function Scenarist ( ... order ) {

if ( ! this ?.[ $ .play ] )

if ( typeof order [ 0 ] === 'object' ) {

const play = Scenarist .bind ( {

[ $ .play ]: true,
history: new Map (),
get play () { return play }

} );
const script = {

story: order [ 0 ] .story || {},
scenario: typeof order [ 0 ] .scenario === 'object' ? order [ 0 ] .scenario : {},
location: order [ 0 ] ?.[ $ .location ] || [],
director: order [ 0 ] [ $ .director ],
signature: order [ 0 ] .signature

};

return Object .defineProperties ( play, {

name: { value: 'play' + script .location .length ? `:${ script .location .join ( '/' ) }` : '' },
script: {

value: signature => signature === script .signature || signature === $ .signature ? script : undefined

}

} );

}

else
return;

order = order ?.[ 0 ] ?.[ $ .order ] || order;

const { play, history } = this;
const { story, scenario, location, director } = play .script ( $ .signature );
const [ direction ] = order;
let $direction;

let conflict;

if ( typeof scenario ?.[ direction ] === 'function' && ! Object .prototype [ direction ] )
return scenario [ order .shift () ] ( ... order );

else if ( typeof story === 'function' )
return story .call ( director .story, ... order );

else if ( [ 'string', 'number' ] .includes ( typeof direction ) && typeof story ?.[ $direction = '$' + direction ] !== 'undefined' )
conflict = order .conflict = story [ $direction ];

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
history .set ( conflict, Scenarist ( {

story: conflict,
scenario,
[ $ .director ]: { story, play },
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
