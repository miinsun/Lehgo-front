<template>
    <v-row>
        <v-col cols="1">
          <draggable class="list-group" group="mainCourse" >
            <!-- <transition-group type="transition" > -->
            <i class="far fa-trash-alt"></i>
            <!-- </transition-group> -->
          </draggable>
        </v-col>
        <v-col cols="8"  class="text-left">
        <draggable class="list-group" group="mainCourse" :list="list" @change="updateMainCourse">
            <!-- <transition-group type="transition" > -->
            <v-btn text class="list-group-item"  v-for="e, i in list" :key="'mainCourse' + i">
                {{e.place.placeName}}
            </v-btn>
            <!-- </transition-group> -->
        </draggable>
        </v-col>
    </v-row>
</template>

<script>
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from "vuex";
const { mapActions : userMapActions } = createNamespacedHelpers("userStore");
const { mapGetters : courseMapGetters, mapActions : courseMapActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'MainNav',
    components:{
        draggable
    },
    data: () => ({
      userInfo : '',
      list : [],
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
      updateMainCourse(){
        this.setPlaceList(this.list);
      },
      ...userMapActions(['postLogout']),
      ...courseMapActions(['addPlaceList', 'setPlaceList'])
    },
    computed:{
        ...courseMapGetters(['getPlaceList'])
    },
    mounted(){
        this.list = this.getPlaceList
    },
    watch : {
    }
  }
</script>

<style scoped>
.menuBtn {
  background-color:white;
}
#menu{
    margin-top: -20px;
}
.list-group{
  padding: 10px
}
</style>