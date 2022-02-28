<template>
  <v-container>
    <!-- <div class="myPageList" v-bar>
      <div><v-timeline align-top dense >
          <v-timeline-item small v-for="(item, i) in getCoursePlaceList" :key="i" fill-dot>
          <v-card :color="item.color" dark >
            {{item.place.placeName}}
        </v-timeline-item>
      </v-timeline></div>
    </div> -->
    <div class="resultArea" v-bar>
      <div>
      <div class="noResult" v-if="getLoaded && getCoursePlaceList && getCoursePlaceList.length == 0">결과가 없습니다.</div>
      <v-progress-circular v-if="!getLoaded" :size="50" :width="7" indeterminate color="#2699fb"></v-progress-circular>
      <v-timeline align-center dense >
      <div v-for="p in getCoursePlaceList" :key="'categoryPlace' + p.place.placeId">
        <v-hover v-slot="{ hover }">
        <v-timeline-item :color="getColor(getCategory(p.place))">
        <v-sheet :class="'placeBtn ' + getHover(hover)" type="button" @click="clickedPlace(p.place)" outlined>
          <v-row>
            <div :class="getCategory(p.place) + '-border placeImg'" v-if="p.place.img1" :style="'background-image : url(' + p.place.img1 + ');'"></div>
            <div :class="getCategory(p.place) + '-border noImg'" v-if="!p.place.img1"><i class="far fa-image"></i> </div>
            <div class="placeText mx-2 mt-3">
              <div class="placeName">{{p.place.placeName}}</div>
              <div class="placeInfo">{{p.place.tel}}</div>
              <div class="placeInfo">{{p.place.address}}</div>
              <div class="placeInfo">{{p.place.time}}</div>
            </div>
            <!-- <div>
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
            </div> -->
          </v-row>
        </v-sheet>
        </v-timeline-item>
        </v-hover>
      </div>
      </v-timeline>
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
    name: 'TimelinePlaceList',
    props: ['showCheck'], 
    components:{
    },
    data: () => ({
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
                return place.restaurant.category.split(', ')[0]
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
      getColor(category){
          switch (category){
            case '액티비티': { return '#4BEF82'}
            case '힐링': { return '#FC178B'}
            case '바다': { return '#39C2FF'}
            case '문화': { return '#5D24FE'}
            case '포토스팟': { return '#FE9C00  '}
            case '식당': { return '#D059DE'}
            case '카페': { return '#FFE600 '}
            default: return '#DDDDDD'
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
      // this.folderMenu = [false in this.getCoursePlaceList.length]
    },
    computed: {
      ...folderGetters(['getFolderList']),
      ...courseGetters(['getCourseList']),
      ...listMapGetters(['getLoaded', 'getCoursePlaceList'])
    },
  }
</script>

<style scoped>
.resultArea{
  height: 80vh;
  overflow: scroll;
}
.noResult{
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}
.placeImg{
  margin: 10px 5px 10px 16px;
  background-size: cover; 
  background-position: center;
  border-radius: 10px;
  width: 25%;
  height: 4.5vw;
  box-sizing: content-box;
  border: gray solid 5px;
}
.noImg{
  margin: 10px 5px 10px 16px;
  background-color: lightgray;
  text-align: center; 
  border-radius: 10px;
  width: 25%;
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
  margin: 10px 2px;
  padding : 12px 5px;
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
  width: 5%;
  text-align: left;
  height: 90%;
  position: relative;
  margin-left: 90px;
}
.folderBtn{
  position: absolute;
  right: 20px;
  font-size: 18px;
}
.courseBtn{
  position: absolute;
  right: 10px;
  bottom: 0;
  width: 80px;
  font-family: 'Noto Sans KR';
}
.placeText{
  width: 55%;
  font-family: 'Noto Sans KR';
}
.placeName{
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  letter-spacing: 0.05em;
  overflow: hidden;
  white-space : nowrap;
  text-overflow: ellipsis;
}
.placeInfo{
  font-size: 11px;
  text-align: left;
  width : 100%;
  overflow: hidden;
  white-space : nowrap;
  text-overflow: ellipsis;
  margin-top: 2 px;
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
  right: 70px;
  width: 0px !important;
  height: 0px !important;
  min-width: 0px !important;
  min-height: 0px !important;
  margin: 0;
  padding: 0;
}
.액티비티-timeline .v-timeline-item__inner-dot .primary{
  background-color : #4BEF82 !important;
  border-color: #4BEF82 !important;
}
.힐링-timeline .v-application .primary{
  background-color : #FC178B !important;
}
.바다-timeline .v-application .primary{
  background-color : #39C2FF !important;
}
</style>