import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import SignIn from '@/views/SignIn';
import LogIn from '@/views/LogIn';
import MyProfile from '@/views/MyProfile';
import RecoveryPassword from '@/views/RecoveryPassword';
import ChangePassword from '@/views/ChangePassword';
import Landing from '@/views/Landing';
import PostsView from '@/views/PostsView'
import ViewError from '@/views/ViewError'

import UserProfile from '@/views/UserProfile'

Vue.use(Router);

export default new Router({
    mode: 'history',
    
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignIn
        },
        {
            path: '/log-In',
            name: 'log-in',
            component: LogIn
        },
        {
            path: '/recovery-password',
            name: 'recovery-password',
            component: RecoveryPassword
        },
        {
            path: '/change-password',
            name: 'change-password',
            component: ChangePassword,
        },
        {
            path: '/landing',
            name: 'landing',
            component: Landing,
        },
        {
            path: '/token',
            name: 'token',
            component: Landing
        },
        {
            path: '/my-profile/:id',
            name: 'my-profile',
            component: MyProfile
        },
        {
            path: '/my-profile',
            name: 'my-login-profile',
            component: MyProfile
        },
        {
            path: '/user-profile/:id',
            name: 'user-profile',
            component: UserProfile,
            props: true
        },
        {
            path: '/posts-view',
            name: 'posts-view',
            component: PostsView,
        },
        {
            path: '*',
            name: 'view-error',
            component: ViewError
        }
    ]
});