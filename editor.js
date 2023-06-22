import Direction from 'nota.scenarist.dev/direction';

const $ = Symbol .for;

export default class Editor extends Direction {

$_producer ( play, production ) {

super .$_producer ( play, production );

const editor = this;
const { pilot, player } = production;

if ( pilot === player )
production .setting .scenario .$edit = null;

}

$delete ( play ) {

const { stamp } = this;
const { location, player } = play ( stamp );

if ( ! player )
return false;

const { scenario: nota } = player ( stamp );
const { $_content: note } = nota;

if ( ! ( note instanceof Array ) )
return false;

const order = play ( $ ( 'order' ) );

note .splice ( order - 1, 1 );

delete nota [ '$' + ( note .length + 1 ) ];
delete nota [ '$' + this .key ];

return true;

}

$move ( play, direction ) {

const nota = this;
const { stamp } = nota;
const { location, player } = play ( stamp );
const { scenario: { $_content: note } } = player ( stamp );

if ( ! note )
return false;

direction = parseInt ( direction );

const order = play ( $ ( 'order' ) );
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

$order ( play, order ) {

const old = play ( $ ( 'order' ) );
const direction = parseInt ( order ) - old;

if ( isNaN ( direction ) )
return false;

return play ( 'move', direction );

}

};
