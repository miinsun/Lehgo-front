<template>
  <v-container>
    <div class="resultArea" v-bar>
      <div>
      <div class="noResult" v-if="getLoaded && getPlaceList && getPlaceList.length == 0">결과가 없습니다.</div>
      <v-progress-circular v-if="!getLoaded" :size="50" :width="7" indeterminate color="#2699fb"></v-progress-circular>
      <div v-for="p, i in getPlaceList" :key="'categoryPlace' + p.place.placeId">
        <v-hover v-slot="{ hover }">
        <v-sheet :class="'placeBtn ' + getHover(hover)" type="button" @click="clickedPlace(p.place)" outlined>
          <v-row>
            <v-col cols="3">
            <div :class="getCategory(p.place) + '-border placeImg'" v-if="p.place.img1" :style="'background-image : url(' + p.place.img1 + ');'"></div>
            <div :class="getCategory(p.place) + '-border noImg'" v-if="!p.place.img1"><i class="far fa-image"></i> </div>
            </v-col>
            <v-col cols="7">
            <div class="placeText">
              <div class="placeName">{{p.place.placeName}}</div>
              <div class="placeInfo">{{p.place.tel}}</div>
              <div class="placeInfo">{{p.place.address}}</div>
              <div class="placeInfo">{{p.place.time}}</div>
            </div>
            </v-col>
            <v-col cols="2">
            <div>
              <div :class="getCategory(p.place) + '-text buttonArea'">
              <v-row class="topButtonArea">
                 <v-checkbox v-if="showCheck" class="checkbox" v-model="selectedList" color="error" :value="p.place.placeId" hide-details></v-checkbox>
                <div class="folderBtn">
                <v-menu offset-y v-model="folderMenu[i]" :close-on-content-click="false" :key="'vMenu' + p.place.placeId">
                <template v-slot:activator="{ on, attrs }">
                    <i type="button" class="far fa-bookmark" v-bind="attrs" v-on="on"></i>
                </template>
                <v-list>
                    <v-list-item v-for="(folder, index) in getFolderList" :key="index" @click="addPlaceToFolderBtn(i, p.place, folder.folderId)">
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
                </div>
              </v-row>
              <v-btn :class="getCategory(p.place) + '-chip-1 courseBtn'" text smal @click="addPlaceToCourseBtn(p.place)">코스 추가</v-btn>
              </div>
            </div>
            </v-col>
          </v-row>
        </v-sheet>
        </v-hover>
        <v-divider></v-divider>
      </div>
      </div>
    </div>
    <v-snackbar v-model="isPlaceAdded">
        <div class="text-center snackContent">추가되었습니다.</div>
    </v-snackbar>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");
const { mapActions : listMapActions, mapGetters : listMapGetters } = createNamespacedHelpers("placeListStore");
const { mapGetters : folderGetters , mapActions : folderActions } = createNamespacedHelpers("folderStore");
const { mapGetters : courseGetters , mapActions : courseActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'PlaceList',
    props: ['showCheck'], 
    components:{
    },
    data: () => ({
      folderName : '',
      isPlaceAdded : false,
      folderMenu : [],
      selectedList : [],
      newFolder : false,
      keyword : '',
      list : null,
      selected : 0,
      items : ['전체', '이름', '주소', '설명']
    }),
    validators: {
      keyword : function (value) {
        return this.$Validator.value(value).required() 
      },
    },
    methods: {
      addFolderBtn(){
        this.addFolder(this.folderName);
        this.newFolder = false;
        this.folderName = '';
      },
      addPlaceToFolderBtn(index, place, folderId){
          this.addPlaceToFolder({place : place, fId : folderId});
          this.folderMenu[index] = false;
          this.isPlaceAdded = true;
          setTimeout(() => this.isPlaceAdded = false, 1500);
      },
      addPlaceToCourseBtn(place){
          this.addPlaceToCourse(place);
          this.isPlaceAdded = true;
          setTimeout(() => this.isPlaceAdded = false, 1500);
      },
      getCategory(place){
        if(place.attraction != null){
              return place.attraction.category.split(', ')[0]
            }
            else if(place.restaurant != null){
              if (place.restaurant.category.split(', ')[0] == '카페/디저트/술'){
                  return '카페'
              }
              else{
                  return place.restaurant.category.split(', ')[0]
              }
            }
        else{
          return ''
        }
      },
      getHover(hover){
        if(hover){
          return 'on-hover'
        }
      },
      bgImg(place) {
        return 'background-image : url("' + place.img1 + '");'
      },
      clickedPlace(place){
          this.setPlace(place);
      },
      ...placeMapActions(['setPlace']),
      ...folderActions(['setFolderList', 'addFolder', 'addPlaceToFolder']),
      ...courseActions(['setCourseList', 'addCourse', 'addPlaceToCourse']),
      ...listMapActions(['setListBySearchAll', 'setListBySearchName', 'setListBySearchArea', 'setListBySearchContent'])
    },
    mounted(){
      this.folderMenu = [false in this.getPlaceList.length]
    },
    computed: {
      ...folderGetters(['getFolderList']),
      ...courseGetters(['getCourseList']),
      ...listMapGetters(['getLoaded', 'getPlaceList'])
    },
    watch: {
      getPlaceList: function(){
        console.log(this.getPlaceList)
        this.list = this.getPlaceList
      },
      selectedList: function(){
        this.$emit('selectedList', this.selectedList);
      }
    }
  }
</script>

<style scoped>
.resultArea{
  height: 90vh;
  overflow: scroll;
}
.noResult{
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}
.placeImg{
  background-size: cover; 
  background-position: center;
  border-radius: 10px;
  width: 100%;
  height: 4.5vw;
  box-sizing: content-box;
  border: gray solid 5px;
}
.noImg{
  background-color: lightgray;
  text-align: center; 
  border-radius: 10px;
  width: 100%;
  height: 4.5vw;
  box-sizing: content-box;
  border: gray solid 5px;
}
.noImg i{
  color: white;
  font-size: 40px;
  line-height:  4.5vw;
}
.placeBtn{
  margin: 0.5vw 0.2vw;
  padding : 0.5vw 0.2vw;
  border-radius: 10px;
  border: 0;
  height: 6vw;
  transition: background-color .4s ease-in-out;
}
.placeBtn.on-hover {
  background: #e6e6e6;
}
.placeBtn:active{
  background: #b8b8b8;
}
.buttonArea{
  text-align: left;
  position: relative;
}
.folderBtn{
  position: absolute;
  right: 10px;
  font-size: 18px;
}
.courseBtn{
  position: absolute;
  margin-top: 3vw;
  right: 0.05vw;
  width: 4vw;
  font-size:0.7vw;
  font-family: 'Noto Sans KR';
}
.placeText{
  font-family: 'Noto Sans KR';
}
.placeName{
  width: 100%;
  text-align: left;
  font-size: 1.1vw;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  letter-spacing: 0.05em;
  overflow: hidden;
  white-space : nowrap;
  text-overflow: ellipsis;
}
.placeInfo{
  font-size: 0.6vw;
  text-align: left;
  width : 92%;
  overflow: hidden;
  white-space : nowrap;
  text-overflow: ellipsis;
}
.categoryTitle{
  color: white;
  line-height: 8.6vh;
  font-size: 40px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  background-size: contain;
  margin-left:3px;
  max-width: 100%;
  min-height: 8.6vh;
  margin-bottom: 10px;
}
.topButtonArea{
  margin-top: 10px;
}
.checkbox{
  position: absolute;
  top: 0px;
  right: 60px;
  width: 0px !important;
  height: 0px !important;
  min-width: 0px !important;
  min-height: 0px !important;
  margin: 0;
  padding: 0;
}
</style>