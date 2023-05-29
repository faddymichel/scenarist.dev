import Scenarist from 'scenarist.dev';

export default class Nota {

constructor ( { title, content, stamp, publisher } ) {

Object .assign ( this, {

stamp,
$_title: typeof $_title === 'string' ? title : '',
$_content: content,
publisher

} );

}

$title ( play, ... title ) {

this .$_title = title .join ( ' ' ) .trim ();

return play ();

}

$nota ( play, ... title ) {

return play ( Symbol .for ( 'note' ), { content: [] } );

}

$text ( play, ... content ) {

if ( ! ( content = content .join ( ' ' ) .trim () ) ?.length )
return false;

return play ( Symbol .for ( 'note' ), { content } );

}

$_note ( play, note ) {

const nota = this;
const { $_content: notebook } = nota;

if ( ! ( notebook instanceof Array ) )
return false;

const child = new Nota ( Object .assign ( note, {

stamp: nota .stamp,
publisher: nota .publisher

} ) );

const order = notebook .push ( child );

Object .defineProperty ( nota, '$' + order, {

get: () => notebook [ order - 1 ],
configurable: true,
enumerable: true

} );

// play ( order, Symbol .for ( 'publish' ) );

return order;

}

$_producer ( play ) {

const nota = this;
const directory = Scenarist ( nota .publisher, {

stamp: nota .stamp,
pilot: play

} );

nota .$_director = ( play, ... order ) => directory ( ... order );

if ( ! ( nota .$_content instanceof Array ) )
return;

const { $_content: notebook } = nota;

nota .$_content = [];

if ( notebook .length )
for ( const content of notebook )
play ( Symbol .for ( 'note' ), { content } );

}

get $size () { return this .$_content .length }

$delete ( play ) {

const nota = this;
const { stamp } = nota;
const { location, player } = play ( stamp );
const { scenario: { $_content: notebook } } = player ( stamp );
const order = play ( Symbol .for ( 'order' ) );

notebook .splice ( order - 1, 1 );

delete notebook [ '$' + ( notebook .length + 1 ) ];

return true;

}

$_order ( play ) {

const { location } = play ( this .stamp );

return parseInt ( location [ location .length - 1 ] );

}

};
