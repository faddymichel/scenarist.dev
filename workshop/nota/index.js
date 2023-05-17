import Scenarist from 'scenarist.dev';
import Shell from './shell.js';
import Nota from './scenario/index.js';

const stamp = Symbol .for ( 'nota/stamp' );
const nota = new Nota ( { stamp } );
const shell = new Shell ( { stamp, scenario: nota } );
const play = Scenarist ( shell, { stamp } );

play ( Symbol .for ( 'interact' ) );
