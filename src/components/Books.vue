<template >
  <div style="margin-top:150px;" class="mx-auto" >
    <v-card
      style="box-sizing: border-box;"
      class="d-flex flex-row flex-wrap mb-6"
      color="grey lighten-5"
      tile
      min-width="300"
      max-width="1530"
    >
      <v-card class="mx-7 my-5 pa-1 " max-width="250" v-for="book in books" :key="book.id" > <!--liste livres-->
        <v-img
          :src="book.image"
          height="250"
          width="250"
        >
        </v-img>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>{{'by ' + book.author}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <a class="mx-auto" :href="book.moreInfo" target="_blank">More Infos</a>
          <v-btn text class="mx-auto red--text px-6" @click="deleteBook(book.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
      <AddBookDialog :myBooks="books" @bookChosen="addBook"></AddBookDialog> <!--ajouter un livre-->
    </v-card>
  </div>
</template>

<script>
import AddBookDialog from './AddBookDialog'
import { url } from './../apiURL'
export default {
  components: {
    AddBookDialog
  },
  data () {
    return {
      books: []
    }
  },
  methods: {
    getBooks () {
      this.axios.get(url + '/api/books')
        .then(response => { this.books = response.data.books })
    },
    addBook (id) {
      this.axios.post(url + '/api/addBook/' + id)
        .then(response => { this.getBooks() })
        .catch(error => alert(error.response.data.error))
    },
    deleteBook (id) {
      this.axios.post(url + '/api/deleteBook/' + id)
        .then(response => { this.getBooks() })
        .catch(error => alert(error.response.data.error))
    }
  },
  created () {
    this.axios.get(url + '/api/isConnected')
      .then(response => {
        if (!response.data.connected) this.$router.replace('/')
      })
    this.getBooks()
  }
}
</script>
