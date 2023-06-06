import Scenarist from 'scenarist.dev';
import Directory from 'scenarist.dev/nota/directory';

export default class Composer extends Directory {

$nota ( play, title ) {

return play ( Symbol .for ( 'note' ), { content: [], title } );

}

$string ( play, ... content ) {

if ( ! ( content = content .join ( ' ' ) .trim () ) ?.length )
return false;

return play ( Symbol .for ( 'note' ), { content } );

}

$_note ( play, { content, title, directory } ) {

const { pilot: notaplay } = play ( this .stamp );
const { scenario: nota } = notaplay ( this .stamp );
const { $_content: note } = nota;

if ( ! ( note instanceof Array ) )
return false;

const { constructor: Nota } = Object .getPrototypeOf ( nota );
const child = new Nota ( {

stamp: nota .stamp,
content,
title,
directory: directory || nota .directory

} );

const order = note .push ( child );

if ( typeof title === 'string' && title .length )
nota [ '$' + title ] = note [ order - 1 ];

Object .defineProperty ( nota, '$' + order, {

get: () => note [ order - 1 ],
configurable: true,
enumerable: true

} );

return order;

}

};
