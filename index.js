export default function Scenarist ( ... scenario ) {

if ( ! this ?.[ $ .signature ] )

if ( [ 'object', 'function' ] .includes ( typeof scenario [ 0 ] ?.script ) ) {

const scenarist = Scenarist .bind ( {

[ $ .signature ]: true,
script: scenario [ 0 ] .script,
setting: scenario [ 0 ] ?.setting || {},
history: { [ $ .location ]: scenario [ 0 ] ?.[ $ .location ] || [] },
binder: scenario [ 0 ] [ $ .binder ],
get scenarist () { return scenarist }

} );

return scenarist;

}

else
return;

scenario = scenario ?.[ 0 ] ?.[ $ .scenario ] || scenario;

const { scenarist, script, setting, history, binder } = this;
const location = history [ $ .location ];
let [ direction ] = scenario;

if ( direction === Symbol .for ( 'scenarist/details' ) )
return { scenarist, script, setting, binder, scenario, location };

let conflict;

if ( typeof setting ?.[ direction ] === 'function' && ! Object .prototype [ direction ] )
return setting [ scenario .shift () ] .call ( scenarist, ... scenario );

else if ( typeof script === 'function' )
return script .call ( binder .script, ... scenario );

else if ( typeof script ?.[ direction = '$' + scenario .shift () ] !== 'undefined' )// || Object .getOwnPropertyDescriptor ( script, direction ) )
conflict = scenario .conflict = script [ direction ];

else
throw Object .assign ( Error ( 'Unknown direction' ), {

direction,
code: Symbol .for ( 'scenarist/error/unknown-direction' )

} );

switch ( typeof conflict ) {

case 'object':
case 'function':
return ( history [ conflict ] || ( history [ conflict ] = Scenarist ( {

script: conflict,
setting,
[ $ .binder ]: { script, scenarist },
//typeof script === 'function' ? binder : { scenarist, script },
[ $ .location ]: [ ... location, direction ]

} ) ) ) ( ... scenario );

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
