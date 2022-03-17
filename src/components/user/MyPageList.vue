<template>
    <div class="myPageList" v-bar>
    <div>
      <v-list id="page2-slide" class="page2-slide-hidden">
        <v-list-item-group>
          <v-list-item>
            <v-list-item-content @click="openVisitedList()">
                <v-list-item-title>
                  <span class="svg"><svg class="pt-1" width="25" height="25" viewBox="0 0 25 25">
                  <g id="circle" transform="translate(-0.6 -0.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                    <path d="M25.6,13A12.5,12.5,0,1,1,13.1.5,12.481,12.481,0,0,1,25.6,13Z" stroke="none"/>
                    <path id="circlePath" d="M 13.10000133514404 22.5 C 15.64464569091797 22.5 18.03225708007812 21.51377868652344 19.82302284240723 19.7230224609375 C 21.61377906799316 17.93225479125977 22.60000228881836 15.54464435577393 22.60000228881836 13 C 22.60000228881836 10.46654415130615 21.60494613647461 8.08056640625 19.79814529418945 6.281577587127686 C 17.99662399291992 4.487855434417725 15.61783504486084 3.5 13.10000133514404 3.5 C 10.55535697937012 3.5 8.167745590209961 4.486222267150879 6.376979351043701 6.276978015899658 C 4.586223602294922 8.067744255065918 3.600001335144043 10.45535564422607 3.600001335144043 13 C 3.600001335144043 15.54464435577393 4.586223602294922 17.93225479125977 6.376979351043701 19.7230224609375 C 8.167745590209961 21.51377868652344 10.55535697937012 22.5 13.10000133514404 22.5 M 13.10000133514404 25.5 C 6.18176794052124 25.5 0.600001335144043 19.91824531555176 0.600001335144043 13 C 0.600001335144043 6.081766605377197 6.18176794052124 0.5 13.10000133514404 0.5 C 19.93962287902832 0.5 25.60000228881836 6.081766605377197 25.60000228881836 13 C 25.60000228881836 19.91824531555176 20.01823425292969 25.5 13.10000133514404 25.5 Z" stroke="none" fill="#0057ff"/>
                  </g>
                  <path id="inside" d="M16.4,6.8v7.829h5.973" transform="translate(-3.434 -1.017)" fill="none" stroke="#0057ff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                </svg></span>
                <span class="listTitle">최근 기록</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content @click="openLikedList()">
                <v-list-item-title>
                    <span class="svg"><svg class="pt-1" width="27.613" height="25.341" viewBox="0 0 27.613 25.341">
                    <g id="Heart" transform="translate(1.5 1.5)">
                      <path id="Heart-2" data-name="Heart" d="M22.671,1.993a6.613,6.613,0,0,0-9.413,0l-.926.926-.926-.926a6.656,6.656,0,0,0-9.413,9.413L12.332,21.745,22.671,11.406a6.613,6.613,0,0,0,0-9.413" transform="translate(-0.025 -0.025)" fill="#fff" stroke="#0057ff" stroke-width="3" fill-rule="evenodd"/>
                    </g>
                  </svg></span>
                <span class="listTitle">좋아한 여행지</span>
                </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                  <v-list-item-title id="groupHeader">
                    <span class="svg"><svg class="pt-2" width="25" height="31.125" viewBox="0 0 25 31.125">
                    <g id="Bookmark" transform="translate(0 1.5)">
                      <rect id="사각형_239" data-name="사각형 239" width="25" height="28.125" fill="none"/>
                      <path id="패스_110" data-name="패스 110" d="M0,0H21V28.125L10.5,17.578,0,28.125Z" transform="translate(2)" fill="none" stroke="#0057ff" stroke-linejoin="round" stroke-width="3"/>
                    </g>
                  </svg></span>
                <span class="listTitle">북마크</span>
                </v-list-item-title>
              </v-list-item-content>
            </template>
          <v-list-item v-for="f, i in getFolderList" :key="'folder' + i">
            <v-list-item-content @click="openFolderPlaceList(f.folderId)">
                <v-list-item-title class="listItemTitle"><span class="listTitle">{{f.folderName}}</span></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!newFolder">
            <v-list-item-content  @click="newFolder = true">
                <v-list-item-title class="listItemTitle"><i class="fas fa-plus mr-3"></i> 폴더 추가</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="newFolder">
            <v-text-field v-model="folderName" class="mb-5 mx-5" color="#0057FF" 
                hide-details="auto" maxlength="20" required label="이름"></v-text-field>
            <v-btn text @click="addFolderBtn()">추가</v-btn>
          </v-list-item>
        </v-list-group>
        <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                  <v-list-item-title id="groupHeader">
                    <span class="svg"><svg class="pt-1" width="28" height="26.75" viewBox="0 0 28 26.75">
                      <path id="패스_157" data-name="패스 157" d="M12.5,0l3.906,7.812L25,9.063l-6.25,6.094,1.406,8.594L12.5,19.688,4.844,23.75,6.25,15.156,0,9.063l8.594-1.25Z" transform="translate(1.5 1.5)" fill="none" stroke="#0057FF" stroke-linejoin="round" stroke-width="3"/>
                    </svg></span>
                <span class="listTitle">저장한 코스</span>
                </v-list-item-title>
              </v-list-item-content>
            </template>
          <v-list-item v-for="c, i in getCourseList" :key="'course' + i">
            <v-list-item-content @click="openCoursePlaceList(c.courseId)">
                <v-list-item-title class="listItemTitle">
                  <span class="svg"><svg class="pt-1" width="28" height="21.77" viewBox="0 0 28 21.77">
                    <path id="패스_178" data-name="패스 178" d="M0,17.071V1.537A1.6,1.6,0,0,1,.485.4,1.538,1.538,0,0,1,1.537,0h8.981a.919.919,0,0,1,.647.243,1.088,1.088,0,0,1,.485.566l.809,2.265H23.382a1.6,1.6,0,0,1,1.133.485A1.469,1.469,0,0,1,25,4.693v12.46a1.6,1.6,0,0,1-.485,1.133,1.469,1.469,0,0,1-1.133.485H1.537A1.6,1.6,0,0,1,.4,18.285,2.18,2.18,0,0,1,0,17.071Z" transform="translate(1.5 1.5)" fill="none" stroke="#0057ff" stroke-width="3"/>
                  </svg></span>
                <span class="listTitle">{{c.courseName}}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!newCourse">
            <v-list-item-content  @click="newCourse = true">
                <v-list-item-title class="listItemTitle">
                  <span class="svg"><svg class="pt-1" xmlns="http://www.w3.org/2000/svg" width="28" height="21.517" viewBox="0 0 28 21.517">
  <g id="구성_요소_5" data-name="구성 요소 5" transform="translate(5.5 1.5)">
    <path id="패스_178" data-name="패스 178" d="M0,13.657V1.23A1.278,1.278,0,0,1,.388.324,1.23,1.23,0,0,1,1.23,0H8.414a.735.735,0,0,1,.518.194A.87.87,0,0,1,9.32.647L9.968,2.46h8.738a1.278,1.278,0,0,1,.906.388A1.175,1.175,0,0,1,20,3.754v9.968a1.278,1.278,0,0,1-.388.906,1.175,1.175,0,0,1-.906.388H1.23a1.278,1.278,0,0,1-.906-.388A1.744,1.744,0,0,1,0,13.657Z" transform="translate(0 0)" fill="none" stroke="#0057ff" stroke-width="3"/>
  </g>
  <path id="패스_918" data-name="패스 918" d="M-2.82,18.966-5,7.4a1.458,1.458,0,0,1,.443-1.034A1.4,1.4,0,0,1-3.6,6H6.781a.839.839,0,0,1,.591.222.993.993,0,0,1,.443.517l.739,2.5h8.662a1.458,1.458,0,0,1,1.034.443,4.031,4.031,0,0,1,.443,1.906L20,19.04a1.458,1.458,0,0,1-.443,1.034,1.341,1.341,0,0,1-1.034.443H-1.417a1.458,1.458,0,0,1-1.034-.443A1.99,1.99,0,0,1-2.82,18.966Z" transform="translate(6.5 -0.5)" fill="#fff" stroke="#0057ff" stroke-width="3"/>
</svg></span>
                <span class="listTitle">코스 추가</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="newCourse">
            <v-text-field v-model="courseName" class="mb-5 mx-5" color="#0057FF" 
                hide-details="auto" maxlength="20" required label="이름"></v-text-field>
            <v-btn text @click="addCourseBtn()">추가</v-btn>
          </v-list-item>
        </v-list-group>
        <v-list-item class="text-right">
            <v-list-item-content @click="goToSurvey()">
              <v-list-item-title><span class="listTitle">▶ 성향 조사 다시하기</span></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item class="text-right">
            <v-list-item-content @click="goToLogout()">
              <v-list-item-title><span class="listTitle">로그아웃</span></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("userStore");
const { mapGetters : folderGetters , mapActions : folderActions } = createNamespacedHelpers("folderStore");
const { mapGetters : courseGetters , mapActions : courseActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'MyPageList',

    data: () => ({
      newFolder : false,
      newCourse : false,
      folderName : '',
      courseName : ''
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
        openCoursePlaceList(courseId){
            this.$emit('openCoursePlaceList', courseId)
        },
        openFolderPlaceList(folderId){
            this.$emit('openFolderPlaceList', folderId)
        },
        goToSurvey() {
            this.$router.push({
                name: 'Survey'
            })
        },
        goToLogout() {
          this.postLogout();
          this.$router.push({
              name: 'Login'
          })
        },
        addFolderBtn(){
          this.addFolder(this.folderName);
          this.newFolder = false;
        },
        addCourseBtn(){
          this.addCourse(this.courseName);
          this.newCourse = false;
        },
        ...mapActions(['postLogout']),
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
.v-list-item__title{
  height: 50px !important;
  line-height: 50px;
  color: #0057FF;
  font-weight: 500;
}
.v-list-item--active{
  background-color: #0057FF;
  color: white;
  font-size: 15px;
  font-weight: 700;
} 
.v-list-item--active .v-list-item__title{
  color: white;
} 
.v-list-item--active .v-list-item__title path{
  stroke: white;
  color: #0057FF !important;
}
.v-list-group--active #groupHeader{
  color: #0057FF !important;
}
.v-list-group--active #groupHeader path{
  color: #0057FF !important;
  stroke: #0057FF !important;
  fill: #0057FF !important;
}
.v-list-item--active .v-list-item__title #circlePath{
  fill: #fff !important;
  stroke: none;
}
.v-list-item__title span{
  margin: 10px;
  font-family: 'Noto Sans KR';
}
.listItemTitle{
  padding-left: 30px;
}
</style>