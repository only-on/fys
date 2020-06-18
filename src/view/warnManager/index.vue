<template>
  <div class="body">
    <Tabs :value="name" :animated="false">
      <TabPane label="固定资产预警管理" name="name1">
        <fixedWarn></fixedWarn>
      </TabPane>
      <TabPane label="租赁合同预警管理" name="name2">
        <contractWarn></contractWarn>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import contractWarn from './contractWarn/index'
  import fixedWarn from './fixedWarn/index'
  export default {
    components: {
      contractWarn,
      fixedWarn
    },
    data () {
      return {
        name: 'name1'
      }
    },
    methods: {

    },
    created:function () {
      if (this.$route.params.type === 1) {
        this.name = 'name2'
      }
    }
  }
</script>

<style scoped>

</style>
