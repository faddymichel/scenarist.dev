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
.filter ( direction => direction .startsWith ('$' ) && typeof scenario [ direction ] === 'object' )
.forEach ( direction => {

if ( ! scenario [ direction ] .$done ) {

Object .defineProperty ( scenario [ direction ], '$done', {

value ( play ) { nota .$_director = nota .directory }

} );

Object .defineProperty ( nota .directory, direction, {

configurable: true,
value () { this .$_director = scenario [ direction ] }

} );

}

play ( direction .startsWith ( '$_' ) ? $ ( direction .slice ( 2 ) ) : direction .slice ( 1 ) );
play ();
play ( 'done' );

} );

}

};
