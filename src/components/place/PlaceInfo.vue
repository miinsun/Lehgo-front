<template>
  <v-container v-if="getPlace != null">
    <!-- (사용X) 이미지 슬라이더 -->
    <div v-show="false">
    <hooper v-if="getImgList.length != 0" >
        <slide class="hooperImg" v-for="img, i in getImgList" :key="i">
            <img :src="img">
        </slide>
        <navigation slot="hooper-addons"></navigation>
    </hooper>
    </div>
    <!-- (사용X) 이미지 슬라이더 -->

    <v-row>
        <v-col cols="4">
        <div class="mainImg my-5">
            <div class="placeImg rounded-circle" v-if="getImg1" :style="bgImg()"></div>
            <div class="noImg rounded-circle" v-if="!getImg1">
                <i class="far fa-image"></i>
            </div>
        </div>
        </v-col>
        <v-col cols="8">
        <div class="mainInfo my-5">
            <v-row>
                <v-col cols="10"> <div class="title">{{getPlace.placeName}}</div> </v-col>
                <v-col cols="2">
                    <i type="button" v-if="liked" @click="clickDislike()" class="fas fa-heart"></i>
                    <i type="button" v-if="!liked" @click="clickLike()" class="far fa-heart"></i>
                </v-col>
            </v-row>
            <div class="content">{{getPlace.content}}</div>
            <div class="in"><i class="fas fa-phone-alt"></i><span class="infoTitle">전화번호</span>{{getTel}}</div>
            <div class="in"><i class="far fa-clock"></i><span class="infoTitle">영업시간</span>{{getTime}}</div>
            <div class="in"><i class="fas fa-map-marker-alt"></i><span class="infoTitle">{{getPlace.address}}</span></div>
        </div>
        </v-col>
    </v-row>
    <div class="mt-5 text-left">
    </div>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions : placeMapActions, mapGetters : placeMapGetters } = createNamespacedHelpers("placeStore");
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
        liked : false
    }),
    methods: {
        bgImg() {
            return 'background-image : url("' + this.getImg1 + '");'
        },
        clickLike(){
            this.likePlace(this.getPlace.placeId);
            this.liked = true;
        },
        clickDislike(){
            this.dislikePlace(this.getPlace.placeId);
            this.liked = false;
        },
        ...placeMapActions(['setPlace', 'likePlace', 'dislikePlace'])
    },
    mounted(){
    },
    computed: {
        ...placeMapGetters(['getPlace', 'getImg1', 'getImgList', 'getTel', 'getTime']),
    },
    watch: {
        getPlace : function(){
            if(this.getPlace != null){
                this.liked = this.getPlace.liked
            }
        }
    }
  }
</script>

<style scoped>
.hooperImg img{
    border-radius: 5%;
    height : 30vh;
    width : 90%;
    /* margin-left: 6.5vw;
    margin-right: 8.5vw; */
}
.hooper{
    height : 50vh;
    width: 100%;
    /* margin-left: -2vw; */
}
.mainInfo{
    font-family: 'Noto Sans KR';
    color: #2699FB;
}
.mainInfo .title{
    font-weight: 900;
    color: #226AB3;
}
.mainInfo .content{
    font-size: 14px;
    font-weight: 700;
    margin: 5px 5px 15px 0px;
    padding-right: 10px;
    width : 100%;
    overflow: hidden;
    white-space : nowrap;
    text-overflow: ellipsis;
}
.mainInfo .in{
    margin: 3px 0px;
    font-size: 10px;
}
.infoTitle{
    margin: 0px 10px 0px 7px;
}
.placeImg{
    background-size: cover; 
    background-position: center; 
    width: 120px;
    height: 120px;
    box-sizing: content-box;
    border: #226AB3 solid 5px;
}
.noImg{
    background-color: lightgray;
    text-align: center; 
    width: 120px;
    height: 120px;
    box-sizing: content-box;
    border: #226AB3 solid 5px;
}
.noImg i{
    color: white;
    font-size: 50px;
    margin-top: 35px
}
</style>