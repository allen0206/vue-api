<template>
  <div>
    <loading :active.sync="isLoading"></loading>
     <div>
      <nav class="navbar navbar-light bg-light">
        <router-link to="/commodity">飽飽飽</router-link>
        <div class="text-right" style="position:relative">
          <a href="#" id="dropdown" data-toggle="dropdown" style="position:relative">
            <i class="fas fa-shopping-cart fa-2x"></i>
            <span
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
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="text-center mb-3 text-secondary">飽飽飽 結帳完成</h1>
          <section class="form-row align-items-center text-center">
            <div class="col">
              <div class="alert alert-success alert-rounded mb-0" role="alert">完成</div>
            </div>
          </section>

          <h4 class="text-center my-4">購買資訊</h4>
          <table class="table table-sm">
            <thead>
              <tr>
                <th width="100"></th>
                <th>商品名稱</th>
                <th width="100">數量</th>
                <th width="80">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle"></td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td>{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>
          <table class="table">
            <tbody>
              <tr>
                <th width="200">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === true">
            <router-link class="btn btn-outline-primary" to="/home/commodity">繼續選購</router-link>
          </div>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger" @click.prevent="payorder">確認付款去</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {}
      },
      isLoading: false
    };
  },
  methods: {
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
    getorder() {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order/${
        vm.orderId
      }`;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payorder() {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${
        vm.orderId
      }`;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.getorder();
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getorder();
    this.getcart();
  }
};
</script>
