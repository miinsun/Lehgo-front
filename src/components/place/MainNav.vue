<template>
    <v-row>
        <v-col cols="2" class="text-center"><h1 @click="goToMain">LEHGO</h1></v-col>
        <v-col cols="9">
            
        <draggable class="list-group" :list="list">
            <!-- <transition-group type="transition" > -->
            <v-btn text class="list-group-item" v-for="(e, i) in list" :key="i">
                {{e}}
            </v-btn>
            <!-- </transition-group> -->
        </draggable>
        </v-col>
        <v-col cols="1">
            <v-speed-dial id="menu" top right open-on-hover direction="bottom" transition="slide-y-transition" >
              <template v-slot:activator>
                <v-btn text fab><i class="fas fa-bars"></i></v-btn>
              </template>
              <v-btn text id="menuBtn" @click="logout">Logout</v-btn>
              <v-btn text id="menuBtn" @click="goToMyPage">My Page</v-btn>
            </v-speed-dial>
        </v-col>
    </v-row>
</template>

<script>
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("userStore");

  export default {
    name: 'MainNav',
    components:{
        draggable
    },
    data: () => ({
      userInfo : '',
      list : ['장소1', '장소2', '장소3', '장소4', '장소5',]
    }),
    methods: {
      logout() {
        this.postLogout(this.getUserId)
        .then(() => {
            this.$router.push({
            name: 'Login'
            })
        })
      },
      goToMain(){
        this.$router.push({
            name: 'Main'
        })
      },
      goToMyPage(){
        this.$router.push({
            name: 'MyPage'
        })
      },
      ...mapActions(['postLogout'])
    },
  }
</script>

<style scoped>
#menuBtn {
  background-color:white;
}
#menu{
    margin-top: -20px;
}
</style>