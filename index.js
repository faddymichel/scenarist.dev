import Scenarist from 'scenarist.dev';
import Directory from 'nota.scenarist.dev/directory';
import Editor from 'nota.scenarist.dev/editor';
import Composer from 'nota.scenarist.dev/composer';

const $ = Symbol .for;

export default class Nota {

constructor ( { content, title, directory } ) {

content = content || {};

Object .assign ( this, { content, title } );

}

directory = new Directory

extension = {

$compose: new Composer,
$edit: new Editor

}

$_producer ( play, production ) {

const nota = this;
const { pilot, stamp } = production;

nota .stamp = stamp;
nota .$_director = nota .directory;

play ( $ ( 'extension' ), nota .extension );

if ( typeof nota .$_content === 'object' )
Object .defineProperty ( nota, '$=', { value: null } );

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
play ( $ ( 'nota' ), { 

content: nota .content [ key ],
title: nota .content instanceof Array ? undefined : key .trim () .split ( /\s+/ )

} );

}

get $size () { return this .$_content .length }

$_nota ( play, details ) {

const nota = this;
const { content, title, directory } = details || {};
const { $_content: note } = nota;

if ( ! ( note instanceof Array ) )
return false;

const child = new ( details .Nota || Nota ) ( {

stamp: nota .stamp,
content,
title,
directory: ( directory || nota .directory ) || new Editor

} );

const order = note .push ( child );

Object .defineProperty ( nota, '$' + order, {

get: () => note [ order - 1 ],
configurable: true,
enumerable: true

} );

if ( title instanceof Array )
play ( order, '#', ... title );

return order + ( typeof child .key === 'string' && child .key ?.length ? ` ${ child .key }` : '' );

}

[ '$#' ] ( play, ... title ) {

const nota = this;
const { stamp } = nota;
const { player } = play ( stamp );
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

[ '$=' ] ( play, ... content ) {

const nota = this;

if ( ! content .length )
return nota .$_content;

return ( content = Composer [ typeof nota .$_content ] ( ... content ) ) === null ? false : ( nota .$_content = content );

}

$_order ( play ) {

const nota = this;
const { stamp } = nota;
const { player } = play ( stamp );
const { scenario: { $_content: note } } = player ( stamp );

return note .indexOf ( nota ) + 1;

}

$_location ( play ) {

const { pilot, location } = play ( this .stamp );

return location
.map ( ( direction, index ) => pilot ( ... location .slice ( 0, index + 1 ), $ ( 'order' ) ) )
.join ( '.' );

}

$_complete ( play, ... order ) {

const nota = this;
const { scenario } = play ( nota .stamp );

if ( typeof order [ 0 ] === 'string' && ! isNaN ( parseInt ( order [ 0 ] ) ) && order [ 0 ] .includes ( '.' ) )
return play ( order .shift (), $ ( 'complete' ), ... order );

if ( order .length > 1 ) {

const { scenario } = play ( order [ 0 ], nota .stamp );

if ( typeof scenario === 'function' && scenario [ $ ( 'playable' ) ] !== true )
return [];

else
return play ( order .shift (), $ ( 'complete' ), ... order );

}

const input = order .pop () || '';
const filtered = {};
const directions = [

... play ( $ ( 'directions' ), { input, filtered } ),
... ( play ( $ ( 'directions' ), {

input, filtered,
scenario: nota .$_director

} ) || [] )

];

return [ directions, input ];

}

$_directions ( play, { scenario, input, filtered } ) {

const { stamp } = this;

scenario = scenario !== undefined ? scenario : play ( stamp ) .scenario;

if ( ! scenario )
return [];

const descriptor = Object .getOwnPropertyDescriptors ( scenario );

filtered = typeof filtered === 'object' ? filtered : {};

return [

... Object .keys ( descriptor )
.filter ( direction => {

const filter = filtered [ direction ] !== true
&& direction ?.[ 0 ] === '$'
&& direction ?.[ 1 ] !== '_'
&& ( typeof descriptor [ direction ] .get === 'function' || ( descriptor [ direction ] .value !== undefined && descriptor [ direction ] .value !== null ) );

filtered [ direction ] = true;

return filter;

} )
.map ( direction => direction .slice ( 1 ) )
.filter ( direction => direction .startsWith ( input ) )
.map ( direction => direction + ' ' ),
... play ( $ ( 'directions' ), {

input, filtered,
scenario: Object .getPrototypeOf ( scenario )

} )

];

}

get $_prompt () { return this .$_location }

[ '$.' ] ( play, ... order ) {

return order .length ? play ( ... order ) : play;

}

[ '$..' ] ( play, ... order ) {

return ( play ( this .stamp ) .player || play ) ( '.', ... order );

}

[ '$~' ] ( play, ... order ) {

return play ( this .stamp ) .pilot ( '.', ... order );

}

[ '$?' ] ( play, ... query ) {

return play ( $ ( 'search' ), ... query )
.map ( play => play ( '$' ) )
.join ( '\n' );

}

$_search ( play, ... query ) {

const { title, $_content: note } = this;
let results = [];

switch ( typeof note ) {

case 'string':

query = query .join ( ' ' ) .toLowerCase ();

return note .toLowerCase () .includes ( query ) || ( title || '' ) .toLowerCase () .includes ( query ) ? [ play ] : [];

case 'number':

return note == parseFloat ( query .join ( '.' ) ) || title .toLowerCase () .includes ( query .join ( ' ' ) ) ? [ play ] : [];

case 'object':

if ( title ?.length && title .toLowerCase () .includes ( query .join ( ' ' ) ) )
results = [ ... results, play ];

else
note .forEach ( ( nota, index ) => ( results = [ ... results, ... play ( index + 1, $ ( 'search' ), ... query ) || [] ] ) )

}

return results;

}

$$ ( play ) {

const nota = this;
const { $_content: note } = nota;

if ( typeof note === 'object' && note .length )
return play ( $ ( 'location' ) )
+ ( nota .title ?.length ? ` ${ nota .title }` : '' )
+ ( note .length ? '\n' : '' )
+ note
.map ( ( note, index ) => play ( index + 1, '$' ) )
.join ( '\n' );

return `${ play ( $ ( 'location' ) ) }${

nota .title ?.length ? ` ${ nota .title }: ` : ''

}${ ( typeof note ?.toString === 'function' ? note : new String ( note ) ) .toString () }`;

}

static publish ( { medium, directory, content } ) {

const Nota = this;
const play = Scenarist ( new Nota ( { directory, content } ) );

medium .play = play;

Scenarist ( medium );

return play;

}

};
