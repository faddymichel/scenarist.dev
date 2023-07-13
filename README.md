# Scenarist

Scenarist is a framework for orchestrating software. It assumes that everything is a play, and a user should define how this play works.

## How it works?

### Creating plays

- Scenarist creates plays. plays are used to run scenarios.
- To create a play, you need to define a scenario.
- Scenarios are simply objects or functions, and a play running this scenario interacts differently according to the scenario's type/properties.
- You can also pass some more info to Scenarist, production info, to have some more customizability over your play.
- Example for creating a play:

    ```js
        const MyScenario = {
            ...
        }

        const MyProduction = {
            ...
        }

        const play = Scenarist(MyScenario, MyProduction)
    ```

### Creating scenarios

- A scenario is an object or a function. a play handles the scenario differently according to its type.
- Object scenarios:
  - Object scenarios are simple objects, but with some special properties that the play tries to leverage.
  - These special properties are ordinary fields, whose names start with `$`. We will call those fields `directions`.
  - There are three types of directions:
    - ordinary directions. These directions' names must be a string or a number preceded by `$`.
  
        ```js
            const MyScenario = {
                $myDirection: {}
            }
        ```

    - symbol directions. These directions' names must be a string or a number preceded by `$_`.

        ```js
            const MyScenario = {
                $_mySymbolDirection: {}
            }
        ```

    - directors. A director's name must be `$_director`. Obviously, there can only be one director in your scenario.

        ```js
            const MyScenario = {
                $_director: {}
            }
        ```

  - Directions can be scenarios (objects or functions), or primitive values.
  
### Providing production info

- A production is simply a store for a play. It allows the play to work its magic with the provided scenario.
- A production consists of:
  - Play:
    - A play is the current play function.
  - Stamp:
    - A stamp is a value used to retrieve the production object from a play.
  
    ```js
        const MyScenario = {
            ...
        }

        const play = Scenarist(MyScenario, {stamp: 'mystamp'})
        const production = play('mystamp')
    ```

  - Scenario:
    - This is the provided scenario.

    ```js
        import { equal } from 'assert'
        
        const MyScenario = {
            ...
        }

        const play = Scenarist(MyScenario, {stamp: 'mystamp'})
        const production = play('mystamp')

        equal(MyScenario, production.scenario)
    ```

  - Location:
    - A location is a list of directions, ordered by access time.

    ```js
        import { deepEqual } from 'assert'
        const MyScneario = {
            $someDirection: {
                $nestedDirection: function(){
                    ...
                }
            }
        }

        const play = Scenarist(MyScenario, {stamp: 'mystamp'})
        const prod = play('someDirection', 'nestedDirection', 'mystamp')

        deepEqual(prod.location, ['someDirection', 'nestedDirection'])
    ```

  - Player:
    - A player is the parent play function.
  - Pilot:
    - A pilot is the root play function.
  - Setting:
    - A setting is a production object that the user could provide to extend the functionality of the play.

### Running plays

- A play runs according to its scenario, and its provided input.
- To retrieve a production object, pass the stamp to the play function.

    ```js
        const MyScenario = {
            ...
        }

        const play = Scenarist(MyScenario, {stamp: 'mystamp'})
        const production = play('mystamp')
    ```

- To access a direction in a scenario, pass the direction's name to the play function. if this direction is a function, the play function is passed to the direction, along with the remaining arguments passed to the play function.

    ```js
        const MyScenario = {
            $dir: function(play, arg1, arg2){
                console.log(arg1 + " ** " + arg2)
            }
        }

        const play = Scenarist(MyScenario)
        play('dir', 'val1', 'val2') // should log `val1 ** val2`
    ```
  
- To access a symbol direction in a scenario, pass a `Symbol` for the name of the direction.

    ```js
        const MyScenario =  {
            $_dir: function(play, arg1, arg2){
                console.log(arg1 + " ** " + arg2)
            }
        }
        
        const play = Scenarist(MyScenario)
        play(Symbol.for('dir'), 'val1', 'val2') // should log `val1 ** val2`
    ```

- If the provided direction is not present in the scenario, the play redirects the call to the director of the scenario, if any, with the arguments that was passed to the play.

    ```js
        const MyScenario = {
            $_director: function(play, arg1){
                console.log('The director sees this argument: ' + arg1)
            }
        }

        const play = Scenarist(MyScenario)
        play('non_present_direction') // should log `The director sees this argument: non_present_direction`
    ```
