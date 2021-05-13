import axios from '../utils/request'
import base from './base'
const api = {
    // 登录
    getLogin(params) {
        return axios.post(base.login, params)
    },
    // 注册
    getRegister(params) {
        return axios.post(base.register, params)
    },
    // 商品管理列表
    getProjectList(params) {
        return axios.get(base.projectList, { params })
    },
    // 商品搜索
    getSearchList(params) {
        return axios.get(base.search, { params })
    },
    //类目结构
    getItemCategory(params) {
        return axios.get(base.itemCategory, { params })
    },
    //商品添加
    getInsertTbItem(params) {
        return axios.get(base.insertTbItem, { params })
    },
    //商品删除
    getDeleteItemById(params) {
        return axios.get(base.deleteItemById, { params })
    },
    //批量删除商品
    getBatchDelete(params) {
        return axios.get(base.batchDelete, { params })
    },
    //修改商品
    getUpdateTbItem(params) {
        return axios.get(base.updateTbItem, { params })
    },
    //规格参数
    getItemParam(params) {
        return axios.get(base.itemParam, { params })
    },
    //规格参数搜索
    getParamsSearch(params) {
        return axios.get(base.paramsSearch, { params })
    },
    //规格参数删除
    getParamsDelete(params) {
        return axios.get(base.paramsDelete, { params })
    }
}

export default api