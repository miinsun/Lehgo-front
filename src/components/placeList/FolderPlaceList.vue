<template>
    <div>
    <v-overlay :z-index="zIndex" :value="overlay" >
      <v-card color="white" elevation="2">
        <v-card-text>정말 폴더를 삭제하시겠습니까?</v-card-text>
      <v-btn class="mx-2" color="#226AB3" @click="deleteFolderBtn()">삭제</v-btn>
      <v-btn class="mx-2" color="#226AB3" text @click="overlay = false">취소</v-btn>
      </v-card>
    </v-overlay>
    <v-row class="editFolder">
      <v-col cols="8">
        <v-text-field color="white" v-if="editFolder" v-model="newFolderName"
          hide-details="auto" maxlength="10" required></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn v-if="editFolder" text @click="editFolderBtn()"><i class="far fa-check-circle"></i></v-btn>
        <v-btn v-if="!editFolder" text @click="editFolder = true"><i class="far fa-edit"></i></v-btn>
      </v-col>
      <v-col cols="2">
         <v-btn text @click="overlay = !overlay"><i class="far fa-trash-alt"></i></v-btn>
      </v-col>
    </v-row>
    <v-row class="deletePlace mb-5">
      <v-col cols="2 offset-10">
         <v-btn text @click="deletePlace()"><i class="far fa-trash-alt"></i></v-btn>
      </v-col>
    </v-row>
    <v-progress-circular v-if="!getLoaded" :size="50" :width="7" indeterminate color="#2699fb"></v-progress-circular>
    <div class="placeList" v-bar>
      <v-list rounded>
        <v-list-item-group  color="gray"  class="text-left" >
          <v-list-item class="py-3" v-for="p, i in getPlaceList" :key="i"> 
            <span class="placeImg rounded-circle" v-if="p.place.img1" :style="bgImg(p.place)"></span>
            <span class="noImg rounded-circle" v-if="!p.place.img1">
                <i class="far fa-image"></i>
            </span>
            <v-list-item-content @click="clickedPlace(p.place)">
                <v-list-item-title><b>{{p.place.placeName}}</b></v-list-item-title>
                <small>{{p.place.address}}</small>
            </v-list-item-content>
            <v-checkbox class="checkbox" v-model="selectedList" color="error" :value="p.place.placeId" hide-details></v-checkbox>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex";
const { mapActions : folderActions } = createNamespacedHelpers("folderStore");
  const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'FolderPlaceList',

    data: () => ({
      zIndex : 1000,
      overlay : false,
      newFolder : false,
      editFolder : false,
      newFolderName : '',
      selectedList : []
    }),
    props:['folderName'],
    methods: {
        bgImg(place) {
            return 'background-image : url("' + place.img1 + '");'
        },
        clickedPlace(place){
            this.$emit('clickedPlace', place);
        },
        editFolderBtn(){
          this.newFolderName
          this.editFolder = false;
        },
        deleteFolderBtn(){
          this.deleteFolder()
          this.setFolderList()
          this.overlay = false;
          this.$router.go();
        },
        deletePlace(){
          for(let i in this.selectedList){
            this.deletePlaceFromFolder(this.selectedList[i])
          }
        },
        ...listMapActions(['deleteFolder', 'deletePlaceFromFolder']),
        ...folderActions(['setFolderList'])
    },
    computed:{
      ...listMapGetters(['getLoaded', 'getPlaceList']),
    },
    mounted() {
    }
  }
</script>

<style scoped>
.placeList{
  height: 90vh;
  overflow: auto;
  overflow-y: scroll;
}
.placeImg{
    background-size: cover; 
    background-position: center; 
    width: 100px; 
    height: 100px;
    margin-right: 20px
}
.noImg{
    background-color: lightgray;
    text-align: center;
    width: 100px; 
    height: 100px;
    margin-right: 20px;
}
.noImg i{
    color: white;
    font-size: 30px;
    margin-top: 35px
}
.v-input>>> input{
  font-size: 12px;
  color: white;
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
  height: 50px;
  background-color:#226AB3;
}
.editFolder i{
  color: white;
}
.deletePlace{
  margin-right: 0px;
  height: 50px;
  border-bottom : #226AB3 solid;
}
.checkbox{
  position: absolute;
  height : 10px;
  right: 0;
  top : 0;
}
</style>