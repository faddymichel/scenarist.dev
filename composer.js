const $ = Symbol .for;

export default class Composer {

static parse ( ... definition ) {

const index = definition .indexOf ( '=' );
const title = definition .slice ( 0, index < 0 ? 0 : index );
const content = definition .slice ( index + 1 );

return { title, content };

}

$nota ( play, ... title ) {

return play ( $ ( 'nota' ), { content: [], title } );

}

$string ( play, ... definition ) {

let { title, content } = Composer .parse ( ... definition );

return ( content = Composer .string ( ... content ) ) === null ? false : play ( $ ( 'nota' ), { title, content } );

}

static string ( ... content ) {

return ( content = content .join ( ' ' ) .trim () ) ?.length ? content : null;

}

$number ( play, ... definition ) {

let { title, content } = Composer .parse ( ... definition );

return ( content = Composer .number ( ... content ) ) === null ? false : play ( $ ( 'nota' ), { title, content } );

}

static number ( ... content ) {

return isNaN ( content = parseFloat ( content .join ( '.' ) ) ) ? null : content;

}

$boolean ( play, ... definition ) {

let { title, content } = Composer .parse ( ... definition );

return ( content = Composer .boolean ( ... content ) ) === null ? false : play ( $ ( 'nota' ), { title, content } );

}

static boolean ( ... content ) {

switch ( content = content .join ( ' ' ) ) {

case 'true':
case 'ah':
case 'on':
case 'yes':
case '1':

content = true;

break;

case 'false':
case 'la':
case 'off':
case 'no':
case '0':

content = false;

break;

default:

content = null;

}

return content;

}

};
