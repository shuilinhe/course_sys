import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'

import Recycle from '../views/RecycleView/Recycle.vue'

import Teacher from '../views/TeacherView/Teacher.vue' 

import Register from '../views/LoginView/Register.vue'
import ForgotPassword from '../views/LoginView/ForgotPassword.vue'
import LoginUser from '../views/LoginView/LoginUser.vue'
import LoginPhone from '../views/LoginView/LoginPhone'

import Supervisor from '../views/SupervisorView/Supervisor.vue'

import Course from '../views/CourseView/Course.vue'
import CourseTag from '../views/CourseView/CourseTag'

Vue.use(VueRouter)

const routes = [
  
]

const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/loginuser'},
    {path:'/loginuser',component:LoginUser},
    {path:'/loginphone',component:LoginPhone},
    {path:'/register',component:Register},
    {path:'/forgot-pwd',component:ForgotPassword},
    {path:'/home',component:Home,redirect:'/welcome',
    children:[{path:'/welcome',component:Welcome},
              {path:'/supervisor',component:Supervisor},
              {path:'/course',component:Course},
              {path:'/recycle',component:Recycle},
              {path:'/teacher',component:Teacher},
              {path:'/coursetag',component:CourseTag},

    ]},

  ]
})

export default router
