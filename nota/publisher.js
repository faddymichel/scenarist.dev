import Scenarist from 'scenarist.dev';
import Nota from 'scenarist.dev/nota';

export default function publish ( { stamp, pilot, directory } ) {

pilot = pilot || Scenarist ( new Nota ( { stamp } ), { stamp } );

const { scenario: nota } = pilot ( stamp );

nota .$_director = Scenarist ( directory, { stamp, pilot } );

return pilot;

};
