import Nota from 'scenarist.dev/nota';
import Note from 'scenarist.dev/nota/note';

export default class Director {

constructor ( { stamp } ) {

Object .assign ( this, { stamp } );

}

[ '$.' ] ( play, ... order ) {

const { player: notePlayer } = play ( this .stamp );

return order .length ? notePlayer ( ... order ) : notePlayer;

}

[ '$..' ] ( play, ... order ) {

const { stamp } = this;
const { player: notePlayer } = play ( stamp );
const { player: notaPlayer } = notePlayer ( stamp );

return ( notaPlayer || notePlayer ) ( '.', ... order );

}

$_director ( play, direction, ... order ) {

if ( ! isNaN ( parseInt ( direction ) ) && direction .includes ( '.' ) )
return play ( '.', ... direction .split ( '.' ), ... order );

if ( direction ?.length )
return;

const { scenario: nota, location } = play ( '.', this .stamp );

if ( ! ( nota instanceof Nota ) )
return nota .$_content;

const { $_content: notebook, title } = nota;
let text = '';

if ( title ?.length )
text += `${ '#' .repeat ( location .length + 1 ) } ${ location .join ( '.' ) }${ ( location .length ? ' ' : '' ) + title }`;

if ( notebook .length )
text += `${ text .length ? '\n\n' : '' }${ notebook .map ( ( note, index ) => play ( '.', index + 1, Symbol .for ( 'director' ) ) )
.join ( '\n' ) }
`;

return text;

}

};
