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
    }
    // função para gerar numeros aleatorios sem repetição
    function generateUniqueRandomNumbers(min, max, count) : Array<number> {  //'min' para o menor numero, 'max' para o maior numero e 'count' para a qunatidade de numeros
        if (max - min + 1 < count) { 
            throw new Error("Interval is too small to generate unique numbers.");
        }

        const uniqueNumbers = new Set();
        
        while (uniqueNumbers.size < count) {   //looping para adionar os valores ao array 'uniqueNumbers'
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; //gerando e deixando o numero inteiro
            uniqueNumbers.add(randomNumber);    //adicionando ao array
        }
        
        return Array.from(uniqueNumbers);
    }
    // função para enviar os dados dos pokemons para a variavel que será exibida
    const GetPokemons = (id) : void => 
        api.get(`${id}`).then((response) => {  //usando o parametro da função 'id' como parametro do endpoint
            var data = response.data // amazenando os valores retornados da api

            const poke = new Pokemon // instanciando a classe
            //criando o objeto
            poke.name = data.name
            poke.id = id
            poke.types = data.types
            poke.sprite = data.sprites.front_default   

            PokeInformations.value.push(poke) //enviando o objeto para a variavel
        })
    //função para pegar os ids do parametro da função 'GetPokemons'
    function sendPokeInformations() : void {
        let ids : Array<number> = generateUniqueRandomNumbers(1, 152, 6)
        for (let i = 0; i < ids.length ; i++) {
            GetPokemons(ids[i])
        }
        // console.log(PokeInformations.value)
    }
    //função para ativar a animação de carta virando
    function flipCard(name) : void {
        let nameElement : Element = document.querySelector(`#${name}`)
        nameElement.classList.add("fliped")
    }
    //função para virar todas as cartas de uma vez
    function flipAllCards() : void {
        let allCards : Element = document.querySelectorAll('.card-pokemon-content')
        allCards.forEach(element => {
            element.classList.add("fliped")
        });
    }
    //função para gerar todos os pokemons novamente
    function regeneratePokeInformations() : void {
        //vira as cartas antes de gerar novamente
        let allCards : Element = document.querySelectorAll('.card-pokemon-content')
        allCards.forEach(element => {
            element.classList.remove("fliped")
        });
        //regera as cartas após serem viradas
        setTimeout(() => {
            window.location.reload(true);
        }, "800");
    }
    
    //função a serem ativadas após o componente ser carregado
    onMounted(
        sendPokeInformations() 
    )

</script>

<template>
    <main class="h-vh-90 flex flex-col justify-center items-center ">
        <button v-on:click="flipAllCards()" class="absolute flex items-center bottom-16 bg-blue-700 top-1/4 h-2 text-white font-bold border-b-4 border-blue-800 py-2 px-4 rounded">Show All</button>
        <section class="card-pokemon flex flex-wrap select-none"> 
         <div v-for="Pokemon in PokeInformations" :key="Pokemon" v-on:click="flipCard(Pokemon.name)" :id="Pokemon.name" class="flip card-pokemon-content ease-in duration-700 w-44 h-80 mx-2 relative text-center ease-linear">
                <div id="card-hidder"  class="w-full h-full z-10 absolute bg-gray-300 left-0 cursor-pointer rounded-md flex justify-center items-center border-4 border-blue-700 shadow-xl shadow-gray-400">
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
                        <p v-show="(tipos.type.name==='bug')===true" :id="tipos.type.name" class="border-lime-500 border-2 bg-white mt-1 rounded cursor-pointer">{{tipos.type.name}}</p> 
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