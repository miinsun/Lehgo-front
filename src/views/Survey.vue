<template>
  <v-container>
    <v-row>
    <v-col cols="8 offset-2 mt-5">
    <transition name="container">
        <hooper v-if="loaded" class="text-center my-10" id="hooper">
        <hooper-pagination slot="hooper-addons" mode="fraction"></hooper-pagination>
            <slide v-for="i in 10" :key="i">
                <span class="surveyTitle">
                    Q. 좋아하는 음식 종류는?
                </span>
                <div class="btnArea mx-auto">
                    <a type="button" class="surveyBtn" v-for="data, dataIdx in dataList" :key="i + '' + dataIdx"
                        @click="selectBtn(i, dataIdx)" :id="i + '' + dataIdx">
                        <span>{{data}}</span>
                        <transition name="clicked">
                        <svg class="clickedSvg" v-show="btnList[i]==dataIdx" width="66" height="66" viewBox="0 0 66 66">
                            <rect width="66" height="66" rx="6" fill="#fff" opacity="0.6"/>
                            <g transform="translate(14 14)" opacity="0.7">
                                <circle cx="19" cy="19" r="19" fill="#2699fb"/>
                                <path d="M6.9,12,0,5.1,1.4,3.7,6.9,9.1,16,0l1.4,1.4Z" transform="translate(9.952 13)" fill="#fff"/>
                            </g>
                        </svg> 
                        </transition>
                    </a>
                </div>
            </slide>
            <hooper-navigation slot="hooper-addons">
                <svg slot="hooper-prev" width="50" height="50" viewBox="0 0 50 50">
                <defs>
                    <clipPath id="clip-path">
                    <rect width="50" height="50" fill="none"/>
                    </clipPath>
                </defs>
                <g clip-path="url(#clip-path)">
                    <g fill="#fafafa" stroke="#f1f9ff" stroke-width="2">
                    <rect width="50" height="50" rx="10" stroke="none"/>
                    <rect x="1" y="1" width="48" height="48" rx="9" fill="none"/>
                    </g>
                    <g transform="translate(1288 540) rotate(180)">
                    <path d="M8,0,6.545,1.455l5.506,5.506H0V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(1254 507)" fill="#2699fb"/>
                    </g>
                </g>
                </svg>
                <svg slot="hooper-next" width="50" height="50" viewBox="0 0 50 50">
                    <defs>
                        <clipPath id="clip-path">
                        <rect width="50" height="50" fill="none"/>
                        </clipPath>
                    </defs>
                    <g id="Forward_Arrow" data-name="Forward Arrow" clip-path="url(#clip-path)">
                        <g fill="#fafafa" stroke="#f1f9ff" stroke-width="2">
                        <rect width="50" height="50" rx="10" stroke="none"/>
                        <rect x="1" y="1" width="48" height="48" rx="9" fill="none"/>
                        </g>
                        <g transform="translate(-1236 -490)">
                        <path d="M8,0,6.545,1.455l5.506,5.506H0V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(1254 507)" fill="#2699fb"/>
                        </g>
                    </g>
                    </svg>
            </hooper-navigation>
            <hooper-progress slot="hooper-addons">hello</hooper-progress>
        </hooper>
    </transition>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Hooper, Slide,  Progress  as HooperProgress, Pagination as HooperPagination, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';

  export default {
    name: 'Survey',
    data: () => ({
        loaded : false,
        checked1 : '',
        checked2 : '',
        dataList : ['TEST1', 'TEST2', 'TEST3', 'TEST4', 'TEST5', 'TEST6', 'TEST7', 'TEST8', 'TEST9'],
        btnList : ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
        reload : true,
    }),
    components: {
        Hooper,
        Slide,
        HooperProgress,
        HooperPagination,
        HooperNavigation  
    },
    validators: {
    },
    computed :{
    },
    methods: {
        submit: function() {
            this.$router.push({
                name: 'Main'
            })
        },
        selectBtn(i, btnIdx){
            this.btnList[i] = btnIdx;
            this.dataList.push(this.dataList.pop());
        }
    },
    mounted(){
        this.loaded = true
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
    font-family: Arial-BoldMT, Arial;
    font-weight: bold;
    font-size: 23px;
    color: #2699FB;
}
.btnArea{
    width: 318px;
    margin: 50px;
}
.surveyBtn {
    line-height: 70px;
    width: 70px;
    height: 70px;
    margin: 10px 10px;
	background-color:#F7F7F7;
	border-radius:8px;
	border:2px solid #2699FB;
	display:inline-block;
	cursor:pointer;
	color:#02689f;
	text-decoration:none;
    font-weight: bold;
    transition: 0.4s;
    text-align:center;
	position:relative;
}
.surveyBtn:hover {
    color:white;
	background-color:#2699FB;
}
.surveyBtn:active {
	position:relative;
	top:1px;
}
.clickedSvg{
    position:absolute;
    top: 0;
    left: 0;
}
.clicked-enter-active, .clicked-fade-leave-active{
  transition: opacity .3s;
}
.clicked-enter, .clicked-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style>
/* hooper */
#hooper{
    height:75vh;
	position:relative;
}
.hooper-progress{
    top: 30px;
    height: 10px;
    background-color: #F1F9FF;
    border-radius: 10px;
}
div.hooper-progress-inner{
    background-color: #2699FB;
    border-radius: 10px;
    position: relative;
}
div.hooper-progress-inner::after{
    background-color: #2699FB;
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
.hooper-pagination{
    top: 0;
    right: 10px;
    color: #2699FB;
}
.hooper-slide{
    margin-top: 110px;
    color: #2699FB;
}
.hooper-navigation{
    position: relative;
    bottom: 25px;
}
</style>