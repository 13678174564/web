<template>
  <div class="mui-numbox" data-number-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" :value="value" readonly ref="numbox" @change="countChange"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '@/libs/mui/js/mui.min'
export default {
  name: "DetailNumber",
  props:['value','max'],
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods:{
    countChange(){
       console.log('this.value',this.value)
       this.$emit("input",parseInt(this.$refs.numbox.value))
    }
  },
  watch:{
    max(newVal,oldVal){
      mui(".mui-numbox").numbox().setOption("max",newVal)
    }
  }
}
</script>

<style scoped>

</style>