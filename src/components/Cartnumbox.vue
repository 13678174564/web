<template>
  <div class="mui-numbox" data-number-min="1" style="height: 25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" :value="value" readonly ref="numbox" @change="countChange"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '@/libs/mui/js/mui.min'
export default {
  name: "Cartnumbox",
  props:['value','id'],
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods:{
    countChange(){
      this.$store.commit('updateCartInfo',{
        id:this.id,
        count:parseInt(this.$refs.numbox.value)
      })
    }
  }
}
</script>

<style scoped>

</style>