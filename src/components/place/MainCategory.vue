<template>
  <v-container>
    <v-row>
        <v-col cols="4">관광
          <v-card elevation="0">TEST 1</v-card>
          <v-card elevation="0">TEST 1</v-card>
          <v-card elevation="0">TEST 1</v-card>
          <v-card elevation="0">TEST 1</v-card>
        </v-col>
        <v-col cols="4">맛집
          <v-card elevation="0">TEST 2</v-card>
          <v-card elevation="0">TEST 2</v-card>
          <v-card elevation="0">TEST 2</v-card>
          <v-card elevation="0">TEST 2</v-card>
        </v-col>
        <v-col cols="4">바다
          <v-card elevation="0">TEST 3</v-card>
          <v-card elevation="0">TEST 3</v-card>
          <v-card elevation="0">TEST 3</v-card>
          <v-card elevation="0">TEST 3</v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'MainCategory',

    data: () => ({
    }),
    methods: {
    },
    mounted(){
    },
    computed:{
    }
  }
</script>

<style scoped>
div.v-card{
  height: 40px;
  line-height: 40px;
  margin: 10px 0px;
  background-color: rgb(231, 231, 231);
}
</style>