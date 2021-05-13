module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',//目的地址路径
                changeOrigin: true,//允许跨域
                pathRewrite: {//重定向
                    "^/api": ""
                }
            } 
        }
    }
}