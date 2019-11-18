<template>
  <div>
    <v-dialog scrollable max-width="500px" v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-card class="mx-7 my-5" width="250">
          <v-card-actions>
            <v-btn color="success" fab x-large dark style="margin: 150px auto" v-on="on" @click="getBooks">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
      <v-card>
        <v-card-title>Select a Book</v-card-title>
        <v-card-text>
        <v-list-item v-for="book in filteredBooks" :key="book.id" class="my-7">
          <v-list-item-avatar>
            <v-img  :src="book.image"  height="50"  width="50" ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn text @click="bookChosen(book.id)">{{book.title}}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { url } from './../apiURL'
export default {
  data () {
    return {
      allBooks: [],
      dialog: false,
      filteredBooks: []
    }
  },
  methods: {
    bookChosen (id) {
      this.dialog = false
      this.$emit('bookChosen', id)
    },
    getBooks () {
      this.axios.get(url + '/api/books')
        .then(response => {
          this.filteredBooks = this.allBooks.filter(a => !response.data.books.find(x => parseInt(x.id) === parseInt(a.id)))
        })
    }
  },
  created () {
    this.axios.get(url + '/api/allBooks')
      .then(response => {
        this.allBooks = response.data.books
      })
  }
}
</script>

<style>

</style>
