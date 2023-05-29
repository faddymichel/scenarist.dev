#!/usr/bin/env node

import Scenarist from 'scenarist.dev';
import Nota from 'scenarist.dev/nota';
import Shell from 'scenarist.dev/nota/shell';

const stamp = Symbol ( 'scenarist.dev/nota' );
const play = Scenarist ( new Nota ( {

content: [

'Yallah?',
'Salah Abdallah!'

],
stamp,
publisher: new Shell ( { stamp } )

} ), { stamp } );
