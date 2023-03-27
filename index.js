export default function Scenarist ( ... scenario ) {

if ( ! this ?.[ $ .signature ] )

if ( [ 'object', 'function' ] .includes ( typeof scenario [ 0 ] ?.script ) ) {

const scenarist = Scenarist .bind ( {

[ $ .signature ]: true,
script: scenario [ 0 ] .script,
setting: scenario [ 0 ] ?.setting || {},
director: scenario [ 0 ] ?.director === true ? true : false,
history: new Map ( [ [ $ .location, scenario [ 0 ] ?.[ $ .location ] || [] ] ] ),
binder: scenario [ 0 ] [ $ .binder ],
get scenarist () { return scenarist }

} );

return Object .defineProperty ( scenarist, 'name', {

value: scenario [ 0 ] ?.[ $ .location ] instanceof Array ? 'scenarist:' + scenario [ 0 ] ?.[ $ .location ] .join ( '/' ) : 'scenarist'

} );

}

else
return;

scenario = scenario ?.[ 0 ] ?.[ $ .scenario ] || scenario;

const { scenarist, script, setting, director, history, binder } = this;
const location = history .get ( $ .location );
const [ direction ] = scenario;
let $direction;

if ( direction === Symbol .for ( 'scenarist/details' ) )
return { scenarist, script, setting, binder, scenario, location };

let conflict;

if ( typeof setting ?.[ direction ] === 'function' && ! Object .prototype [ direction ] )
return setting [ scenario .shift () ] .call ( scenarist, ... scenario );

else if ( typeof script === 'function' )
return script .call ( binder .script, ... scenario );

else if ( [ 'string', 'number' ] .includes ( typeof direction ) && typeof script ?.[ $direction = '$' + direction ] !== 'undefined' )
conflict = scenario .conflict = script [ $direction ];

else if ( director && typeof script ?.[ direction ] !== 'undefined' )
conflict = scenario .conflict = script [ direction ];

else
throw Object .assign ( Error ( 'Unknown direction' ), {

direction,
code: Symbol .for ( 'scenarist/error/unknown-direction' )

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
[ $ .binder ]: { script, scenarist },
[ $ .location ]: [ ... location, direction ]

} ) );

return history .get ( conflict ) ( ... scenario );

}

return conflict;

};

const $ = {

signature: Symbol ( 'scenarist/$signature' ),
scenario: Symbol ( 'scenarist/$scenario' ),
history: Symbol ( 'scenarist/$history' ),
location: Symbol ( 'scenarist/$location' ),
binder: Symbol ( 'scenarist/binder' )

};
