const $ = Symbol .for;

export default class Directory {

$_producer ( play, { stamp } ) {

Object .defineProperty ( this, 'stamp', { value: stamp } );

}

$_director ( play, direction, ... order ) {

const { pilot: notaplay } = play ( this .stamp );

if ( typeof direction === 'string' && ! isNaN ( parseInt ( direction ) ) && direction .includes ( '.' ) ) {

direction = direction .split ( /\.+/ );

if ( direction [ direction .length - 1 ] === '' )
direction .pop ();

return notaplay ( ... direction, ... order );

}

}

async $import ( play, path ) { return play ( $ ( 'extension' ), await import ( path ) ) }

$_extension ( play, scenario ) {

Object .assign ( this, scenario );

Object .keys ( scenario )
.filter ( direction => direction .startsWith ('$' ) )
.forEach ( direction => play ( direction .startsWith ( '$_' ) ? $ ( direction .slice ( 2 ) ) : direction .slice ( 1 ) ) );

}

};
