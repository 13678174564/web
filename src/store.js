import Vue from 'vue';
import Vuex from 'vuex';
const cartKey="$cart";
Vue.use(Vuex);
const  store=new Vuex.Store({
    state:{
        cart:JSON.parse(localStorage.getItem(cartKey)||'[]')
    },
    mutations:{
        addCar(state,info){
            let flag=false;
            state.cart.some(item=>{
                if(item.id===info.id){
                    item.count+=parseInt(info.count);
                    flag=true;
                    return true;
                }
            })
            if(!flag){
                state.cart.push(info)
            }
            localStorage.setItem(cartKey,JSON.stringify(state.cart))
        },
        updateCartInfo(state,info){
            let cars=state.cart;
            let findIndex = state.cart.findIndex(item=>item.id===parseInt(info.id));
            cars[findIndex].count=info.count;
            localStorage.setItem(cartKey,JSON.stringify(cars));
        },
        updateCartSelected(state,info){
            let cars=state.cart;
            let findIndex = state.cart.findIndex(item=>item.id===parseInt(info.id));
            cars[findIndex].selected=info.selected;
            localStorage.setItem(cartKey,JSON.stringify(cars));
        },
        removeCartById(state,id){
            let findIndex = state.cart.findIndex(item=>item.id===parseInt(id));
            state.cart.splice(findIndex,1);
            localStorage.setItem(cartKey,JSON.stringify(state.cart));
        }
    },
    getters:{
        getCartAllCount(state){
            console.log(state.cart.map(item=>item.count).reduce((prev,curr)=>prev+curr,0))
            return state.cart.map(item=>item.count).reduce((prev,curr)=>prev+curr,0)
        },
        getCartSelected(state){
            const obj={};
            state.cart.forEach(item=>obj[item.id]=item.selected)
            return obj;
        },
        getGoodsCount(state){
            const obj={};
            state.cart.forEach(item=>obj[item.id]=item.count)
            return obj;
        },
        getCartCountAndAmount(state){
            let obj = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            };
            state.cart.forEach(item => {
                if (item.selected) {
                    obj.count += item.count;
                    obj.amount += item.price * item.count;
                }
            });
            return obj;
        }
    }
});
export default store;