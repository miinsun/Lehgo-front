<template>
    <div class="myPageList" v-bar>
    <div>
      <v-list rounded>
        <v-list-item-group  color="orange" >
          <v-list-item>
            <v-list-item-content><v-list-item-title>여행지1</v-list-item-title></v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content><v-list-item-title>여행지2</v-list-item-title></v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content><v-list-item-title>여행지3</v-list-item-title></v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content><v-list-item-title>여행지4</v-list-item-title></v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    </div>
</template>

<script>

  export default {
    name: 'SearchList',

    data: () => ({
    }),
    methods: {
    },
  }
</script>

<style scoped>
.SearchList{
    overflow-y: scroll;
}
</style>