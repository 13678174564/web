<template>
  <div class="shopcar-container">
      <div class="goods-list">
          <div class="mui-card" v-for="(item,i) in bookList" :key="item.id">
            <div class="mui-card-content">
              <div class="mui-card-content-inner">
                <mt-switch v-model="$store.getters.getCartSelected[item.id]"
                           @change="selectedChanged(item.id, $store.getters.getCartSelected[item.id])">
                </mt-switch>
                <img :src="item.thumbnail" />
                <div class="info">
                  <h1>{{ item.title }}</h1>
                  <p>
                    <span class="price">￥{{ item.sellPrice }}</span>
                    <numbox :value="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
                    <!-- 1. 我们可以先创建一个空对象，然后循环购物车中所有商品的数据， 把当前循环这条商品的Id，
                    作为对象的属性名，count值作为对象的属性值， 这样当把所有的商品循环一遍，就会得到一个对象：{ 37: 2, 38: 1} -->
                    <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                  </p>
              </div>
            </div>
          </div>
      </div>
        <!-- 结算区域 -->
        <div class="mui-card">
          <div class="mui-card-content">
            <div class="mui-card-content-inner jiesuan">
              <div class="left">
                <p>总计（不含运费）</p>
                <p>
                  已勾选商品
                  <span class="red">{{ $store.getters.getCartCountAndAmount.count }}</span> 件， 总价
                  <span class="red">￥{{ $store.getters.getCartCountAndAmount.amount }}</span>
                </p>
              </div>
              <mt-button type="danger">去结算</mt-button>
            </div>
          </div>
        </div>
  </div>

  </div>
</template>

<script>

import numbox from '@/components/Cartnumbox'
export default {
  name: "ShopcarContainer",
  components:{
    numbox
  },
  data() {
    return {
      selectedCount:'',
      bookList: [] // 购物车中所有图书商品的数据
    };
  },
  created() {
    this.getBooksList();
  },
  methods:{
    selectedChanged(id,val){
      this.$store.commit("updateCartSelected", { id, selected: val });
    },
    remove(id,index){
      this.bookList.splice(index,1);
      this.$store.commit("removeCartById",id)
    },
    getBooksList(){
      console.log('this.$store.state.cart',this.$store.state.cart);
      let idArrs = this.$store.state.cart.map(item=>item.id);
      if(idArrs.length<=0){
        return [];
      }
      // 获取购物车商品列表
      this.$axios
          .post("/book/getshopcartlist", { ids: idArrs.join(",") })
          .then(result => {
            console.log('result',result)
            if (result.data.code === '200') {
              this.bookList = result.data.data;
            }
            console.log('this.bookList',this.bookList)
          });

    }
  }
}
</script>

<style scoped>

</style>