<template>
    <div class="sideBarArea">
    <div class="sideBar text-center">
        <div class="mainBtn" type="button" @click="goToMain()">
            <h2>LEHGO</h2>
        </div>
        <div v-for="icon, i in icons" :key="'icon' + i">
        <v-tooltip right color="#186EC5" transition="slide-x-transition" :disabled="icon.router == nowRouter">
            <template v-slot:activator="{ on, attrs }">
                <div type="button" @click="goToRouter(icon.router)" v-bind="attrs" v-on="on">
                    <svg width="60" height="60" viewBox="-10 -10 80 80">
                        <circle cx="30" cy="30" r="30" :fill="getColor(icon.router)"/>
                        <g :transform="'translate' + icon.translate">
                            <path  :d="icon.path" fill="#FFFFFF"/>
                        </g>
                    </svg>
                </div>
            </template>
            <div>{{icon.title}}</div>
        </v-tooltip>
        </div>
    </div>
    </div>
</template>

<script>
  export default {
    name: 'SideBar',
    data: () => ({
        myPageHover : false,
        nowRouter : null,
        icons : [
            {title: '마이페이지', router : 'MyPage', translate : '(14.099 11.303)', path : 'M-.9,35.4V29.848c0-6.1,7.155-11.1,15.9-11.1s15.9,4.993,15.9,11.1V35.4ZM5.5,7.5A9.5,9.5,0,1,1,15,17,9.5,9.5,0,0,1,5.5,7.5Z'},
            {title: '검색', router : 'Search', translate : '(12 12)', path : 'M35.9,32.739l-7.451-7.451a15.459,15.459,0,0,0,3.161-9.483A15.708,15.708,0,0,0,15.805,0,15.708,15.708,0,0,0,0,15.805,15.708,15.708,0,0,0,15.805,31.61a15.459,15.459,0,0,0,9.483-3.161L32.739,35.9ZM4.516,15.805A11.18,11.18,0,0,1,15.805,4.516,11.18,11.18,0,0,1,27.094,15.805,11.18,11.18,0,0,1,15.805,27.094,11.18,11.18,0,0,1,4.516,15.805Z'},
            {title: '좋아요 목록', router : 'Like', translate : '(12 16.94)', path : 'M33.147,2.9a9.673,9.673,0,0,0-13.768,0L18.025,4.257,16.671,2.9A9.735,9.735,0,0,0,2.9,16.671L18.025,31.793,33.147,16.671a9.673,9.673,0,0,0,0-13.768'},
            {title: '메뉴', router : 'Menu', translate : '(15.001 17)', path : 'M0,26.429V21.637H18.75v4.792Zm0-9.737V10.819H30v5.873ZM0,5.873V0H30V5.873Z'},
        ]
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
.sideBarArea{
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: #186EC5;
}
.sideBar{
    margin: auto;
    width: 70%;
    height: 100%;
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
</style>