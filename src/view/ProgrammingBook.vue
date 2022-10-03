<template>
  <div>
    <div id="slider" class="mui-slider ">
      <div id="sliderSegmentedControl"
           class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a v-for="item in bookCategory" :key="item.id"
             class="mui-control-item "
             :class="{'mui-active':item.id===3}"
             @tap="getPhotosByCateId(item.id)"
             v-text="item.name"
          >
          </a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in photos" :key="item.id" :to="'/book-detail/' + item.id" tag="li">
        <img v-lazy="item.url">
        <div class="msg">
          <h1 class="msg-title">{{ item.title }}</h1>
          <div class="msg-body">{{ item.msg }}</div>
        </div>
      </router-link>
    </ul>
  </div>

</template>

<script>
import mui from "../libs/mui/js/mui.min.js";

export default {
  name: "ProgrammingBook",
  created() {
    this.getProgramBookSubCategory();
  },
  data() {
    return {
      bookCategory: [],
      photos: []
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getPhotosByCateId(id) {
      this.$axios.get("/book/getPhotosByCateId" + "/" + id).then(res => {
        if (res.data.code === "200") {
          console.log(res.data.data)
          this.photos = res.data.data;
        }
      });
    },
    getProgramBookSubCategory() {
      this.$axios.get("/book/getProgramBookSubCategory").then(res => {
        if (res.data.code === '200') {
          this.bookCategory = res.data.data;
        }
      })
    }
  }
}
</script>

<style scoped>
* {
  touch-action: pan-y;
}

.mui-slider {
  background-color: white;
  position: fixed;
}

.photo-list {
  list-style: none;
  margin: 0;
}

li {
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #eee;
  position: relative;
}
img {
  width: 100%;
  vertical-align: middle;
}

img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.msg {
  color: white;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(141, 133, 133, 0.4);
  max-height: 88px;
}
.msg-title {
  font-size: 14px;
}

.msg-body {
  font-size: 13px;
  padding: 0px 8px;
 display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
 overflow: hidden;

  line-height: 20px;
  margin-bottom: 5px;
}


</style>