module.exports = {
    //SpringBoot 서버 접속 주소
    devServer: {
        proxy: "http://localhost:9999"
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
