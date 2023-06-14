import Scenarist from 'scenarist.dev';
import Directory from 'scenarist.dev/nota/directory';

export default class Composer extends Directory {

$nota ( play, ... title ) {

return play ( Symbol .for ( 'note' ), { content: [], title } );

}

$string ( play, ... content ) {

if ( ! ( content = content .join ( ' ' ) .trim () ) ?.length )
return false;

return play ( Symbol .for ( 'note' ), { content } );

}

};
