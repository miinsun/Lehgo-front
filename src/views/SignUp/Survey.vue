<template>
  <v-container class="surveyContainer lehgo-background">
    <v-row>
    <v-col cols="8 offset-2 mt-10 pt-10">
    <v-card elevation="10" class="surveyArea">
    <transition name="container">
        <div v-if="resultArea" class="resultArea">
               당신의 유형은?

               <v-card class="resultCard">
                   <div class="cardTitle">{{resultTypeData[resultType].title}}</div>
                    <div class="cardContent">{{resultTypeData[resultType].content}}</div>
               </v-card>
            <v-btn @click="goToMain()" class="startBtn" depressed>메인으로</v-btn>
        </div>
    </transition>
    <transition name="container">
        <div v-if="explainArea" class="infoArea">
                <transition name="container" v-for="item, i in explainData" :key="'explain' + i">
                    <div v-if="item.load" class="text-center mb-2" :style="item.style">
                        {{item.text}}
                    </div>
                </transition>
                <transition name="container">
                    <div class="text-center mt-10" v-if="btnLoad">
                        <v-btn @click="surveyStart()" class="startBtn" depressed>설문 시작</v-btn>
                    </div>
                </transition>
        </div>
    </transition>
    <transition name="container">
        <hooper v-if="surveyArea" class="text-center my-10 innerArea" id="hooper">
        <hooper-pagination slot="hooper-addons" mode="fraction"></hooper-pagination>
            <slide v-for="data, i in YNList" :key="'YN' + i">
                <span class="surveyTitle">
                    Q. {{data.title}}
                </span>
                <div class="YNArea mx-auto pt-10">
                    <v-chip-group column>
                        <v-chip class="mx-auto px-10 mt-5" filter outlined @click="selectBtn(i, typeIdx)"
                            v-for="type, typeIdx in data.types" :key="i + '' + typeIdx">{{type}}</v-chip>
                    </v-chip-group>
                <div v-if="i == (YNList.length  - 1)">
                    <v-btn @click="surveySubmit()" class="startBtn mt-10 my-5" depressed>완료</v-btn>
                    <transition name="errorMessage">
                        <div v-if="error">선택되지 않은 항목이 있습니다.</div>
                    </transition>
                </div>
                </div>
            </slide>
            <hooper-navigation slot="hooper-addons">
                <svg slot="hooper-prev" width="50" height="50" viewBox="0 0 50 50">
                    <g id="사각형_1067" data-name="사각형 1067" fill="#fafafa" stroke="#0056ff" stroke-width="2">
                        <rect width="50" height="50" rx="10" stroke="none"/>
                        <rect x="1" y="1" width="48" height="48" rx="9" fill="none"/>
                    </g>
                    <g id="Symbol_83" data-name="Symbol 83" transform="translate(35.665 35.664) rotate(180)">
                        <path id="패스_10" data-name="패스 10" d="M10,0,8.182,1.818,15.065,8.7H0v2.6H15.065L8.182,18.182,10,20,20,10Z" transform="translate(1 0)" fill="#0057ff"/>
                    </g>
                </svg>
                <svg slot="hooper-next" width="50" height="50" viewBox="0 0 50 50">
                    <g id="사각형_1066" data-name="사각형 1066" fill="#fafafa" stroke="#0057ff" stroke-width="2">
                        <rect width="50" height="50" rx="10" stroke="none"/>
                        <rect x="1" y="1" width="48" height="48" rx="9" fill="none"/>
                    </g>
                    <g id="Symbol_82" data-name="Symbol 82" transform="translate(15 14.999)">
                        <path id="패스_10" data-name="패스 10" d="M10,0,8.182,1.818,15.065,8.7H0v2.6H15.065L8.182,18.182,10,20,20,10Z" transform="translate(0)" fill="#0057ff"/>
                    </g>
                </svg>
            </hooper-navigation>
            <hooper-progress slot="hooper-addons">hello</hooper-progress>
        </hooper>
    </transition>
        </v-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { surveyExplain, optionalData, YNData, resultData } from '@/assets/surveyData.js';
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userStore");

import { Hooper, Slide,  Progress  as HooperProgress, Pagination as HooperPagination, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';

  export default {
    name: 'Survey',
    data: () => ({
        btnLoad : false,
        surveyArea : false,
        explainArea : true,
        resultArea : false,
        explainData : null,
        checked1 : '',
        checked2 : '',
        resultList : [-1, -1, -1, -1, -1, -1, -1, -1],
        resultTypeList : [[2, 3], [3, 4], [1, 3], [4, 1], [0, 0], [2, 3], [3, 0], [1, 2, 4]],
        result : [0, 0, 0, 0, 0],
        resultType : null,
        YNList : null,
        reload : true,
        error : false,
        resultTypeData : null,
    }),
    components: {
        Hooper,
        Slide,
        HooperProgress,
        HooperPagination,
        HooperNavigation,
    },
    validators: {
    },
    computed :{
      ...mapGetters(['getUserNickName']),
    },
    methods: {
        goToMain(){
            this.$router.push({ name: 'Main' })
        },
        surveyStart(){
            this.explainArea = false;
            for(let i in this.explainData){
                this.explainData[i].load = false;
            }
            setTimeout(() =>(this.surveyArea = true), 1000);
        },
        selectBtn(i, btnIdx){
            this.resultList[i] = this.resultList[i] == btnIdx ? 2 : btnIdx;
        },
        surveySubmit(){
            console.log(this.resultList)
            let max = 0;
            let maxIdx = 0;
            for (let i in this.resultList){
                if(this.resultList[i] == -1){
                    this.error = true;
                    break;
                }
                else if(this.resultTypeList[i][this.resultList[i]] != 0){
                    this.result[this.resultTypeList[i][this.resultList[i]]]++;
                }
                if(i == 7 && this.error == false){
                    for(let idx in this.result){
                        console.log(this.result[idx])
                        if(this.result[idx] > max){
                            maxIdx = idx
                            max = this.result[idx]
                        }
                    }
                    this.resultType = maxIdx;
                    this.surveyArea = false;
                    setTimeout(() =>(this.resultArea = true), 1000);
                    this.setType(maxIdx);
                }
            }
            setTimeout(() =>(this.error = false), 1000);
        },
        ...mapActions(['setType'])
    },
    mounted(){
        this.explainData = surveyExplain;
        this.optionalList = optionalData;
        this.YNList = YNData;
        this.resultTypeData = resultData;
        for(let i in this.explainData){
            setTimeout(() =>(this.explainData[i].load = true), 700 * i);
        }
        setTimeout(() =>(this.btnLoad = true), 700 * this.explainData.length);
    },
    created(){
    }
  }
</script>

<style scoped>
.container-enter-active, .container-leave-active {
  transition: opacity 1s;
}
.container-enter, .container-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.surveyTitle{
    font-family: 'Noto Sans KR' !important;
    font-size: 40px;
    font-weight: 600;
    color: #0052F2;
}
.btnArea{
    width : 700px;
    height : 500px;
    margin: 50px;
}
.YNArea{
    width : 600px;
    height : 500px;
    margin: 50px;
}
.YNArea .v-chip{
    margin-bottom: 20px;
}
.v-chip-group .v-chip{
    font-size : 20px;
    padding : 20px;
    border-radius: 50px;
}
.v-chip-group--column{
    max-width: 100%;
}
.v-btn__content{
    font-size: 20px;
}

.surveyArea{
    height: 80vh;
    padding: 0px 150px;
    background-color: white;
    border: #0052F2 7px solid !important;
    border-radius: 40px !important;
    font-family: 'Noto Sans KR' !important;
}
.infoArea{
    margin-top: 17vh;
}
.startBtn{
    color: white !important;
    background-color: #0057FF !important;
    font-size: 25px !important;
    margin-top: 10px;
    width: 250px;
    min-height: 60px;
    border-radius: 8px;
}
.errorMessage-enter-active, .errorMessage-leave-active {
  transition: opacity .5s;
}
.errorMessage-enter, .errorMessage-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.resultArea{
    padding: 150px 100px;
    font-size: 25px;
    text-align: center;
    color: #0057FF;
    font-family: 'Noto Sans KR' !important;
}
.resultCard{
    margin: auto;
    margin-top: 30px;
    margin-bottom: 50px;
    background-color: white;
    font-size: 20px;
    width: 350px;
    border-radius: 10px !important;
    border: #0052F2 3px solid !important;
    overflow: hidden;
}
.cardContent{
    padding: 20px 30px;
}
.cardTitle {
    padding-top: 15px;
    width: 350px;
    height: 60px;
    color: white;
    border-radius: 0px !important;
    background-color: #0052F2;
}
</style>

<style>
/* hooper */
#hooper{
    height:75vh;
	position:relative;
}
.hooper-progress{
    top: 55px;
    height: 10px;
    background-color: #e3e7ee;
    border-radius: 10px;
}
div.hooper-progress-inner{
    background-color: #0052F2;
    border-radius: 10px;
    position: relative;
}
div.hooper-progress-inner::after{
    background-color: #0052F2;
    border: white solid 2.5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    content: ' ';
    margin-top: -2px;
    display: inline-block;
    position: absolute;
    right: 0;
}
.hooper-track{
    padding-left: 0px !important;
}
.hooper-pagination{
    top: 20px;
    right: 10px;
    color: #0052F2;
}
.hooper-slide{
    margin-top: 150px;
    color: #0052F2;
}
.hooper-navigation{
    position: relative;
    bottom: 100px;
}
.surveyContainer{
    max-width:100vw;
    width: 100vw;
    height: 100vh;
    background-repeat: repeat;
}
</style>