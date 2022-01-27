module.exports = {
    //outputDir : npm run build로 빌드 시에 파일이 생성되는 위치
    outputDir: "C:/Users/JISU/2021-07/dalc1/src/main/resources/static/vue",

    //indexPath : index.html 파일이 생성될 위치
    indexPath: "C:/Users/JISU/2021-07/dalc1/src/main/resources/static/vue/index.html",

    //SpringBoot 서버 접속 주소
    devServer: {
        proxy: "http://localhost:8080"
    },

    chainWebpack: config => {  
        const svgRule = config.module.rule("svg");    
        svgRule.uses.clear();    
        svgRule.use("vue-svg-loader").loader("vue-svg-loader");  
    },

    transpileDependencies: [
      'vuetify'
    ]
};
