<template>
  <v-app>
    <!--<router-view></router-view>-->
    <Navbar></Navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Navbar from './components/Navbar'
export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  })
}
</script>
