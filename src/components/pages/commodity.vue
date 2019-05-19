<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="img" style="position:relative;">
        <div style="background-color:black;">
          <nav class="navbar">
            <router-link to="/commodity" class="text-white">
              <h3>飽飽飽</h3>
            </router-link>
            <div class="text-right" style="position:relative">
              <a href="#" id="dropdown" data-toggle="dropdown" style="position:relative">
                <i class="fas fa-shopping-cart fa-2x text-white"></i>
                <span
                  v-if="length>0"
                  class="badge badge-secondary h4"
                  style="position:absolute; left:0px ;top:-15px"
                >{{length}}</span>
              </a>
              <div
                class="dropdown-menu pt-0"
                style="position:absolute; left:auto ;right:0;width:400px;"
              >
                <table class="table mb-0">
                  <thead>
                    <tr>
                      <th>刪除</th>
                      <th>名稱</th>
                      <th>價錢</th>
                      <th>數量</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(cart) in carts.carts" :key="cart.id">
                      <td>
                        <button class="btn" @click.prevent="deletecart(cart.id)">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                      <td>{{cart.product.title}}</td>
                      <td>{{cart.final_total}}</td>
                      <td>{{cart.qty}}{{cart.product.unit}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right">
                        <span>總金額</span>
                      </td>
                      <td class>
                        <span>{{carts.final_total}}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div class="text-right mr-3">
                  <router-link class="btn btn-primary" to="/information">結帳去</router-link>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="bg-black d-flex align-items-center justify-content-center mt-5" style="position:absolute; left:50%;top:50%; transform: translate(-50%,-50%)">
          <h2 class="text-white text-center">飽飽飽 讓你吃到飽</h2>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-2">
          <div class="list-group sticky-top">
            <a
              href="#"
              class="btn btn-outline-primary rounded-0"
              :class="{'active': tabs == 'all'}"
              @click.prevent="tabs = 'all'"
            >全部</a>
            <a
              href="#"
              class="btn btn-outline-primary rounded-0"
              :class="{'active': tabs == 'burger'}"
              @click.prevent="tabs = 'burger'"
            >漢堡</a>
            <a
              href="#"
              class="btn btn-outline-primary rounded-0"
              :class="{'active': tabs == 'other'}"
              @click.prevent="tabs = 'other'"
            >其他</a>
            <a
              href="#"
              class="btn btn-outline-primary rounded-0"
              :class="{'active': tabs == 'drink'}"
              @click.prevent="tabs = 'drink'"
            >飲料</a>
          </div>
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-4 mb-4" v-for="(item) in filterarr" :key="item.id">
              <div class="card border-0 shadow-sm">
                <div
                  style="height: 150px; background-size: cover; background-position: center"
                  :style="{backgroundImage:`url(${item.imageUrl})`}"
                ></div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                  <h5 class="card-title">
                    <a href="#" class="text-dark">{{item.title}}</a>
                  </h5>
                  <p class="card-text">{{item.content}}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <!-- <div class="h5">2,800 元</div> -->
                    <del class="h6">原價 {{item.origin_price}} 元</del>
                    <div class="h5">現在只要 {{item.price}} 元</div>
                  </div>
                </div>
                <div class="card-footer d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    @click.prevent="getproduct(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    查看更多
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm ml-auto"
                    @click.prevent="addcart(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary" @click="addcart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer class="bg-light text-muted py-5 container">
      <div>
        <ul class="list-inline text-center">
          <li class="list-inline-item">© Copright 2017 飽飽飽</li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fa fa-instagram" aria-hidden="true"></i> Instagrame
            </a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook
            </a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">About</a>
          </li>
        </ul>
        <p class="text-center">Made with Bootstrap4</p>
      </div>
    </footer>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [],
      isLoading: false,
      product: {},
      status: {
        loadingItem: ""
      },
      carts: {},
      length: "",
      tabs: "all"
    };
  },
  methods: {
    getproducts() {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/products`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.products.reverse();
        vm.isLoading = false;
        console.log(vm.products);
      });
    },
    getproduct(id) {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.status.loadingItem = id;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.product = response.data.product;
        $("#product").modal("show");
        vm.status.loadingItem = "";
        console.log(vm.product);
      });
    },
    addcart(id, qty = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };
      vm.status.loadingItem = id;
      vm.$http.post(api, { data: cart }).then(response => {
        console.log(response.data);
        $("#product").modal("hide");
        vm.status.loadingItem = "";
        vm.getcart();
      });
    },
    getcart() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.carts = response.data.data;
        vm.length = vm.carts.carts.length;
        vm.isLoading = false;
        console.log(vm.carts, vm.carts.carts.length);
      });
    },
    deletecart(id) {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.delete(api).then(response => {
        console.log(response.data);
        vm.getcart();
        vm.isLoading = false;
      });
    }
  },
  computed: {
    filterarr() {
      const vm = this;
      if (vm.tabs === "all") {
        return vm.products;
      } else if (vm.tabs === "burger") {
        return vm.products.filter(item => {
          return item.category === "漢堡";
          console.log(item);
        });
      } else if (vm.tabs === "drink") {
        return vm.products.filter(item => {
          return item.category === "飲料";
        });
      } else if (vm.tabs === "other") {
        return vm.products.filter(item => {
          return item.category === "其他";
        });
      }
    }
  },
  created() {
    this.getproducts();
    this.getcart();
  }
};
</script>

<style lang="css" scoped>
.img {
  background-image: url("https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
  height: 420px;
  background-position: bottom;
  background-size: cover;
}
.bg-black {
  height: 150px;
  background-color: black;
  opacity: 0.6;
  width: 40%;
}
</style>

