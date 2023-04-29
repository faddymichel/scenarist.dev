export default function Scenarist ( ... scenario ) {

if ( ! this ?.[ $ .play ] )

if ( [ 'object', 'function' ] .includes ( typeof scenario [ 0 ] ?.script ) ) {

const play = Scenarist .bind ( {

[ $ .play ]: true,
script: scenario [ 0 ] .script,
setting: scenario [ 0 ] ?.setting || {},
director: scenario [ 0 ] ?.director === true ? true : false,
history: new Map ( [ [ $ .location, scenario [ 0 ] ?.[ $ .location ] || [] ] ] ),
binder: scenario [ 0 ] [ $ .binder ],
get play () { return play }

} );

return Object .defineProperty ( play, 'name', {

value: scenario [ 0 ] ?.[ $ .location ] instanceof Array ? 'play:' + scenario [ 0 ] ?.[ $ .location ] .join ( '/' ) : 'play'

} );

}

else
return;

scenario = scenario ?.[ 0 ] ?.[ $ .scenario ] || scenario;

const { play, script, setting, director, history, binder } = this;
const location = history .get ( $ .location );
const [ direction ] = scenario;
let $direction;

if ( direction === Symbol .for ( 'play/details' ) )
return { play, script, setting, binder, scenario, location };

let conflict;

if ( typeof setting ?.[ direction ] === 'function' && ! Object .prototype [ direction ] )
return setting [ scenario .shift () ] .call ( play, ... scenario );

else if ( typeof script === 'function' )
return script .call ( binder .script, ... scenario );

else if ( [ 'string', 'number' ] .includes ( typeof direction ) && typeof script ?.[ $direction = '$' + direction ] !== 'undefined' )
conflict = scenario .conflict = script [ $direction ];

else if ( director && typeof script ?.[ direction ] !== 'undefined' )
conflict = scenario .conflict = script [ direction ];

else
throw Object .assign ( Error ( 'Unknown direction' ), {

direction,
code: Symbol .for ( 'play/error/unknown-direction' )

} );

scenario .shift ();

switch ( typeof conflict ) {

case 'object':
case 'function':

if ( ! history .get ( conflict ) )
history .set ( conflict, Scenarist ( {

script: conflict,
setting,
director,
[ $ .binder ]: { script, play },
[ $ .location ]: [ ... location, direction ]

} ) );

return history .get ( conflict ) ( ... scenario );

}

return conflict;

};

const $ = {

play: Symbol ( 'play/$play' ),
scenario: Symbol ( 'play/$scenario' ),
history: Symbol ( 'play/$history' ),
location: Symbol ( 'play/$location' ),
binder: Symbol ( 'play/binder' )

};
