#!/usr/bin/env node

import Scenarist from 'scenarist.dev';
import Nota from 'scenarist.dev/nota';
import Shell from 'scenarist.dev/nota/shell';

const stamp = Symbol ( 'scenarist.dev/nota' );

Scenarist ( new Nota ( {

stamp,
publisher: new Shell ( { stamp } )

} ), { stamp } ) ( Symbol .for ( 'interact' ) );
