<script setup lang="ts">
    import {onMounted, ref} from "vue"
    import axios from "axios"
    import api from "../services/api"
   

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

    

    onMounted(
        
       sendPokeInformations()
       
    )

</script>

<template>
    <main>
        <section class="card-pokemon flex rounded bg-blue-800">
            <div v-for="Pokemon in PokeInformations" :key="Pokemon" class="card-pokemon-content"> 
                <span class="text-3xl font-bold underline id">ID: {{Pokemon.id}}</span>
                <h3>{{Pokemon.name}}</h3>
                <img  :src=Pokemon.sprite alt="">
                <h4 class="text-3xl font-bold underline">TIPOS:</h4>
                <div class="types" v-for="tipos in Pokemon.types" :key="tipos">
                    <p> {{tipos.type.name}}</p>
                </div>         
            </div>
        </section>
    </main>
</template>

<style scoped>

</style>