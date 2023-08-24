<script setup lang="ts">
    import {onMounted, ref} from "vue"
    import axios from "axios"
    import api from "../services/api"
import { clear } from "console";
   

    var PokeInformations = ref([])

    class Pokemon {
        name: string;
        id: number;
        types: Array<String>;
        sprite: string;

        /**
         *
         */
        constructor(name: string, id: number, types: Array<String>, sprite: string) {
            this.name = name;
            this.id = id;
            this.types = types;
            this.sprite = sprite;
        }
    }

    function generateUniqueRandomNumbers(min, max, count) {
        if (max - min + 1 < count) {
            throw new Error("Interval is too small to generate unique numbers.");
        }

        const uniqueNumbers = new Set();
        
        while (uniqueNumbers.size < count) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            uniqueNumbers.add(randomNumber);
        }
        
        return Array.from(uniqueNumbers);
    }
    const GetPokemons = (id) => 
        api.get(`${id}`).then((response) => {
            var data = response.data
            
            const poke = new Pokemon

            poke.name = data.name
            poke.id = id
            poke.types = data.types
            poke.sprite = data.sprites.front_default   

            PokeInformations.value.push(poke)
        })

    function sendPokeInformations() {
        let ids = generateUniqueRandomNumbers(1, 152, 6)
        for (let i = 0; i < ids.length ; i++) {
            GetPokemons(ids[i])

        }
        // console.log(PokeInformations.value)
    }
    function flipCard(name) {
        let nameElement = document.querySelector(`#${name}`)
        nameElement.classList.add("fliped")
    }
    function clearPokeInformations() {       
        PokeInformations.value = null
    }
    
    function regeneratePokeInformations() {
        window.location.reload(true);
    }
    

    onMounted(
        sendPokeInformations() 
    )

</script>

<template>
    <main class="h-vh-90 flex flex-col justify-center items-center " >
        <button class="absolute flex items-center bottom-16 bg-blue-700 top-28 h-2 text-white font-bold border-b-4 border-blue-800 py-2 px-4 rounded">Show All</button>
        <section class="card-pokemon flex flex-wrap  "> 
         <div v-for="Pokemon in PokeInformations" :key="Pokemon" v-on:click="flipCard(Pokemon.name)" :id="Pokemon.name" class="flip card-pokemon-content ease-in duration-300 w-44 h-80 mx-2 relative text-center ease-linear">
                <div id="card-hidder"  class="w-full h-full z-10 absolute bg-gray-300 left-0 rounded-md flex justify-center items-center border-4 border-blue-700 shadow-xl shadow-gray-400">
                    <img class="w-10" src="../assets/images/pokeball.png" alt="PokeBall">
                </div>
                <div id="pokemon-information" class=" ease-in duration-300 w-full h-full bg-gray-300 rounded-md p-3 shadow-md shadow-gray-400">
                    <h3 class="font-bold text-lg">{{Pokemon.name}}</h3>
                    <img class="w-44 bg-gray-400 rounded-md my-4" :src=Pokemon.sprite alt="">
                    <h4 class="">TIPO:</h4>
                    <div class="types" v-for="tipos in Pokemon.types" :key="tipos">
                        <p v-show="(tipos.type.name==='normal')===true" :id="tipos.type.name" class="border-gray-400 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='fire')===true" :id="tipos.type.name" class="border-orange-500 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='water')===true" :id="tipos.type.name" class="border-blue-500 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='grass')===true" :id="tipos.type.name" class="border-green-600 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='flying')===true" :id="tipos.type.name" class="border-blue-300 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='bug')===true" :id="tipos.type.name" class="border-lime-500 border- bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='dragon')===true" :id="tipos.type.name" class="border-cyan-800 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='electric')===true" :id="tipos.type.name" class="border-yellow-400 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='ghost')===true" :id="tipos.type.name" class="border-indigo-700 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='dark')===true" :id="tipos.type.name" class="border-neutral-600 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='fairy')===true" :id="tipos.type.name" class="border-pink-400 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='ice')===true" :id="tipos.type.name" class="border-teal-400 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='fighting')===true" :id="tipos.type.name" class="border-rose-700 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='psychic')===true" :id="tipos.type.name" class="border-pink-500 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='rock')===true" :id="tipos.type.name" class="border-orange-400 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='ground')===true" :id="tipos.type.name" class="border-orange-800 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='poison')===true" :id="tipos.type.name" class="border-purple-700 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p>                         
                             
                    </div>
                </div>         
            </div>
        </section>
        <button v-on:click="regeneratePokeInformations()" class="absolute bottom-16 bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-900 rounded">
            Regenerate
        </button>
    </main>
</template>

<style scoped>
    .card-pokemon-content {
        transform-style: preserve-3d;
    }

    .fliped {
        transform: rotateY(180deg);
    }
    #card-hidder, #pokemon-information {
        backface-visibility: hidden;
    }
    #pokemon-information {
        transform: rotateY(180deg);
    }
</style>