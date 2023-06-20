import { readFile } from 'fs/promises';

const $ = Symbol .for;

export default {

async [ '$>' ] ( play, path ) {

if ( path .endsWith ( 'js' ) )
return play ( $ ( 'extension' ), await import ( path, { assert: { type: 'json' } } ) );

const { pilot: notaplay } = play ( this .stamp );

return notaplay ( 'json', path, '=', await readFile ( path, 'utf8' ) );

}

};
