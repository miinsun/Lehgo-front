<template>
  <v-container>
    <transition name="container">
        <hooper v-if="loaded" class="text-center my-10" id="hooper">
            <slide>
                <v-row>
                <v-col cols="12" class="my-10">
                    <h2 class="display-1 font-weight-bold">
                    선호하는 음식은?
                    </h2>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="5" class="mx-auto">
                    <v-checkbox color="orange" label="1" v-model="checked1"></v-checkbox>
                    <v-checkbox color="orange" label="2"></v-checkbox>
                    <v-checkbox color="orange" label="3" ></v-checkbox>
                    <v-checkbox color="orange" label="4"></v-checkbox>
                    <v-checkbox color="orange" label="5"></v-checkbox>
                </v-col>
                </v-row>
            </slide>
            <slide>
                <v-row>
                <v-col cols="12" class="my-10">
                    <h2 class="display-1 font-weight-bold">
                    선호하는 스타일은?
                    </h2>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="5" class="mx-auto">
                    <v-checkbox color="orange" label="1" v-model="checked2"></v-checkbox>
                    <v-checkbox color="orange" label="2"></v-checkbox>
                    <v-checkbox color="orange" label="3"></v-checkbox>
                    <v-checkbox color="orange" label="4"></v-checkbox>
                    <v-checkbox color="orange" label="5"></v-checkbox>
                </v-col>
                </v-row>
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
    </transition>
    <v-row>
        <v-col cols="5 mx-auto">
            <v-btn block elevation="3" color="orange lighten-1" 
                x-large @click="submit" class="font-weight-bold" :disabled="checked1 == '' || checked2 == ''">SUBMIT</v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Hooper, Slide, Navigation  } from 'hooper';
import 'hooper/dist/hooper.css';

  export default {
    name: 'Survey',
    data: () => ({
        loaded : false,
        checked1 : '',
        checked2 : ''
    }),
    components: {
        Hooper,
        Slide,
        'hooper-navigation' : Navigation 
    },
    validators: {
    },
    computed :{
    },
    methods: {
        submit: function() {
            this.$router.push({
                name: 'Main'
            })
        }
    },
    mounted(){
        this.loaded = true
    },
    created(){
    }
  }
</script>

<style scoped>
.container-enter-active, .container-leave-active {
  transition: opacity .5s;
}
.container-enter, .container-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#hooper{
    height:67vh
}
</style>