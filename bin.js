#!/usr/bin/env node

import Scenarist from 'scenarist.dev';
import Nota from 'nota.scenarist.dev';
import Shell from 'shell.scenarist.dev';
import shell from './shell.js';

const $ = Symbol .for;
const play = Nota .publish ( {

medium: new Shell,
content: {

'Al Yallah': [

'Yallah?',
'Salah Abdallah!'

],
'Al Koko Wawa': [

'koko wawa'

]

}

} );

play ( $ ( 'extension' ), shell );
