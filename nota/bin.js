#!/usr/bin/env node

import Scenarist from 'scenarist.dev';
import Nota from 'scenarist.dev/nota';
import Shell from 'scenarist.dev/nota/shell';
import Composer from './composer.js';
import Editor from './editor.js';
import $export from './export.js';

Nota .publish ( {

directory: new Shell ( {

directions: {

$new: new Composer (),
$edit: new Editor (),
$export

}

} ),
content: [

'Yallah?',
'Salah Abdallah!'

]

} );
