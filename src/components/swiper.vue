<template>
  <div>
    <mt-swipe :auto="3000" :style="{'height':height}">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="item in dataItem" :key="item.img_url">
        <img :src="item.img_url" alt :class="{'full': isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    dataItem: { type: Array, default: () => [] },
    isfull: { type: Boolean, default: true },
    height: { type: String, default: "200px" }
  }
}
</script>

<style lang="scss" scoped>
.mint-swipe {
.mint-swipe-item {
  text-align: center;
img {
 //width: 100%;
  height: 100%;
}
}
}
.full {
  width: 100%;
}
</style>