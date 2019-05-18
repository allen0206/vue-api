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
    <div class="container mt-3">
      <h1 class="text-center mb-3 text-secondary">六角血拼 結帳</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">1.輸入訂單資料</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">2.金流付款</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">3.完成</div>
        </div>
      </section>
      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center">
                <a data-toggle="collapse" href="#collapseOne">
                  顯示購物車細節
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span class="h3 ml-auto mb-0"></span>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in carts.carts" :key="item.id">
                  <td>
                    <button class="btn" @click.prevent="deletecart(item.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                  <td></td>
                  <td>{{item.product.title}}</td>
                  <td>{{item.qty}}</td>
                  <td>{{item.total}}</td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td>
                    <strong>{{carts.final_total}}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">訂購人資訊</h5>
          <form class="form" @submit.prevent="addform">
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
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
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
      length: '',
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
            if (response.data.success) {
              vm.$router.push(`/payment/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log("送出失敗");
        }
      });
    }
  },
  created() {
    this.getcart();
  }
};
</script>
