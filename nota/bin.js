#!/usr/bin/env node

import Scenarist from 'scenarist.dev';
import Nota from 'scenarist.dev/nota';
import Shell from 'scenarist.dev/nota/shell';
import Directory from 'scenarist.dev/nota/directory';

const $ = Symbol .for;
const play = Nota .publish ( {

medium: new Shell,
directory: new Directory,
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
