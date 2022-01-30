<template>
    <div class="myPageList" v-bar>
    <div>
      <v-list rounded id="page2-slide" class="page2-slide-hidden">
        <v-list-item-group  color="gray" >
          <v-list-item>
            <v-list-item-content @click="openSearchList">
                <v-list-item-title>검색 기록</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <v-list-group color="gray">
            <template v-slot:activator>
                <v-list-item-title>찜한 여행지</v-list-item-title>
            </template>
          <v-list-item>
            <v-list-item-content>
                <v-list-item-title>스크랩 1</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
                <v-list-item-title>스크랩 2</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
                <v-list-item-title>스크랩 3</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group color="gray">
            <template v-slot:activator>
                <v-list-item-title>나만의 코스</v-list-item-title>
            </template>
          <v-list-item>
            <v-list-item-content>
                <v-list-item-title>코스 1</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
                <v-list-item-title>코스 2</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item>
            <v-list-item-content><v-list-item-title>취향 조사 다시하기</v-list-item-title></v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    </div>
</template>

<script>

  export default {
    name: 'MyPageList',

    data: () => ({
    }),
    methods: {
        openSearchList : function() {
            this.$emit('openSideArea', 'searchList')
        }
    },
    mounted(){
    }
  }
</script>

<style scoped>
.myPageList{
    height:60vh;
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