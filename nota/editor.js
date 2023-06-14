import Directory from 'scenarist.dev/nota/directory';

export default class Editor extends Directory {

$_producer ( play, production ) {

const { stamp } = production;
const { pilot: notaplay } = play ( stamp );
const { scenario: nota, pilot } = notaplay ( stamp );

production .scenario = Object .create ( production .scenario );

if ( notaplay === pilot ) {

const editor = production .scenario;

for ( const direction of [ '$delete', '$move' ] )
editor [ direction ] = null;

}

return super .$_producer ( play, production );

}

$_director = undefined

$title ( play, ... title ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { scenario: nota, player } = notaplay (stamp );
const old = {

title: nota .title,
key: nota .key

};

nota .title = title .join ( ' ' ) .trim ();

if ( ! player )
return nota .title;

const { scenario: binder } = player ( stamp );

delete binder [ '$' + old .key ];

nota .key = title .join ( '-' ) .toLowerCase ();

binder [ '$' + nota .key ] = nota;

return nota .title;

}

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
