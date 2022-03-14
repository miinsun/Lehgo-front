<template>
    <div class="sideBar text-center">
        <div class="mainBtn mb-3" type="button" @click="goToMain()">
            <svg id="그룹_156" data-name="그룹 156" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
            <path id="패스_671" data-name="패스 671" d="M35,0A35,35,0,1,1,0,35,35,35,0,0,1,35,0Z" fill="#fff"/>
            <g id="icn_home_active" transform="translate(16.395 11.667)">
                <path id="icn_home_active-2" data-name="icn_home_active" d="M19.605,27.415a6.91,6.91,0,0,0-6.891,6.891v8.039H1V16.619L19.605,1,38.211,16.619V42.345H26.5l-.23-.459v-7.58a6.58,6.58,0,0,0-6.661-6.891" transform="translate(-1 -1)" fill="none" stroke="#0057ff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/>
            </g>
            </svg>
            <div class="btnText">일정 홈</div>
        </div>
        <div class="mainBtn mb-3" type="button" @click="goToSearch()">
            <svg id="Add" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="68.526" height="68.526" viewBox="0 0 68.526 68.526">
            <defs>
                <clipPath id="clip-path">
                <rect width="40" height="40" fill="none"/>
                </clipPath>
            </defs>
            <path id="패스_662" data-name="패스 662" d="M34.263,0A34.263,34.263,0,1,1,0,34.263,34.263,34.263,0,0,1,34.263,0Z" fill="#fff"/>
            <g id="Search" transform="translate(14.263 14.263)" clip-path="url(#clip-path)">
                <rect id="사각형_693" data-name="사각형 693" width="40" height="40" transform="translate(0.001)" fill="none"/>
                <path id="패스_208" data-name="패스 208" d="M39.833,36.326l-8.267-8.267a17.153,17.153,0,0,0,3.507-10.522A17.429,17.429,0,0,0,17.537,0,17.429,17.429,0,0,0,0,17.537,17.429,17.429,0,0,0,17.537,35.073a17.153,17.153,0,0,0,10.522-3.507l8.267,8.267ZM5.01,17.537A12.4,12.4,0,0,1,17.537,5.01,12.4,12.4,0,0,1,30.063,17.537,12.4,12.4,0,0,1,17.537,30.063,12.4,12.4,0,0,1,5.01,17.537Z" transform="translate(0)" fill="#0057ff"/>
            </g>
            </svg>
            <div class="btnText">검색</div>
        </div>
        <div class="mainBtn mb-3" type="button" @click="goToMyPage()">
            <svg id="Add" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
            <circle id="타원_226" data-name="타원 226" cx="35" cy="35" r="35" fill="#0057ff"/>
            <g id="Heart" transform="translate(13.099 18.673)">
                <path id="Heart-2" data-name="Heart" d="M40.326,3.526a11.769,11.769,0,0,0-16.752,0L21.926,5.174,20.278,3.526A11.845,11.845,0,0,0,3.526,20.278l18.4,18.4,18.4-18.4a11.769,11.769,0,0,0,0-16.752" transform="translate(-0.025 -0.025)" fill="#fff" fill-rule="evenodd"/>
            </g>
            </svg>
            <div class="btnText">마이페이지</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SideBar',
    data: () => ({
        myPageHover : false,
        nowRouter : null,
    }),
    methods: {
        getColor(router){
            if(router == this.nowRouter){
                return '#7FC4FD';
            }
            else{
                return '#186EC5';
            }
        },
        goToMain(){
            this.$router.push({
                name: 'Main'
            })
        },
        goToSearch(){
            this.$router.push({
                name: 'Search'
            })
        },
        goToMyPage(){
            this.$router.push({
                name: 'MyPage'
            })
        },
        goToRouter(router) {
            if(this.nowRouter != router){
                this.$router.push({
                    name: router
                })
            }
        },
    },
    mounted() {
        this.nowRouter = this.$route.name;
    }
  }
</script>

<style scoped>
.sideBar{
    margin: auto;
    width: 100%;
    height: 100%;
  font-size: 0.75vw;
    font-family: 'Noto Sans KR';
    color:#0057FF;
    background-color: white;
}
.sideBar>div{
    padding-top: 15px;
}
.sideBar>div>svg{
    width: 60%;
}
.v-tooltip__content{
    border-radius: 25px 25px 25px 25px;
}
.btnText{
    margin-top: -5px;
}
</style>