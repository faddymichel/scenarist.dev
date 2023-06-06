import Directory from 'scenarist.dev/nota/directory';

export default class Editor extends Directory {

$_producer ( play, production ) {

const { stamp } = production;
const { pilot: notaplay } = play ( stamp );
const { pilot } = notaplay ( stamp );

if ( notaplay !== pilot )
return super .$_producer ( play, production );

const { scenario: nota } = notaplay ( stamp );

nota .$edit = null;

}

$_director = undefined

$delete ( play ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { location, player } = notaplay ( stamp );

if ( ! player )
return false;

const { scenario: nota } = player ( stamp );
const { $_content: note } = nota;

if ( ! ( note instanceof Array ) )
return false;

const order = play ( Symbol .for ( 'order' ) );

note .splice ( order - 1, 1 );

delete nota [ '$' + ( note .length + 1 ) ];

return true;

}

$move ( play, direction ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { scenario: nota, location, player } = notaplay ( stamp );
const { scenario: { $_content: note } } = player ( stamp );

if ( ! note )
return false;

direction = parseInt ( direction );

const order = play ( Symbol .for ( 'order' ) );
const distance = Math .abs ( direction );

if ( ! note || nota === undefined || order + direction < 1 || order + direction > note .length )
return false;

// When moving down
if ( direction > 0 )
note .splice ( order - 1, distance + 1, ... note .slice ( order, order + distance ), nota );

// When moving up
else if ( direction < 0 )
note .splice ( order - distance - 1, distance + 1, nota, ... note .slice ( order - distance - 1, order - 1 ) );

return true;

}

$_order ( play ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { location } = notaplay ( stamp );

return parseInt ( location [ location .length - 1 ] );

}

};
