import Note from './note.js';

export default class Nota extends Note {

constructor ( { stamp, title } ) {

super ( { stamp, content: [] } );

this .title = title || 'Nota';

}

$title ( play, ... title ) {

this .title = title .join ( ' ' );

return play ();

}

$nota ( play, ... title ) {

return play ( Symbol .for ( 'note' ), new Nota ( {

stamp: this .stamp,
title: title .join ( '' ) || 'Nota'

} ) );

}

$text ( play, ... content ) {

if ( ! ( content = content .join ( ' ' ) ) ?.length )
return false;

return play ( Symbol .for ( 'note' ), new Note ( { stamp: this .stamp, content } ) );

}

$_note ( play, note ) {

const nota = this;
const { $_content: notebook } = nota;
const order = notebook .push ( note );
const label = '#' + order;

Object .defineProperty ( nota, '$' + label, {

get: () => notebook [ order - 1 ],
configurable: true,
enumerable: true

} );

return label;

}

$_director ( play, ... order ) {

if ( order .length )
return;

const nota = this;
const { stamp, $_content: notebook, title } = nota;
const { location } = play ( stamp );
let text = '';

if ( title ?.length )
text += `${ '#' .repeat ( location .length + 1 ) } ${ location .map ( direction => direction .slice ( 1 ) ) .join ( '.' ) }${ ( location .length ? '. ' : '' ) + title }`;

if ( notebook .length )
text += `${ text .length ? '\n\n' : '' }${ notebook .map ( ( note, index ) => play ( '#' + ( index + 1 ), Symbol .for ( 'director' ) ) )
.join ( '\n' ) }
`;

return text;

}

$export () { return JSON .stringify ( this ) }

get $size () { return this .$_content .length }

};
