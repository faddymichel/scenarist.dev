#!/usr/bin/env node

import Scenarist from 'scenarist.dev';
import Nota from 'scenarist.dev/nota';
import Shell from 'scenarist.dev/nota/shell';
import Navigation from 'scenarist.dev/nota/navigation';
import Composer from './composer.js';
import Editor from './editor.js';
import $export from './export.js';

const $ = Symbol .for;
const play = Nota .publish ( {

medium: new Shell,
directory: new Navigation (),
content: [

[

'Yallah?',
'Salah Abdallah!'

],
[

'koko wawa'

]

]

} );

play ( $ ( 'extension' ), {

$new: new Composer (),
$edit: new Editor (),
$export

} );
