const Punctuators = {
    '+': 'Operator',
    ',': 'Separator'
}

export default {
    $_director(play, token, output) {
        const type = Punctuators[token.value]
        play(type, token, output)
    },

    $Operator(play, token, output) {
        token.formattedValue = ' ' + token.value
        output.push(token)
    },
}

// TODO: add remaning punctuators