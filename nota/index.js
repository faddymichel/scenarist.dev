import Scenarist from 'scenarist.dev';
import Directory from 'scenarist.dev/nota/directory';
import Navigation from './navigation.js';

const $ = Symbol .for;

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

play ( $ ( 'structure' ) );

}

$_structure ( play ) {

const nota = this;

if ( typeof nota .content !== 'object' || ! nota .content )
return nota .$_content = nota .content;

nota .$_content = [];

const keys = Object .keys ( nota .content );

if ( keys .length )
for ( const key of keys )
play ( $ ( 'note' ), { 

content: nota .content [ key ],
title: nota .content instanceof Array ? undefined : key

 } );

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

Object .defineProperty ( nota, '$' + order, {

get: () => note [ order - 1 ],
configurable: true,
enumerable: true

} );

play ( order );

if ( title instanceof Array )
play ( order, 'edit', 'title', ... title );

return order;

}

$_prompt ( play ) { return play ( this .stamp ) .location .join ( '.' ) }

static publish ( { medium, directory, content } ) {

const Nota = this;
const play = Scenarist ( new Nota ( { directory, content } ) );

medium .play = play;

Scenarist ( medium );

return play;

}

};
