export default class Note {

constructor ( { stamp, content } ) {

this .stamp = stamp;
this .$_content = content;

}

$_director ( play ) { return this .$_content }

$delete ( play ) {

const note = this;
const { stamp } = note;
const { location, player } = play ( stamp );
const { scenario: { $_content: notebook } } = player ( stamp );
const order = play ( Symbol .for ( 'order' ) );

notebook .splice ( order - 1, 1 );

delete notebook [ '$#' + ( notebook .length + 1 ) ];

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

return parseInt ( location [ location .length - 1 ] .slice ( 1 ) );

}

$_complete ( play, input ) {

const { scenario, pilot } = play ( this .stamp );

return [ pilot ( Symbol .for ( 'directions' ), scenario, input ), input ];

}

$_prompt ( play ) {

return `#${ play ( this .stamp ) .location .map ( direction => direction .slice ( 1 ) ) .join ( '.' ) }: `

}

[ '$.' ] ( play ) {

return play;

}

};
