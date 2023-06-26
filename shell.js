import { readFile } from 'fs/promises';

const $ = Symbol .for;

export default {

async [ '$>' ] ( play, path ) {

if ( path .endsWith ( 'js' ) )
return play ( $ ( 'extension' ), await import ( path ) );

return play ( $ ( 'nota' ), {

title: [ path ],
content: JSON .parse ( await readFile ( path, 'utf8' ) )

} );

}

};
