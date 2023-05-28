import Scenarist from 'scenarist.dev';

export default class Note {

constructor ( { stamp, content, pilot, publisher } ) {

const note = this;

Object .assign ( note, {

stamp: stamp,
$_content: content,
publisher
//$_director: typeof pilot === 'function' ? Scenarist ( publisher, { stamp, pilot } ) : publisher

} );

}

$_publish ( play ) {

const note = this;
const publisherPlayer = Scenarist ( note .publisher, {

stamp: note .stamp,
pilot: play

} );

note .$_director = ( play, ... order ) => publisherPlayer ( ... order );

}

$delete ( play ) {

const note = this;
const { stamp } = note;
const { location, player } = play ( stamp );
const { scenario: { $_content: notebook } } = player ( stamp );
const order = play ( Symbol .for ( 'order' ) );

notebook .splice ( order - 1, 1 );

delete notebook [ '$' + ( notebook .length + 1 ) ];

return true;

}

$move ( play, direction ) {

const note = this;
const { stamp } = note;
const { location, player } = play ( stamp );
const { scenario: { $_content: notebook } } = player ( stamp );

if ( ! notebook )
return false;

direction = parseInt ( direction );

const order = play ( Symbol .for ( 'order' ) );
const distance = Math .abs ( direction );

if ( ! notebook || note === undefined || order + direction < 1 || order + direction > notebook .length )
return false;

// When moving down
if ( direction > 0 )
notebook .splice ( order - 1, distance + 1, ... notebook .slice ( order, order + distance ), note );

// When moving up
else if ( direction < 0 )
notebook .splice ( order - distance - 1, distance + 1, note, ... notebook .slice ( order - distance - 1, order - 1 ) );

return true;

}

$_order ( play ) {

const { location } = play ( this .stamp );

return parseInt ( location [ location .length - 1 ] );

}

};
