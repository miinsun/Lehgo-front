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
    <v-row class="placeInfoContainer">
        <v-col cols="3" v-if="titleImg">
            <div :class="getFirstCategory + '-border placeImg'" v-if="getImg1" :style="bgImg()"></div>
            <div :class="getFirstCategory + '-border noImg'" v-if="!getImg1">
                <i class="far fa-image"></i>
            </div>
        </v-col>
        <v-col :cols="infoCols">
        <div class="mainInfo ml-3">
            <v-row class="mr-5">
                <v-col cols="10"> <div class=" placeTitle">{{getPlace.placeName}}</div> </v-col>
                <v-col cols="1" :class="getFirstCategory + '-text placeButton'">
                    <div>
                    <v-menu offset-y v-model="folderMenu" :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <button v-bind="attrs" v-on="on">
                            <i class="far fa-bookmark" v-if="!isInMyFolder"></i>
                            <i class="fas fa-bookmark" v-if="isInMyFolder"></i>
                        </button>
                    </template>
                    <v-list>
                        <v-list-item v-for="(folder, index) in getFolderList" :key="index" @click="addPlaceToFolderBtn(folder.folderId)">
                        <v-list-item-title v-text="folder.folderName"></v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="!newFolder" @click="newFolder = true">
                                <v-list-item-title><i class="fas fa-plus mr-3"></i>폴더 추가</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="newFolder">
                            <v-text-field v-model="folderName" class="mb-5 mx-2" color="#226AB3" 
                                hide-details="auto" maxlength="10" size="10" required label="이름"></v-text-field>
                            <v-btn text @click="addFolderBtn()">추가</v-btn>
                        </v-list-item>
                    </v-list>
                    </v-menu>
                </div>
                </v-col>
                <v-col cols="1" :class="getFirstCategory + '-text placeButton'">
                    <i type="button" v-if="liked" @click="clickDislike()" class="fas fa-heart"></i>
                    <i type="button" v-if="!liked" @click="clickLike()" class="far fa-heart"></i>
                </v-col>
            </v-row>
            <v-row>
            <div class="content">{{getPlace.content}}</div>
            <v-menu offset-y :close-on-content-click="false" v-if="getPlace.content && getPlace.content.length > 20" >
            <template v-slot:activator="{ on, attrs }">
                <i type="button"  class="fas fa-caret-down mt-2" v-bind="attrs" v-on="on"></i>
            </template>
            <v-list>
                {{getPlace.content}}
            </v-list>
            </v-menu>
            </v-row>
            <div class="in"><i class="fas fa-phone-alt"></i><span class="infoTitle">전화번호</span>{{getTel}}</div>
            <v-row class="pa-3">
                <div class="in placeTime"><i class="far fa-clock"></i><span class="infoTitle">영업시간</span>{{getPlace.time}}</div>
                <v-menu offset-y :close-on-content-click="false" v-if="getPlace.time && getPlace.time.length > 30" >
                <template v-slot:activator="{ on, attrs }">
                    <i type="button"  class="fas fa-caret-down mt-2" v-bind="attrs" v-on="on"></i>
                </template>
                <v-list>
                    {{getPlace.time}}
                </v-list>
                </v-menu>
            </v-row>
            <div class="in"><i class="fas fa-map-marker-alt"></i><span class="infoTitle">{{getPlace.address}}</span></div>
        </div>
        <v-chip-group column class="ml-5 mt-3">
            <v-chip outlined small v-for="category in getCategory" :key="category" :class="categoryText(category) + '-chip-1'"> {{ category }}</v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="1" v-if="infoCols==8" class="morePlaceInfo text-center">
            <a :href="'http://localhost:8081/place?pId=' + getPlace.placeId">
            <svg class="mb-2" width="43" height="25.705" viewBox="0 0 43 25.705">
            <path d="M11.148,0,8.811,2.337l8.846,8.846H-19v3.338H17.657L8.811,23.368,11.148,25.7,24,12.852Z" transform="translate(19)" :class="getFirstCategory + '-fill'"/>
            </svg>
            </a>
            더보기
        </v-col>
    </v-row>
    <v-snackbar v-model="isPlaceAdded">
        <div class="text-center snackContent">추가되었습니다.</div>
    </v-snackbar>
    <div class="mt-5 text-left">
    </div>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions : placeMapActions, mapGetters : placeMapGetters } = createNamespacedHelpers("placeStore");
const { mapGetters : folderGetters , mapActions : folderActions } = createNamespacedHelpers("folderStore");
const { mapGetters : courseGetters , mapActions : courseActions } = createNamespacedHelpers("courseStore");

import { Hooper, Slide, Navigation  } from 'hooper';
import 'hooper/dist/hooper.css';

  export default {
    name: 'PlaceInfo',
    props: ['infoCols', 'titleImg'],
    components:{
        Hooper,
        Slide,
        Navigation
    },
    data: () => ({
        liked : false,
        folderMenu : false,
        newFolder : false,
        newCourse : false,
        folderName : '',
        isPlaceAdded : false,
        isInMyFolder : false
    }),
    methods: {
        categoryText(category){
            if(category == '카페/디저트/술'){
                return '카페'
            }
            else return category
        },
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
        addFolderBtn(){
          this.addFolder(this.folderName);
          this.newFolder = false;
          this.folderName = '';
        },
        addPlaceToFolderBtn(folderId){
            this.addPlaceToFolder(folderId);
            this.folderMenu = false;
            this.isPlaceAdded = true;
            setTimeout(() => this.isPlaceAdded = false, 1500);
            this.isInMyFolder = true;
        },
        addPlaceToCourseBtn(courseId){
            this.addPlaceToCourse(courseId);
            this.courseMenu = false;
            this.isPlaceAdded = true;
            setTimeout(() => this.isPlaceAdded = false, 1500);
        },
        ...folderActions(['setFolderList', 'addFolder']),
        ...courseActions(['setCourseList', 'addCourse']),
        ...placeMapActions(['setPlace', 'likePlace', 'dislikePlace', 'addPlaceToFolder', 'addPlaceToCourse']),
    },
    mounted(){
    },
    computed:{
      ...folderGetters(['getFolderList']),
      ...courseGetters(['getCourseList']),
      ...placeMapGetters(['getPlace', 'getImg1', 'getImgList', 'getTel', 'getTime', 'getCategory', 'getFirstCategory']),
    },
    watch: {
        getPlace : function(){
            if(this.getPlace != null){
                this.liked = this.getPlace.liked
                this.isInMyFolder = this.getPlace.isInMyFolder
            }
        }
    },
    created(){
      this.setFolderList()
      this.setCourseList()
    }
  }
</script>

<style scoped>
.placeInfoContainer{
    margin-bottom: -40px;
}
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
    margin-top: 10px;
}
.placeTitle{
    font-size: 30px;
    font-weight: 700;
    font-family: 'Noto Sans KR';
}
.mainInfo .content{
    font-size: 18px;
    font-weight: 700;
    margin: 0px -5px 30px 10px;
    padding-right: 10px;
    width : 90%;
    overflow: hidden;
    white-space : nowrap;
    text-overflow: ellipsis;
}
.mainInfo .in{
    margin: 2px 0px;
    font-size: 12px;
}
.infoTitle{
    margin: 0px 10px 0px 7px;
}
.placeImg{
    background-size: cover; 
    background-position: center; 
    width: 100%;
    padding-bottom: 100%;
    border-radius: 20px;
    box-sizing: content-box;
}
.noImg{
    background-color: lightgray;
    text-align: center; 
    width: 100%;
    height: 100%;
    border-radius: 20px;
    box-sizing: content-box;
    border: lightgray solid 5px !important;
}
.noImg i{
    color: white;
    font-size: 3vw;
    line-height: 10vw;
}
.savePlaceArea i {
    margin-right: 5px;
}
.placeTime{
    width : 250px;
    overflow: hidden;
    white-space : nowrap;
    text-overflow: ellipsis;
}
.addMessage{
    color: #226AB3;
}
.addMessage-enter-active, .addMessage-leave-active {
  transition: opacity .5s;
}
.addMessage-enter, .addMessage-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.morePlaceInfo{
    padding-top: 10%;
    font-size: 16px;
    padding-left: 0px;
    margin-left: -10px;
    font-family: 'Noto Sans KR';
}
.placeButton{
    font-size: 19px;
}
</style>