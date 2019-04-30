<template>
  <div grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-layout justify-center>
        <v-flex xs6>
          <v-card>
            <v-card-title>
              Menu Table
              <v-spacer></v-spacer>
              <v-card-actions>
                <td>
                  <v-btn color="green darken-1" flat @click="addMultipleToCart">Add to cart</v-btn>
                </td>
              </v-card-actions>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-model="selected"
              :headers="addHeadersToMenu"
              :items="addItemsToMenu"
              :search="search"
              select-all
              item-key="item"
              class="elevation-1"
            >
              <template v-slot:headers="props">
                <tr>
                  <th>
                    <v-checkbox
                      :input-value="props.all"
                      :indeterminate="props.indeterminate"
                      primary
                      hide-details
                      @click.stop="toggleAll"
                    ></v-checkbox>
                  </th>
                  <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
                </tr>
              </template>
              <template v-slot:items="props">
                <tr @click="arrItem(props.item)">
                  <td>
                    <v-checkbox
                      :input-value="props.selected"
                      primary
                      hide-details
                      @click.stop="props.selected = !props.selected"
                    ></v-checkbox>
                  </td>
                  <td>{{ props.item.no }}</td>
                  <td>{{ props.item.item }}</td>
                  <td>{{ props.item.price }}</td>
                </tr>
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >You searched for "{{ search }}". No results found.</v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout v-if="addItemsToCart.length > 0" row wrap>
        <v-flex xs6>
          <v-card>
            <v-card-title>
              Order Table
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn color="green darken-1" flat>Order Now</v-btn>
                <v-btn color="red darken-1" flat @click="onReset">Reset</v-btn>
              </v-card-actions>
            </v-card-title>

            <v-data-table :headers="addHeadersToMenu" :items="addItemsToCart" class="elevation-1">
              <template v-slot:items="props">
                <tr>
                  <td>{{ props.item.no }}</td>
                  <td>{{ props.item.item }}</td>
                  <td class="text-xs-center">{{ props.item.price }}</td>
                </tr>
              </template>
              <template v-slot:footer>
                <td :colspan="headers.length">
                  <strong>Total</strong>
                </td>
                <td></td>
                <td>Rs.{{ cartTotal }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <strong>Item:</strong>
          {{ newItem.item }},
          <strong>Price:</strong>
          Rs.{{ newItem.price }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.stop="addToCart">Add</v-btn>
          <v-btn color="red darken-1" flat @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      headers: [],
      items: [],
      search: "",
      dialog: false,
      selected: [],
      arr: [],
      newItem: {},
      tabFlag: false,
      isAvailable: false
    };
  },
  computed: {
    addHeadersToMenu() {
      return this.$store.getters.addHeadersToMenu;
    },
    addItemsToMenu() {
      return this.$store.getters.addItemsToMenu;
    },
    addItemsToCart() {
      return this.$store.getters.addItemsToCart;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    }
  },
  created() {
    this.$store.dispatch("fetchItems", "/static/Menu.json").then(response => {
      this.flag = true;
      this.items = response.data.items;
      this.items = response.data.headers;
    });
    // axios.get("/static/Menu.json").then(response => {
    //   this.flag = true;
    //   this.headers = response.data.headers;
    // });

    // axios.get("/static/Menu.json").then(response => {
    //   this.flag = true;
    //   this.items = response.data.items;
    // });
  },
  methods: {
    arrItem(items) {
      this.newItem = items;
      this.dialog = true;
    },
    addToCart() {
      if (this.addItemsToCart.length == 0) {
        this.$store.dispatch("addToCart", this.newItem);
        console.log("newitem",this.newItem);
        // this.arr.push(this.newItem);
      } else {
        this.addItemsToCart.forEach(element => {
          if (this.addItemsToCart.no == element.no) {
            this.isAvailable = true;
          }
        });
        if (!this.isAvailable) {
          this.$store.dispatch("addToCart", this.newItem);
            console.log("newItem2", this.newItem);
          //this.arr.push(this.newItem);
        }
        this.isAvailable = false;
      }
      this.dialog = false;
    },
    onReset() {
      this.arr = [];
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.newItem.slice();
    },
    addMultipleToCart() {
      if (this.addItemsToCart.length == 0) {
        this.$store.dispatch("addMultipleToCart", this.selected);
      } else {
        let uniqueElements = [];
        this.selected.forEach(selectedElement => {
          let dontAdd = false;
          this.addItemsToCart.forEach(alreadyAddedElement => {
            if (selectedElement.no == alreadyAddedElement.no) dontAdd = true;
          });
          console.log(dontAdd);
          if (!dontAdd) {
            uniqueElements.push(selectedElement);
            this.$store.dispatch("addMultipleToCart", uniqueElements);
          }
        });
      }
    }
  }
  // getters:{
  //   // cartTotal() {
  //   //   let order = state.cartItems;
  //   //   order.forEach(element => {
  //   //     state.orderTotal += element.price;
  //   //   });
  //   //   return state.orderTotal;
  //   // },
  //   cartTotal() {
  //     let order = this.addItemsToCart;
  //     order.forEach(element => {
  //       this.orderTotal += element.price;
  //     });
  //     return this.orderTotal;
  //   }
  // }
};
</script>
