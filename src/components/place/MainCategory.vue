<template>
  <v-container>
    <v-row>
      <v-col class="categoryArea" v-for="category, i in getCategoryList" :key="'category' + i">
      <div elevation="0" :class="'categoryTitle ' + category.category">{{category.category}}</div>
        <div class="categoryListArea" :style="'height :' + categoryheight" v-bar>
          <div>
            <div v-for="place in category.list" :key="'categoryPlace' + place.placeId">
              <v-hover v-slot="{ hover }">
              <v-sheet :class="category.category + '-border placeBtn ' + getHover(hover)" type="button" @click="clickedPlace(place)" outlined>
                <v-row>
                  <div :class="category.category + '-border placeImg rounded-circle'" v-if="place.img1" :style="'background-image : url(' + place.img1 + ');'"></div>
                  <div :class="category.category + '-border noImg rounded-circle'" v-if="!place.img1"><i class="far fa-image"></i> </div>
                  <div class="placeText mx-2 mt-3">
                    <div class="placeName">{{place.placeName}}</div>
                    <div class="placeInfo">{{place.tel}}</div>
                    <div class="placeInfo">{{place.address}}</div>
                    <div class="placeInfo">{{place.time}}</div>
                  </div>
                </v-row>
              </v-sheet>
              </v-hover>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions : categoryMapActions , mapGetters : categoryMapGetters } = createNamespacedHelpers("categoryStore");
const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");
const { mapGetters : listMapGetters } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'MainCategory',
    props : ['categoryheight'],
    data: () => ({
      name : '',
      address : '',
      resultAddress : '',
      categoryList : [],
    }),
    methods: {
      getHover(hover){
        if(hover){
          return 'on-hover'
        }
      },
      newPlace(){
        this.addUserPlace({name : this.name, address : this.resultAddress})
      },
      clickedPlace(place){
          this.setPlace(place);
      },
      ...placeMapActions(['setPlace', 'addUserPlace']),
      ...categoryMapActions(['setCategoryList'])
    },
    mounted(){
    },
    created(){
      this.setCategoryList(['식당', '바다', '액티비티'])
    },
    computed:{
      ...listMapGetters(['getPlaceList']),
      ...categoryMapGetters(['getCategoryList'])
    }
  }
</script>

<style scoped>
.col-7{
  padding-left: 0px;
}
div.v-card{
  height: 40px;
  line-height: 40px;
  margin: 10px 0px;
}
.categoryArea{
  background : white;
  border-radius: 20px;
  margin: 20px 15px;
}
.categoryListArea{
  overflow: auto;
  overflow-y: scroll;
}
.placeImg{
  margin: 10px 5px 10px 16px;
  background-size: cover; 
  background-position: center;
  width: 4vw;
  height: 4vw;
  box-sizing: content-box;
}
.noImg{
  background-color: lightgray;
  text-align: center; 
  width: 4vw;
  height: 4vw;
  box-sizing: content-box;
}
.noImg i{
  color: white;
  font-size: 50px;
  margin-top: 35px
}
.placeBtn{
  margin: 10px 2px;
  padding : 12px 5px;
  border-radius: 10px;
  height: 6vw;
  transition: background-color .4s ease-in-out;
}
.placeBtn.on-hover {
  background: #cccccc;
}
.placeBtn:active{
  background: #b8b8b8;
}
.placeText{
  width: 8vw;
}
.placeName{
  width: 100%;
  text-align: left;
  font-size: 17px;
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
  width : 7.3vw;
  overflow: hidden;
  white-space : nowrap;
  text-overflow: ellipsis;
  font-family: 'Noto Sans KR';
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
.categoryTitle.액티비티{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='77.838' viewBox='0 0 260 77.838'%3E%3Cpath d='M11,77.838a11,11,0,0,1-11-11V18.469a11,11,0,0,1,11-11H23.862V6a6,6,0,0,1,6-6H77.008a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469H249a11,11,0,0,1,11,11v48.37a11,11,0,0,1-11,11Z' fill='%234BEF82'/%3E%3C/svg%3E");
}
.categoryTitle.힐링{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='77.838' viewBox='0 0 260 77.838'%3E%3Cpath d='M11,77.838a11,11,0,0,1-11-11V18.469a11,11,0,0,1,11-11H23.862V6a6,6,0,0,1,6-6H77.008a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469H249a11,11,0,0,1,11,11v48.37a11,11,0,0,1-11,11Z' fill='%23FC178B'/%3E%3C/svg%3E");
}
.categoryTitle.바다{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='77.838' viewBox='0 0 260 77.838'%3E%3Cpath d='M11,77.838a11,11,0,0,1-11-11V18.469a11,11,0,0,1,11-11H23.862V6a6,6,0,0,1,6-6H77.008a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469H249a11,11,0,0,1,11,11v48.37a11,11,0,0,1-11,11Z' fill='%2339C2FF'/%3E%3C/svg%3E");
}
.categoryTitle.식당{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='77.838' viewBox='0 0 260 77.838'%3E%3Cpath d='M11,77.838a11,11,0,0,1-11-11V18.469a11,11,0,0,1,11-11H23.862V6a6,6,0,0,1,6-6H77.008a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469H249a11,11,0,0,1,11,11v48.37a11,11,0,0,1-11,11Z' fill='%23D059DE'/%3E%3C/svg%3E");
}
.categoryTitle.문화{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='77.838' viewBox='0 0 260 77.838'%3E%3Cpath d='M11,77.838a11,11,0,0,1-11-11V18.469a11,11,0,0,1,11-11H23.862V6a6,6,0,0,1,6-6H77.008a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469H249a11,11,0,0,1,11,11v48.37a11,11,0,0,1-11,11Z' fill='%235D24FE'/%3E%3C/svg%3E");
}
.categoryTitle.포토스팟{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='77.838' viewBox='0 0 260 77.838'%3E%3Cpath d='M11,77.838a11,11,0,0,1-11-11V18.469a11,11,0,0,1,11-11H23.862V6a6,6,0,0,1,6-6H77.008a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469H249a11,11,0,0,1,11,11v48.37a11,11,0,0,1-11,11Z' fill='%23FE9C00'/%3E%3C/svg%3E");
}
.categoryTitle.카페{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='77.838' viewBox='0 0 260 77.838'%3E%3Cpath d='M11,77.838a11,11,0,0,1-11-11V18.469a11,11,0,0,1,11-11H23.862V6a6,6,0,0,1,6-6H77.008a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469h17.014V6a6,6,0,0,1,6-6h47.146a6,6,0,0,1,6,6V7.469H249a11,11,0,0,1,11,11v48.37a11,11,0,0,1-11,11Z' fill='%23FFE600'/%3E%3C/svg%3E");
}
</style>