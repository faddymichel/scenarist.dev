export default function $export ( play ) {

const { pilot: notaplay } = play ( this .stamp );
const { scenario: nota, location } = notaplay ( this .stamp );
const { $_content: note } = nota;

if ( note === undefined )
return;

if ( [ 'string', 'number', 'boolean' ] .includes ( typeof note ) )
return `${ location .join ( ' ' ) } ${ typeof note } ${ note }`;

return `${ location .join ( ' ' ) } nota
${ note
.map ( ( note, index ) => notaplay ( index + 1, 'export' ) )
.join ( '\n' ) }`;

};
