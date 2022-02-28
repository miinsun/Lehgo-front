<template>
    <div>
    <v-snackbar v-model="deletePlaceStatus">
      <div class="text-center">삭제되었습니다.</div>
    </v-snackbar>
    <v-overlay class="overlay" :z-index="zIndex" :value="overlay" >
      <v-card color="white" elevation="2">
        <v-card-text>정말 폴더를 삭제하시겠습니까?</v-card-text>
      <v-btn class="mx-2" color="#226AB3" @click="deleteFolderBtn()">삭제</v-btn>
      <v-btn class="mx-2" color="#226AB3" text @click="overlay = false">취소</v-btn>
      </v-card>
    </v-overlay>
    <v-row class="editFolder">
      <v-col cols="7 offset-1">
        <v-text-field color="white" v-if="editFolderStatus" v-model="newFolderName" placeholder="새로운 폴더 이름을 입력하세요"
          hide-details="auto" maxlength="10" required></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn v-if="editFolderStatus" text @click="editFolderBtn()"><i class="far fa-check-circle"></i></v-btn>
        <v-btn v-if="!editFolderStatus" text @click="editFolderStatus = true"><i class="far fa-edit"></i></v-btn>
      </v-col>
      <v-col cols="2">
         <v-btn text @click="overlay = !overlay"><i class="far fa-trash-alt"></i></v-btn>
      </v-col>
    </v-row>
    <v-row class="deletePlace">
      <v-col cols="2 offset-10">
         <v-btn text @click="deletePlace()"><i class="far fa-trash-alt"></i></v-btn>
      </v-col>
    </v-row>
    <PlaceList class="placeListArea" :showCheck="true" @selectedList="changeSelectedList"/>
    </div>
</template>

<script>
import PlaceList from '.././placeList/placeList'
import { createNamespacedHelpers } from "vuex";
const { mapActions : folderActions } = createNamespacedHelpers("folderStore");
const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'FolderPlaceList',

    data: () => ({
      zIndex : 1000,
      overlay : false,
      editFolderStatus : false,
      deletePlaceStatus : false,
      newFolderName : '',
      selectedList : []
    }),
    components:{
      PlaceList
    },
    methods: {
        bgImg(place) {
            return 'background-image : url("' + place.img1 + '");'
        },
        clickedPlace(place){
            this.$emit('clickedPlace', place);
        },
        editFolderBtn(){
          this.editFolder(this.newFolderName)
          this.editFolderStatus = false;
          this.$router.go();
        },
        deleteFolderBtn(){
          this.deleteFolder()
          this.setFolderList()
          this.overlay = false;
          this.$router.go();
        },
        changeSelectedList(list){
          this.selectedList = list;
        },
        deletePlace(){
          for(let i in this.selectedList){
            this.deletePlaceFromFolder(this.selectedList[i])
          }
          this.deletePlaceStatus = true;
          setTimeout(() =>(this.deletePlaceStatus = false), 1000);
        },
        ...listMapActions(['editFolder', 'deleteFolder', 'deletePlaceFromFolder']),
        ...folderActions(['setFolderList'])
    },
    computed:{
      ...listMapGetters(['getLoaded', 'getPlaceList'])
    },
    mounted() {
    }
  }
</script>

<style scoped>
.placeList{
  height: 85vh;
  overflow: auto;
  overflow-y: scroll;
}
.v-input>>> input{
  font-size: 15px;
  color: white;
}
.v-input>>> input::placeholder{
  font-size: 15px;
  color: rgba(255, 255, 255, 0.356);
}
.v-text-field{
  padding-top: 0px;
}
.v-btn.v-size--default{
  min-width: 20px;
}
.v-card {
  width: 300px;
  height: 170px;
  text-align: center;
}
.v-card .v-card__text{
  padding: 50px 0px 30px 0px;
  color:black;
}
.editFolder{
  margin-right: 0px;
  height: 60px;
  padding-top: 10px;
  background-color:#0057FF;
  font-family: 'Noto Sans KR';
}
.editFolder i{
  color: white;
}
.deletePlace{
  margin-right: 0px;
  height: 55px;
  border-bottom : #0057FF solid;
}
.checkbox{
  position: absolute;
  height : 10px;
  right: 0;
  top : 0;
}
.placeListArea{
  width: 24vw;
}
.overlay{
  font-family: 'Noto Sans KR';
}
</style>