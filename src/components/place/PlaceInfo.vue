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
    <div class="savePlaceArea">
        <div>
            <v-menu offset-y v-model="folderMenu" :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="white" depressed v-bind="attrs" v-on="on"><i class="far fa-plus-square"></i>폴더에 추가</v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(folder, index) in getFolderList" :key="index" @click="addPlaceToFolderBtn(folder.folderId)">
                <v-list-item-title v-text="folder.folderName"></v-list-item-title>
                </v-list-item>
                <v-list-item v-if="!newFolder" @click="newFolder = true">
                        <v-list-item-title><i class="fas fa-plus mr-3"></i> 폴더 추가</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="newFolder">
                    <v-text-field v-model="folderName" class="mb-5 mx-2" color="#226AB3" 
                        hide-details="auto" maxlength="10" size="10" required label="이름"></v-text-field>
                    <v-btn text @click="addFolderBtn()">추가</v-btn>
                </v-list-item>
            </v-list>
            </v-menu>
            <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="white" depressed v-bind="attrs" v-on="on"><i class="far fa-plus-square"></i>코스에 추가</v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(course, index) in getCourseList" :key="index" link @click="addPlaceToCourseBtn(course.courseId)">
                <v-list-item-title v-text="course.courseName"></v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
        </div>
        <transition name="addMessage">
        <div class="addMessage my-2 ml-5" v-if="isPlaceAdded">추가되었습니다.</div>
        </transition>
    </div>
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
        ...placeMapGetters(['getPlace', 'getImg1', 'getImgList', 'getTel', 'getTime']),
    },
    watch: {
        getPlace : function(){
            if(this.getPlace != null){
                this.liked = this.getPlace.liked
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
.savePlaceArea i {
    margin-right: 5px;
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
</style>