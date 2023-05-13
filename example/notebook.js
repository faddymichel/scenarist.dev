export default class Notebook extends Array {

$notebook ( play, label ) {

const notebook = this;

if ( ! label ?.length || label .startsWith ( '#' ) || notebook [ '$#' + label ] )
return false;

notebook [ '$' + ( label = '#' + label ) ] = new Notebook ();

return label;

}

$note ( play, ... text ) {

if ( ! ( text = text .join ( ' ' ) ) ?.length )
return false;

const notebook = this;
const label = notebook .push ( text );

Object .defineProperty ( notebook, '$' + label, {

get: () => notebook [ label - 1 ],
configurable: true,
enumerable: true

} );

return label;

}

$delete ( play, label ) {

const notebook = this;
const note = notebook [ '$' + label ];

if ( ! note )
return false;

notebook .splice ( label - 1, 1 );

delete notebook [ '$' + notebook .length + 1 ];

return true;

}

$move ( play, label, direction ) {

label = parseInt ( label );
direction = parseInt ( direction );

const notebook = this;
const note = notebook [ '$' + label ];
const distance = Math .abs ( direction );

if ( note === undefined || label + direction < 1 || label + direction > notebook .length )
return false;

// When moving down
if ( direction > 0 )
notebook .splice ( label - 1, distance + 1, ... notebook .slice ( label, label + distance ), note );

// When moving up
else if ( direction < 0 )
notebook .splice ( label - distance - 1, distance + 1, note, ... notebook .slice ( label - distance - 1, label - 1 ) );

return true;

}

$print () {

return this .map ( ( note, index ) => `${ index + 1 }.   ${ note }` ) .join ( '\n' );

}

get $size () { return this .length }

};
