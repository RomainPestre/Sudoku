<template >
  <div>
    <v-dialog max-width="500px" v-model="loginDialog">
      <template v-slot:activator="{on}">
          <v-btn v-on="on" class="blue--text  title" :hidden="loginBtnHidden">Login / Register</v-btn>
      </template>
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class=" title ">Login or Register here</v-toolbar-title>
        </v-toolbar>
        <v-form class="px-3 ml-3 py-3">
          <v-text-field class="mb-4" label="Username" v-model="loginInfos.username" prepend-icon="mdi-account"></v-text-field>
          <v-text-field label="Password" type="password" v-model="loginInfos.password" prepend-icon="mdi-lock"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="px-4 mb-1 mr-10 px-7 title" @click="login">Login</v-btn>
            <v-btn class="px-4 mb-1 px-5 title" @click="register">Register</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-btn :hidden="!loginBtnHidden" class="mx-12 px-8 blue--text" @click="logout">Log Out</v-btn>
  </div>
</template>

<script>
import { url } from './../apiURL'
export default {
  data () {
    return {
      connected: false,
      loginBtnHidden: false,
      loginDialog: false,
      error: '',
      loginInfos: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.axios.post(url + '/api/login', this.loginInfos)
        .then(response => {
          this.loginDialog = false
          this.loginBtnHidden = true
          this.connected = true
          this.$router.replace('/books')
        })
        .catch(error => { alert(error.response.data.message) })
    },
    register () {
      this.axios.post(url + '/api/register', this.loginInfos)
        .then(response => {
          this.loginDialog = false
          this.loginBtnHidden = true
          this.connected = true
          this.$router.replace('/books')
        })
        .catch(error => { alert(error.response.data.message) })
    },
    logout () {
      this.axios.get(url + '/api/logout')
        .then(response => {
          this.loginBtnHidden = false
          this.connected = false
          this.$router.replace('/')
        })
    }
  },
  created () {
    this.axios.get(url + '/api/isConnected')
      .then(response => {
        this.connected = response.data.connected
        this.loginBtnHidden = this.connected
        if (this.connected) this.$router.replace('/books')
      })
  }
}
</script>
