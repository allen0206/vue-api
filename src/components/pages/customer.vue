<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-4 text-right">
      <button class="btn btn-primary">購物車</button>
    </div>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="(item) in products" :key="item.id">
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

    <table class="table">
      <thead>
        <th></th>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
      </thead>
      <tbody>
        <tr v-for="item in carts.carts" :key="item.id">
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deletecart(item.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="align-middle">
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">已套用優惠券</div>
          </td>
          <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="align-middle">{{ item.final_total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ carts.total }}</td>
        </tr>
        <tr v-if="carts.final_total !== carts.total">
          <td colspan="3" class="text-right text-success">折扣價</td>
          <td class="text-right text-success">{{ carts.final_total }}</td>
        </tr>
      </tfoot>
    </table>

    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="addform">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
          >
          <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('name')}"
          >
          <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
            v-validate="'required|numeric'"
            data-vv-as="field"
            name="numeric_field"
            :class="{'is-invalid': errors.has('name')}"
          >
          <span
            class="text-danger"
            v-if="errors.has('numeric_field')"
          >{{errors.first('numeric_field')}}</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('name')}"
          >
          <span class="text-danger" v-if="errors.has('address')">請輸入地址</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
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
            <img :src="product.image" class="img-fluid" alt>
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
      form: {
        user: {
          email: "",
          name: "",
          address: "",
          tel: ""
        },
        message: ""
      },
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
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
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
        vm.isLoading = false;
        console.log(vm.carts);
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
    },
    addform() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then(result => {
        if (result) {
          vm.$http.post(api, { data: order }).then(response => {
            console.log(response.data);
            if(response.data.success){
              vm.$router.push(`checkout/${response.data.orderId}`)
            }
            vm.isLoading = false;
          });
        } else {
          console.log("送出失敗");
        }
      });
    },
  },
  created() {
    this.getproducts();
    this.getcart();
  }
};
</script>
