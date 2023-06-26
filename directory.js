const $ = Symbol .for;

export default class Directory {

$_producer ( play, production ) {

const directory = this;
const { player, stamp } = production;

directory .stamp = stamp;
production .setting = player ( stamp );

}

$_director ( play, direction, ... order ) {

if ( typeof direction === 'string' && ! isNaN ( parseInt ( direction ) ) && direction .includes ( '.' ) ) {

direction = direction .split ( /\.+/ );

if ( direction [ direction .length - 1 ] === '' )
direction .pop ();

return play ( ... direction, ... order );

}

}

$_extension ( play, scenario ) {

const nota = this;

Object .keys ( scenario )
.filter ( direction => direction .startsWith ('$' ) && [ 'object', 'function' ] .includes ( typeof scenario [ direction ] ) )
.forEach ( direction => {

if ( typeof scenario [ direction ] === 'function' )
return Object .defineProperty ( nota .directory, direction, {

configurable: true,
value: scenario [ direction ]

} );
if ( ! scenario [ direction ] .$done ) {

scenario [ direction ] .$_producer = ( _, production ) => ( production .setting = play ( nota .stamp ) );

Object .defineProperty ( scenario [ direction ], '$done', {

value ( play ) { nota .$_director = nota .directory }

} );

Object .defineProperty ( nota .directory, direction, {

configurable: true,
value () { this .$_director = scenario [ direction ] }

} );

}

play ( direction .startsWith ( '$_' ) ? $ ( direction .slice ( 2 ) ) : direction .slice ( 1 ) );

const production = play ( $ ( 'director' ), nota .stamp );

delete scenario [ direction ] .$_producer;

play ( $ ( 'director' ), $ ( 'producer' ), production );
play ( 'done' );

} );

}

};
