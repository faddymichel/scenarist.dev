export default function Scenarist ( ... scenario ) {

if ( ! this ?.[ $ .signature ] )

if ( typeof scenario [ 0 ] ?.script === 'object' ) {

const scenarist = Scenarist .bind ( {

[ $ .signature ]: true,
script: scenario [ 0 ] .script,
setting: scenario [ 0 ] ?.setting || {},
[ $ .history ]: { [ Symbol .for ( 'scenarist/location' ) ]: scenario [ 0 ] ?.[ $ .location ] || [] },
get scenarist () { return scenarist }

} );

return scenarist;

}

else
return;

const { scenarist, script, setting, [ $ .history ]: history } = this;
const location = history [ Symbol .for ( 'scenarist/location' ) ];

if ( ! scenario .length )
return { scenarist, script, setting, scenario, location };

const direction = scenario .shift ();

if ( ! Object .hasOwn ( setting, direction ) && ! Object .hasOwn ( script, direction ) )
throw Error ( 'Unknown direction' );

const conflict = scenario .conflict = setting ?.[ direction ] || script ?.[ direction ];

switch ( typeof conflict ) {

case 'object':
return ( history [ conflict ] || ( history [ conflict ] = Scenarist ( {

script: conflict,
setting,
[ $ .location ]: [ ... location, direction ]

} ) ) ) ( ... scenario );

case 'function':
return conflict .call ( setting ?.[ direction ] ? scenarist : script, ... scenario );

}

return conflict;

};

const $ = {

signature: Symbol ( 'scenarist/$signature' ),
scenario: Symbol ( 'scenarist/$scenario' ),
history: Symbol ( 'scenarist/$history' ),
location: Symbol ( 'scenarist/$location' )

};
