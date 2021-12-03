import { loginpage, registerpage, classlistpage, classaddpage } from "./template.js";

function login_check(to, from, next) {
    if(!sessionStorage.getItem("isLogin")) return next('/login');
    next();
}
export default new VueRouter({
    routes: [
        {
            path: '',
            redirect: '/login'            
        },
        {
            path: '/login',
            component: loginpage,
            beforeEnter: (to, from, next) => {            
                if(sessionStorage.getItem("isLogin")) return next('/classlist');                
                next();
            }
        },
        {
            path: '/register',
            component: registerpage,
            beforeEnter: (to, from, next) => {             
                if(sessionStorage.getItem("isLogin")) return next('/classlist');                
                next();
            }
        },
        {
            path: '/classlist',
            component: classlistpage,
            beforeEnter: (to, from, next) => {            
                login_check(to, from, next);
            },
            props: true
        },
        {
            path: '/classadd',        
            component: classaddpage,
            beforeEnter: (to, from, next) => {            
                login_check(to, from, next);
            }
        }
    ]
})