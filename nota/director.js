import Nota from 'scenarist.dev/nota';
import Note from 'scenarist.dev/nota/note';

export default class Director {

constructor ( { stamp } ) {

Object .assign ( this, { stamp } );

}

[ '$.' ] ( play, ... order ) {

const { pilot: notePlayer } = play ( this .stamp );

return order .length ? notePlayer ( ... order ) : notePlayer;

}

[ '$..' ] ( play, ... order ) {

const { stamp } = this;
const { pilot: notePlayer } = play ( stamp );
const { player: notaPlayer } = notePlayer ( stamp );

return ( notaPlayer || notePlayer ) ( '.', ... order );

}

[ '$~' ] ( play, ... order ) {

const { stamp } = this;
const { pilot: notePlayer } = play ( stamp );
const { pilot } = notePlayer ( stamp );

return pilot ( '.', ... order );

}

$_director ( play, direction, ... order ) {

if ( ! isNaN ( parseInt ( direction ) ) && direction .includes ( '.' ) )
return play ( '.', ... direction .split ( '.' ), ... order );

if ( direction ?.length )
return;

const { scenario: nota, location } = play ( '.', this .stamp );
const { $_content: notebook, $_title: title } = nota;
let text = '';

if ( title ?.length )
text += `${ '#' .repeat ( location .length + 1 ) } ${ location .join ( '.' ) }${ ( location .length ? ' ' : '' ) + title }`;

if ( [ 'string', 'number' ] .includes ( typeof notebook ) )
text += `${ text .length ? '\n' : '' }${ notebook }`;

else if ( notebook instanceof Array && notebook .length )
text += `${ text .length ? '\n' : '' }${ notebook .map ( ( note, index ) => play ( '.', index + 1, Symbol .for ( 'director' ) ) )
.join ( '\n' ) }`;

return text;

}

};
