<template>
    <div class="myPageList" v-bar>
    <div>
      <v-list rounded id="page2-slide" class="page2-slide-hidden">
        <v-list-item-group  color="gray" >
          <v-list-item>
            <v-list-item-content @click="openSearchList()">
                <v-list-item-title>검색 기록</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content @click="openVisitedList()">
                <v-list-item-title>여행지 방문 기록</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content @click="openLikedList()">
                <v-list-item-title>찜한 여행지</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <v-list-group color="gray">
            <template v-slot:activator>
              <v-list-item-content>
                  <v-list-item-title>폴더</v-list-item-title>
              </v-list-item-content>
            </template>
          <v-list-item v-for="f, i in getFolderList" :key="'folder' + i">
            <v-list-item-content @click="openFolderPlaceList(f.folderId)">
                <v-list-item-title>{{f.folderName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!newFolder">
            <v-list-item-content  @click="newFolder = true">
                <v-list-item-title><i class="fas fa-plus mr-3"></i> 폴더 추가</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="newFolder">
            <v-text-field v-model="folderName" class="mb-5 mx-5" color="orange darken-4" 
                hide-details="auto" maxlength="20" required label="이름"></v-text-field>
            <v-btn text @click="addFolderBtn()">추가</v-btn>
          </v-list-item>
        </v-list-group>
        <v-list-group color="gray">
            <template v-slot:activator>
              <v-list-item-content>
                  <v-list-item-title>나만의 코스</v-list-item-title>
              </v-list-item-content>
            </template>
          <v-list-item v-for="c, i in getCourseList" :key="'course' + i">
            <v-list-item-content @click="openCoursePlaceList(c.courseId)">
                <v-list-item-title>{{c.courseId}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!newCourse">
            <v-list-item-content  @click="newFolder = true">
                <v-list-item-title><i class="fas fa-plus mr-3"></i> 코스 추가</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="newCourse">
            <v-text-field v-model="folderName" class="mb-5 mx-5" color="orange darken-4" 
                hide-details="auto" maxlength="20" required label="이름"></v-text-field>
            <v-btn text @click="addFolderBtn()">추가</v-btn>
          </v-list-item>
        </v-list-group>
        <v-list-item>
            <v-list-item-content @click="goToSurvey()">
              <v-list-item-title>취향 조사 다시하기</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters : folderGetters , mapActions : folderActions } = createNamespacedHelpers("folderStore");
const { mapGetters : courseGetters , mapActions : courseActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'MyPageList',

    data: () => ({
      newFolder : false,
      newCourse : false,
      folderName : '',
    }),
    methods: {
        openSearchList() {
            this.$emit('openSearchList')
        },
        openVisitedList(){
            this.$emit('openVisitedList')
        },
        openLikedList() {
            this.$emit('openLikedList')
        },
        openCourseList(){
            this.$emit('openCourseList')
        },
        openFolderPlaceList(folderId){
            this.$emit('openFolderPlaceList', folderId)
        },
        goToSurvey() {
            this.$router.push({
                name: 'Survey'
            })
        },
        addFolderBtn(){
          this.addFolder(this.folderName);
          this.newFolder = false;
        },
        ...folderActions(['setFolderList', 'addFolder']),
        ...courseActions(['setCourseList', 'addCourse'])
    },
    mounted(){
    },
    computed:{
      ...folderGetters(['getFolderList']),
      ...courseGetters(['getCourseList'])
    },
    created(){
      this.setFolderList()
      this.setCourseList()
    }
  }
</script>

<style scoped>
.myPageList{
    overflow-y: scroll;
}
.zap-slideout-opener {
  position: absolute;
  top: 20px;
  left: 100%;
  margin-left: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #fff;
  cursor: pointer;
}
</style>