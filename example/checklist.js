export default class Checklist {

$size = 0
$completed = 0

$item ( ... description ) {

const checklist = this;
const label = 'item-' + ++checklist .$size;

checklist [ '$' + label ] = {

$description: description .join ( ' ' ),
$status: 'unchecked'

};

return label;

}

$switch ( label ) {

const checklist = this;
const item = checklist [ '$' + label ];

if ( item ?.$status )
return item .$status = item .$status === 'checked' ? 'unchecked' : 'checked';

return false;

}

$checklist ( label ) {

const checklist = this;

if ( ! label )
return false;

checklist [ '$' + label ] = new Checklist ();

return label;

}

$delete ( label ) {

const checklist = this;
const item = checklist [ '$' + label ];

if ( ! item )
return false;

if ( item .$status )
checklist .$size--;

delete checklist [ '$' + label ];

return checklist .$size;

}

};
