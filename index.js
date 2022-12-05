export default function Scenarist ( ... scenario ) {

if ( ! this ?.[ $ .signature ] )

if ( [ 'object', 'function' ] .includes ( typeof scenario [ 0 ] ?.script ) ) {

const scenarist = Scenarist .bind ( {

[ $ .signature ]: true,
script: scenario [ 0 ] .script,
setting: scenario [ 0 ] ?.setting || {},
[ $ .history ]: { [ Symbol .for ( 'scenarist/location' ) ]: scenario [ 0 ] ?.[ $ .location ] || [] },
binder: scenario [ 0 ] .binder,
get scenarist () { return scenarist }

} );

return scenarist;

}

else
return;

const { scenarist, script, setting, [ $ .history ]: history, binder } = this;
const location = history [ Symbol .for ( 'scenarist/location' ) ];
const [ direction ] = scenario;
let conflict;

if ( direction === Symbol .for ( 'scenarist/details' ) )
return { scenarist, script, setting, binder, scenario, location };

if ( typeof script === 'function' ) {

if ( setting ?.[ direction ] )
conflict = setting [ direction ];

else
return script .call ( setting ?.[ location [ location .length - 1 ] ] ? binder .scenarist : binder .script, ... scenario );

}

else
conflict = scenario .conflict = setting ?.[ direction ] || script ?.[ direction ];

scenario .shift ();

if ( typeof conflict !== 'function' && ! Object .getOwnPropertyDescriptor ( setting, direction ) && ! Object .getOwnPropertyDescriptor ( script, direction ) )
throw Error ( 'Unknown direction' );

switch ( typeof conflict ) {

case 'object':
case 'function':
return ( history [ conflict ] || ( history [ conflict ] = Scenarist ( {

script: conflict,
setting,
binder: { script, scenarist },
//typeof script === 'function' ? binder : { scenarist, script },
[ $ .location ]: [ ... location, direction ]

} ) ) ) ( ... scenario );

/*
case 'function':
return conflict .call ( setting ?.[ direction ] ? scenarist : script, ... scenario );
*/

}

return conflict;

};

const $ = {

signature: Symbol ( 'scenarist/$signature' ),
scenario: Symbol ( 'scenarist/$scenario' ),
history: Symbol ( 'scenarist/$history' ),
location: Symbol ( 'scenarist/$location' )

};
