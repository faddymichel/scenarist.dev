export default class Publisher {

#stamp

constructor ( stamp ) { this .#stamp = stamp }

$markdown ( play ) {

const publisher = this;
const stamp = publisher .#stamp;
const { player } = play ( stamp );
const { $_scenario: note } = player ( stamp );
const { $_content: content } = note;

if ( content instanceof Array )
for  ( const index in content )
player ( index + 1, 'publish' );

return publisher .publish ( note );

}

};
