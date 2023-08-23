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

    function getRandomNumber(min, max): number {
        let RamNum = Math.floor(Math.random() * (max - min) + min)
        return RamNum
    };
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
        for (let i = 0; i < 6; i++) {
            GetPokemons(getRandomNumber(1, 152))

        }
            console.log(PokeInformations.value)
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
    <main class="h-vh-80 flex flex-col justify-center items-center " >
        <section class="card-pokemon flex flex-wrap"> 
            <div v-for="Pokemon in PokeInformations" :key="Pokemon" class="card-pokemon-content relative w-44 h-72 bg-gray-300 m-2 rounded-md p-3 text-center ease-linear">
                <div class="pokemon-information ease-in duration-300">
                    <h3 class="font-bold text-lg">{{Pokemon.name}}</h3>
                    <img class="w-44 bg-gray-400 rounded-md my-4" :src=Pokemon.sprite alt="">
                    <h4 class="">TIPO:</h4>
                    <div class="types" v-for="tipos in Pokemon.types" :key="tipos">

                        <p v-show="(tipos.type.name==='normal')===true" class="bg-gray-400 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='fire')===true" class="bg-orange-500 mt-1 rounded">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='water')===true" class="bg-blue-500 mt-1 rounded">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='grass')===true" class="bg-green-600 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='flying')===true" class="bg-teal-400 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='bug')===true" class="bg-lime-500 mt-1 rounded">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='dragon')===true" class="bg-cyan-800 mt-1 rounded">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='electric')===true" class="bg-yellow-400 mt-1 rounded">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='ghost')===true" class="bg-indigo-700 mt-1 rounded">{{tipos.type.name}}</p> 
                        <p v-show="(tipos.type.name==='dark')===true" class="bg-neutral-600 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='fairy')===true" class="bg-pink-400 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='ice')===true" class="bg-teal-400 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='fighting')===true" class="bg-rose-700 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='psychic')===true" class="bg-pink-500 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='rock')===true" class="bg-orange-400 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='ground')===true" class="bg-orange-800 mt-1 rounded">{{tipos.type.name}}</p>                         
                        <p v-show="(tipos.type.name==='poison')===true" class="bg-purple-700 mt-1 rounded">{{tipos.type.name}}</p>                         
                         
                        
                    </div>
                </div>         
            </div>
        </section>
        <button v-on:click="regeneratePokeInformations()" class="absolute bottom-16 bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-900 hover:border-blue-700 rounded">
            Regenerate
        </button>
    </main>
</template>

<style scoped>
</style>