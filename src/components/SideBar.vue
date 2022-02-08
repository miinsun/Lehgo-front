<template>
    <div class="sideBarArea">
    <div class="sideBar text-center">
        <div class="myPageBtn" type="button" @click="goToMyPage()">
            <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="30" fill="#226ab3"/>
                <g transform="translate(14.099 11.303)">
                    <path  d="M-.9,35.4V29.848c0-6.1,7.155-11.1,15.9-11.1s15.9,4.993,15.9,11.1V35.4ZM5.5,7.5A9.5,9.5,0,1,1,15,17,9.5,9.5,0,0,1,5.5,7.5Z" transform="translate(0.901 2)" fill="#fff"/>
                </g>
            </svg>
        </div>
        <div class="searchBtn" type="button" @click="goToSearch()">
            <svg width="60" height="60" viewBox="0 0 60 60">
                <defs>
                    <clipPath >
                    <rect width="36" height="36" fill="none"/>
                    </clipPath>
                </defs>
                <circle cx="30" cy="30" r="30" fill="#7fc4fd"/>
                <g transform="translate(12 12)" >
                    <rect width="36" height="36" fill="none"/>
                    <path d="M35.9,32.739l-7.451-7.451a15.459,15.459,0,0,0,3.161-9.483A15.708,15.708,0,0,0,15.805,0,15.708,15.708,0,0,0,0,15.805,15.708,15.708,0,0,0,15.805,31.61a15.459,15.459,0,0,0,9.483-3.161L32.739,35.9ZM4.516,15.805A11.18,11.18,0,0,1,15.805,4.516,11.18,11.18,0,0,1,27.094,15.805,11.18,11.18,0,0,1,15.805,27.094,11.18,11.18,0,0,1,4.516,15.805Z" fill="#fff"/>
                </g>
            </svg>
        </div>
        <div class="likeListBtn" type="button">
            <svg width="60" height="60" viewBox="0 0 60 60">
                <defs>
                    <clipPath>
                    <rect width="36" height="32.119" fill="none"/>
                    </clipPath>
                </defs>
                <circle cx="30" cy="30" r="30" fill="#7fc4fd"/>
                <g id="Heart" transform="translate(12 16.94)">
                    <path id="Heart-2" data-name="Heart" d="M33.147,2.9a9.673,9.673,0,0,0-13.768,0L18.025,4.257,16.671,2.9A9.735,9.735,0,0,0,2.9,16.671L18.025,31.793,33.147,16.671a9.673,9.673,0,0,0,0-13.768" transform="translate(-0.025 -0.025)" fill="#fff" fill-rule="evenodd"/>
                </g>
            </svg>
        </div>
        <div class="menuBtn" type="button">
            <svg  width="60" height="60" viewBox="0 0 60 60">
                <circle i cx="30" cy="30" r="30" fill="#7fc4fd"/>
                <g transform="translate(15.001 17)">
                    <path d="M0,26.429V21.637H18.75v4.792Zm0-9.737V10.819H30v5.873ZM0,5.873V0H30V5.873Z" transform="translate(0)" fill="#fff"/>
                </g>
            </svg>
        </div>
    </div>
    </div>
</template>

<script>
  export default {
    name: 'SideBar',
    data: () => ({
    }),
    methods: {
        goToMyPage() {
            this.$router.push({
                name: 'MyPage'
            })
        },
        goToSearch() {
            this.$router.push({
                name: 'Search'
            })
        },
        goToLiked() {
            this.$router.push({
                name: 'MyPage'
            })
        },
    },
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
</style>