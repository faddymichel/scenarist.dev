import Note from 'scenarist.dev/nota/note';

export default class Nota extends Note {

constructor ( { stamp, publisher, title } ) {

super ( { stamp, publisher, content: [] } );

this .title = title || 'Nota';

}

$title ( play, ... title ) {

this .title = title .join ( ' ' );

return play ();

}

$nota ( play, ... title ) {

return play ( Symbol .for ( 'note' ), new Nota ( {

stamp: this .stamp,
publisher: this .publisher,
pilot: play, // ( '.' ),
title: title .join ( '' ) || 'Nota'

} ) );

}

$text ( play, ... content ) {

if ( ! ( content = content .join ( ' ' ) ) ?.length )
return false;

return play ( Symbol .for ( 'note' ), new Note ( {

stamp: this .stamp,
publisher: this .$_director,
content

} ) );

}

$_note ( play, note ) {

const nota = this;
const { $_content: notebook } = nota;
const order = notebook .push ( note );

Object .defineProperty ( nota, '$' + order, {

get: () => notebook [ order - 1 ],
configurable: true,
enumerable: true

} );

play ( order, Symbol .for ( 'publish' ) );

return order;

}

get $size () { return this .$_content .length }

};
