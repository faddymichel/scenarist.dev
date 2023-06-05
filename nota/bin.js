#!/usr/bin/env node

import Scenarist from 'scenarist.dev';
import Nota from 'scenarist.dev/nota';
import Shell from 'scenarist.dev/nota/shell';
import Composer from './composer.js';
import Editor from './editor.js';
import $export from './export.js';

Nota .publish ( {

directions: {

$new: new Composer (),
$edit: new Editor (),
$export,
$_shell ( play ) {

const directory = this;

directory .$_shell = new Shell ( { stamp: directory .stamp } );

play ( Symbol .for ( 'shell' ) );

}

},
content: [

'Yallah?',
'Salah Abdallah!'

]

} );
