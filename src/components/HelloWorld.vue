<template>
  <v-container>
    <v-container v-show="valid === false">
      <v-text-field v-model="id" label="Id"></v-text-field>
      <v-text-field v-model="mpd" type="password" label="Password" ></v-text-field>
      <v-btn v-on:click="connexion">Log In</v-btn>
      <v-btn v-on:click="ajoutLog">Register</v-btn>
     </v-container>

     <v-container v-show="valid">
       <v-col cols="12" md="4">
            <v-btn v-on:click="deco">Logout</v-btn>
        </v-col>
     </v-container>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    valid: false,
    id: '',
    mpd: '',
    url: 'http://localhost:4000'
  }),
  methods: {
    async connexion () {
      // connecter l'utilisateur
      const answer = await this.axios.post(this.url + '/api/connexion', {
        login: this.id,
        mdp: this.mdp
      })
      if (answer.data.message === 'valid') {
        this.valid = true
      }
      console.log(answer.data.message)
    },
    async deco () {
      await this.axios.post(this.url + '/api/deco', {
      })
      this.valid = false
    },
    async ajoutLog () {
      const answer = await this.axios.post(this.url + '/api/ajoutLog', {
        login: this.id,
        mdp: this.mdp
      })
      console.log(answer.data.message)
    }
  }
}
</script>
