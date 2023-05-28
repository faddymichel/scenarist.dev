# Getting Scenarist

## Throught cloning

- clone scenarist repo
- create node_modules directory
- move repo inside node_modules
- create a package.json file, with appropriate configs, but with type equal to module.
- in your index.js, import scenarist: "import Scenarist from 'scenarist.dev';"

## Through NPM

- 



# Scenarist Terminology


## Scenarist

- scenarist takes a scenario, returns a play
- a play could go on directions that are defined inside a scenario
 

## Scenarios and Direction

- a direction is property of a scenario that starts with a $
- to understand what is a direction, let's create a simple scenario, define a direction inside the scenario called greet
```js
    const scenario = {
        $greet: "hello world"
    }
```
- then pass the scenario to a scenarist instance
```js
    const play = Scenarist(scenario)
```
- scenarist then could call this direction:
```js
    play("greet")
```
- this would return "hello world"
- when calling a direction remember to remove the dollar sign, the dollar sign only lets the scenario know that this is a direction.
- in this example this direction directs to a string "hello world", but directions could also direct to other primitives, functions, and objects.
- if a direction was a function:
```js
    const scenario = {
        $greet(play, name){
            console.log("hello " + name)
        }
    }
    const play = Scenarist(scenario)
    play("greet", "Abu Trika")
```

- if a direction was an object, then this direction becomes a new nested scenario, which can also accept directions, and so on:
```js
    const scenario = {
        $greet: {
            $english: "hello world",
            $arabic: "سلامه عليكم يا عالم",
        }
    }
    const play = Scenarist(scenario)
    console.log(play("greet", "arabic"))
```
- what if other non-direction properties were provided inside a scenario?
  - these properties are only accessible inside the scenario.
    ```js
        const scenario = {
            $greet(){
                console.log("hello " + this.name)
            },
            name: "Hamada",
        }
        const play = Scenarist(scenario)
        play("greet") // this would return "hello Hamada"
    ```
