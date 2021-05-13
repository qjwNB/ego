export default {
    baseUrl: 'http://localhost:4000',
    login: '/api/api/login',//登录接口
    register: '/api/api/register',//注册接口
    projectList: '/api/api/projectList',//商品管理接口
    search: '/api/api/search',//搜索接口
    itemCategory: '/api/api/backend/itemCategory/selectItemCategoryByParentId',//类目结构数据获取
    uploadImg: '/api/upload',//上传图片
    insertTbItem: '/api/api/backend/item/insertTbItem',//商品添加
    updateTbItem:'/api/api/backend/item/updateTbItem',//修改商品
    deleteItemById: "/api/api//backend/item/deleteItemById",//商品删除
    batchDelete: '/api/api//batchDelete',//批量删除商品
    itemParam: '/api/api/backend/itemParam/selectItemParamAll',//规格参数接口
    paramsSearch: '/api/api/params/search',//规格参数搜索接口
    paramsDelete:'/api/api/params/delete',//规格参数删除
}