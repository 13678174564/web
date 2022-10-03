import VueRouter from "vue-router";

const router=new VueRouter({
    routes:[
        {
          path:'/',
          redirect:'/home'
        },
        {
            path:'/home',
            component:()=>import('./components/nav/HomeContainer'),
            meta:{title:'首页'}
        },
        {
            path:'/shopcar',
            component:()=>import('./components/nav/ShopcarContainer'),
            meta:{title:'购物车'}
        },
        {
            path:'/my',
            component:()=>import('./components/nav/MyContainer'),
            meta:{title:'我的'}
        },
        {
            path:'/order',
            component:()=>import('./components/nav/OrderContainer'),
            meta:{title:'订单'}
        },
        {
            path:'/book-category',
            component:()=>import('./view/bookCategory'),
            meta:{title:'商品分类'}
        },
        {
            path:'/programming-book',
            component:()=>import('./view/ProgrammingBook'),
            meta:{title:'编程书籍'}
        },
        {
            path:'/book-detail/:id',
            component:()=>import('./view/BookDetail'),
            meta:'图书明细'
        }
    ],
    linkActiveClass:'mui-active'
})

export  default router