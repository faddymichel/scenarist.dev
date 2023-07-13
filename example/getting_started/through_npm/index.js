import Scenarist from 'scenarist.dev';



const scenario = {
    $greet() {
        console.log("hello " + this.name)
    },
    name: "Hamada",
    $_x: 3,

}
const play = Scenarist(scenario)
console.log(play(Symbol.for("x")))