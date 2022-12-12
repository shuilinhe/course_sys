module.exports = {
    devServer:{
        proxy:{
            '/':{
                target:"http://124.71.112.154:8001",
                changeOrigin:true,
            }
        }
    },

publicPath:'/course_sys/',
assetsDir:'static', 
parallel:false, 

    
};