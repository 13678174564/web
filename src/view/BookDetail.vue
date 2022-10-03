<template>
  <div class="bookdetail-container">
<!--    小球动画-->
    <transition @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @enter="enter">
      <div class="ball" v-show="showBall" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :data-item="bookDetailData.swiperData" :isfull="false"></swiper>
        </div>
      </div>
    </div>
<!--    商品购买区域-->
    <div class="mui-card">
      <div class="mui-card-header">{{bookDetailData.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            定价:
              <del>￥{{bookDetailData.price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ bookDetailData.sellPrice }}</span>
          </p>
          <p>
            购买数量：
            <numbox v-model="selectedCount" :max="bookDetailData.stockQuantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" v-tap="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品编号：{{ bookDetailData.goodsNo }}</p>
          <p>库存数量：{{ bookDetailData.stockQuantity }}件</p>
          <p>出版时间：{{ bookDetailData.publishTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "@/components/swiper";
import numbox from '@/components/DetailNumber'
export default {
  name: "BookDetail",
  components:{
    swiper,
    numbox
  },
  created() {
    this.initData();
  },
  data(){
    return {
      id:this.$route.params.id,
      selectedCount:1,
      bookDetailData:{
        swiperData:[]
      },
      showBall:false
    }
  },
  methods:{
    initData(){
      this.$axios.get("/book/getDetail/" + this.id).then(res => {
        if (res.data.code ==="200") {
          this.bookDetailData = res.data.data;
        }
      });
    },
    addToShopCar(){
      this.showBall = !this.showBall;
      console.log('this.selectedCount',this.selectedCount);
      const goodsInfo={
        id:parseInt(this.id),
        count:this.selectedCount,
        price: this.bookDetailData.sellPrice,
        selected:true,
        amount:this.selectedCount*this.bookDetailData.sellPrice
      }
      this.$store.commit("addCar",goodsInfo);
    },
    beforeEnter(el){
      el.style.transform = "translate(0, 0)";
    },
    enter(el,done){
      el.offsetWidth;
      // 获取小球的在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取购物车图标在页面中的位置
      const badgePosition = document.getElementById("shopCar").getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "0.5s all cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(){
      this.showBall = !this.showBall;
    }
  }
}
</script>

<style lang="scss" scoped>
  .bookdetail-container{
    background-color: #eee;
    overflow: hidden;
    .ball{
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      top: 390px;
      left: 146px;
    }
  }
  /deep/ .mui-card-content {
    background-color: aliceblue;
  }
</style>