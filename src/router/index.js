import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../view/login.vue'
import Domain from '../view/domain/domain.vue'
import Price from '../view/domain/price.vue'
import Query from '../view/domain/query.vue'
import Whois from '../view/domain/whois.vue'
import Developer from '../view/personal/developer.vue'
import MyDomain from '../view/myDomain/myDomain.vue'
import DomainMessage from '../view/myDomain/domainMessage.vue'
import EditDomain from '../view/myDomain/editDomain.vue'

Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点导航，路由重复的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/domain',
      component: Domain,
      children: [
        {
          path: '/',
          redirect: {
            name: 'query'
          }
        },
        {
          path: 'price',
          component: Price
        },
        {
          path: 'query',
          name: 'query',
          component: Query
        },
        {
          path: 'whois',
          component: Whois
        },
        {
          path: 'developer',
          component: Developer
        },
        {
          path: 'myDomain',
          component: MyDomain
        },
        {
          path: 'domainMessage',
          component: DomainMessage
        },
        {
          path: 'editDomain',
          component: EditDomain
        }
      ]
    }
  ]
})
