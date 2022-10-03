<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in bookCategoryList" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class='mui-ellipsis'><span>{{item.msg}}</span></p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "bookCategory",
  data(){
    return  {
      bookCategoryList:[]
    }
  },
  created() {
    this.initData()
  },
  methods:{
    initData(){
      this.$axios.get("/book/getAllCategory").then(res=>{
        if(res.data.code==='200'){
          this.bookCategoryList=res.data.data;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .mui-table-view-cell{
    li{
      h1{
        font-size: 14px;
      }
    .mui-table-view-cell{
      font-size: 12px;
      color: #26a2ff;
      display: flex;
      justify-content: space-between;
    }
    }
  }
</style>