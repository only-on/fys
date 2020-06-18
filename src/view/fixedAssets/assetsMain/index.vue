<template>
  <div class="body">
    <Tabs value="name1" :animated="false">
      <TabPane label="维护记录管理" name="name1">
        <assetsMain></assetsMain>
      </TabPane>
      <TabPane label="维护提醒列表" name="name2">
        <warnList></warnList>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import assetsMain from './mainManger/index'
  import warnList from './warningList/index'
    export default {
      components: {
        assetsMain,
        warnList
      },
      data () {
        return {

        }
      }
    }
</script>

<style scoped>

</style>
