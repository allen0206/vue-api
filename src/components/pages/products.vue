<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-3">
      <button class="btn-primary btn" @click.prevent="openmodal(true)">新增</button>
    </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <th width="100">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-right">原價</th>
          <th width="120" class="text-right">售價</th>
          <th width="120" class="text-center">是否啟用</th>
          <th width="160" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price | currency}}</td>
          <td class="text-right">{{item.price | currency}}</td>
          <td class="text-center">
            <span v-if="item.is_enabled === 1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-primary" @click.prevent="openmodal(false,item)">編輯</button>
              <button class="btn btn-outline-danger" @click.prevent="deleteproduct(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"  @click.prevent="getproducts(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active': pagination.current_page} === page">
          <a class="page-link" href="#" @click.prevent="getproducts(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}" >
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getproducts(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="temproduct.imageUrl"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileuploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadfile"
                  >
                </div>
                <img :src="temproduct.imageUrl" class="img-fluid" alt>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="temproduct.title"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="temproduct.category"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="temproduct.unit"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="temproduct.origin_price"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="temproduct.price"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="temproduct.desciption"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="temproduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="temproduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    >
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updatedproduct">確認</button>
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
      pagination: {},
      temproduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileuploading: false
      }
    };
  },
  methods: {
    getproducts(page = 1) {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/products?page=${page}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
        console.log(vm.products);
      });
    },
    openmodal(isNew, item) {
      if (isNew) {
        this.temproduct = {};
        this.isNew = true;
      } else {
        this.temproduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#edit").modal("show");
    },
    updatedproduct() {
      let api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/product`;
      const vm = this;
      let httpMethod = "post";
      if (!vm.isNew) {
        api = `${process.env.APIPATH}api/${
          process.env.CUSTOMPATH
        }/admin/product/${vm.temproduct.id}`;
        httpMethod = "put";
      }
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http[httpMethod](api, { data: vm.temproduct }).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        if (response.data.success) {
          $("#edit").modal("hide");
          vm.getproducts();
        } else {
          $("#edit").modal("hide");
          vm.getproducts();
          console.log("新增失敗");
        }
      });
    },
    deleteproduct(item) {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/product/${item.id}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.delete(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        if (response.data) {
          vm.getproducts();
        } else {
          vm.getproducts();
          alert("刪除失敗");
        }
      });
    },
    uploadfile() {
      console.log(this);
      const uploadedfile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedfile);
      const url = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/upload`;
      vm.status.fileuploading = true;
      vm.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          vm.status.fileuploading = false;
          if (response.data.success) {
            vm.$set(vm.temproduct, "imageUrl", response.data.imageUrl);
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getproducts();
  }
};
</script>
