import router from './index'
import store from '../store'
router.beforeEach((to, from, next) => {
    if (to.matched.length > 0 && !to.matched.some(record => record.meta.isLogin)) {
      next()
    }else{
      let token=store.state.LoginModule.userInfo.token
      if(token){
        next()
      }else{
        next('/login')
      }
    }
  })