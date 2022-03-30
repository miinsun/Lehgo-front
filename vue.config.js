module.exports = {
    //SpringBoot 서버 접속 주소
    devServer: {
        disableHostCheck: true,
        proxy: "http://3.37.127.183:9999"
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
