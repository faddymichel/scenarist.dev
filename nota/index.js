#!/usr/bin/env node

import Scenarist from 'scenarist.dev';
import Shell from 'scenarist.dev/shell';
import Nota from './scenario/index.js';

const stamp = Symbol .for ( 'nota/stamp' );
const nota = new Nota ( { stamp } );
const shell = new Shell ( { stamp, scenario: nota } );
const play = Scenarist ( shell, { stamp } );

play ( Symbol .for ( 'interact' ) );
