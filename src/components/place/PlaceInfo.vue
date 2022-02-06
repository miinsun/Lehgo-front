<template>
  <v-container>
    <v-row v-if="getPlace != null">
        <v-col cols="10 offset-1">
            <hooper v-if="getImgList.length != 0" >
                <slide class="placeImg" v-for="img, i in getImgList" :key="i">
                    <img :src="img">
                </slide>
                <navigation slot="hooper-addons"></navigation>
            </hooper>
            <div class="mt-5 text-left">
                <v-row>
                    <v-col cols="9 offset-1">
                        <h3>{{getPlace.PLACE_NAME}}</h3>
                        {{getPlace.ADDRESS}}
                    </v-col>
                    <v-col cols="1" class="pt-5">
                        <i type="button" v-if="liked" @click="clickDislike()" class="fas fa-heart"></i>
                        <i type="button" v-if="!liked" @click="clickLike()" class="far fa-heart"></i>
                    </v-col>
                </v-row>
                <v-row class="placeInfo">
                    <v-col cols="10 offset-1">
                    <div class="content" v-if="getPlace.TEL != ''">
                        <i class="fas fa-phone-alt"></i>
                        {{getPlace.TEL}}
                    </div>
                    <div class="content" v-if="getPlace.TIME != ''">
                        <i class="far fa-clock"></i>
                        {{getPlace.TIME}}
                    </div>
                    <div class="content" v-if="getPlace.CONTENT != ''">
                        <i class="far fa-comment-dots"></i>
                        {{getPlace.CONTENT}}
                    </div>
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters : placeMapGetters } = createNamespacedHelpers("placeStore");
const { mapGetters : ListMapGetters,  mapActions : ListMapActions } = createNamespacedHelpers("placeListStore");
import { Hooper, Slide, Navigation  } from 'hooper';
import 'hooper/dist/hooper.css';

  export default {
    name: 'PlaceInfo',
    components:{
        Hooper,
        Slide,
        Navigation
    },
    data: () => ({
    }),
    methods: {
        clickLike(){
            console.log("like")
            this.addLikedPlace(this.getPlace)
        },
        clickDislike(){
            console.log("dislike")
            this.removeLikedPlace(this.getPlace)
        },
        ...ListMapActions(['addLikedPlace', 'removeLikedPlace'])
    },
    mounted(){
    },
    computed: {
        liked : function() {
            for (let p in this.getLikedList){
                if(this.getPlace.PLACE_ID == this.getLikedList[p].PLACE_ID){
                    return true
                }
            }
            return false
        },
        likedButtonStyle : function() {
            if(this.liked){
                return "far fa-heart"
            }
            else{
                return "fas fa-heart"
            }
        },
        ...placeMapGetters(['getPlace', 'getImgList']),
        ...ListMapGetters(['getLikedList'])
    }
  }
</script>

<style scoped>
.placeImg img{
    border-radius: 5%;
    height : 30vh;
    width : 20vw;
    /* margin-left: -50px; */
    margin-left: 6.5vw;
    margin-right: 8.5vw;
}
.hooper{
    height : 30vh;
    width : 35vw;
    margin-left: -2vw;
}
i{
    margin-right: 10px;
}
.content{
    margin-bottom: 5px;
    font-size: 14px;
}
</style>