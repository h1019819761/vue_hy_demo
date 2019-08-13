<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  name: 'app',
  components: {
    FooterGuide
  },
  mounted() {
    this.$store.dispatch('getAddress'),
    this.$store.dispatch('getCategorys'),
    this.$store.dispatch('getShops'),
    this.$store.dispatch('autoLogin')
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%

</style>
