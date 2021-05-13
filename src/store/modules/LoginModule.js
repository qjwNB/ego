import api from '../../api'
import router from '../../router'
import jwt from "jwt-decode";
import element from 'element-ui'
export default {
    namespaced: true,
    state: {
        userInfo: {
            user: '',
            token: ''
        }
    },
    mutations: {
        setUser(state, params) {
            state.userInfo = params
        }
    },
    actions: {
        async setUserActions({ commit }, params) {
            let res = await api.getLogin(params)
            if (res.data.status === 200) {
                let userInfo = {
                    user: jwt(res.data.data).username,
                    token: res.data.data,
                };
                //存储到vuex
                commit('setUser', userInfo)
                //存储到本地
                localStorage.setItem('userToken', JSON.stringify(userInfo))
                //登录完成跳转
                router.push('/')
            }else{
                element.Message.error('用户名或密码输入错误！')
            }

        }
    }
}