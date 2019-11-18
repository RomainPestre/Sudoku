<template >
  <v-app-bar app dark>
    <v-toolbar-title class="mx-12 title">Books Database</v-toolbar-title>
    <v-spacer></v-spacer>
    <Login></Login>
  </v-app-bar>
</template>

<script>
import Login from './Login'
export default {
  components: {
    Login
  }
}
</script>
