import Scenarist from 'scenarist.dev';



const scenario = {
    $greet() {
        console.log("hello " + this.name)
    },
    name: "Hamada",
}
const play = Scenarist(scenario)
play("greet")