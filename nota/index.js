import Scenarist from 'scenarist.dev';
import Directory from 'scenarist.dev/nota/directory';
import Navigation from './navigation.js';

export default class Nota {

constructor ( { content, title, directory } ) {

Object .assign ( this, { content, title, directory } );

}

$_producer ( play, { stamp } ) {

const nota = this;
const directory = Scenarist ( nota .directory, {

stamp: ( nota .stamp = stamp ),
pilot: play

} );

nota .$_director = ( play, ... order ) => directory ( ... order );

if ( typeof nota .content !== 'object' || ! nota .content )
return nota .$_content = nota .content;

nota .$_content = [];

const keys = Object .keys ( nota .content );

if ( keys .length )
for ( const key of keys )
play ( Symbol .for ( 'note' ), { 

content: nota .content [ key ],
title: nota .content instanceof Array ? undefined : key

 } );

}

$title ( play, ... title ) {

this .$_title = title .join ( ' ' ) .trim ();

return play ();

}

get $size () { return this .$_content .length }

$_note ( play, { content, title, directory } ) {

const { scenario: nota } = play ( this .stamp );
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

static publish ( { directory, content } ) {

const Nota = this;
const stamp = Symbol ( 'scenarist.dev/nota' );
const play = Scenarist ( new Nota ( { directory, content } ), { stamp } );

return play;

}

};
