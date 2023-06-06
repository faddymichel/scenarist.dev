import Directory from 'scenarist.dev/nota/directory';

export default class Navigation extends Directory {

[ '$.' ] ( play, ... order ) {

const { pilot: notaplay } = play ( this .stamp );

return order .length ? notaplay ( ... order ) : notaplay;

}

[ '$..' ] ( play, ... order ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { player: notaPlayer } = notaplay ( stamp );

return ( notaPlayer || notaplay ) ( '.', ... order );

}

[ '$~' ] ( play, ... order ) {

const { stamp } = this;
const { pilot: notaplay } = play ( stamp );
const { pilot } = notaplay ( stamp );

return pilot ( '.', ... order );

}

};
