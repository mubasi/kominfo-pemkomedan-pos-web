<template>
  <div class="animated fadeIn">
    <div class="mt-4">
      <b-card>
        <div slot="header">
          Entry Data Agama
          <div class="card-header-actions" style="height: 21px;">
            <router-link :to="'/panel/master-data/pengguna'" class="btn btn-sm btn-warning text-white"><i
                class="fa fa-arrow-left" /> Kembali</router-link>
          </div>
        </div>
        <form @submit.prevent="submit">

          <b-form-row class="mb-1">
            <b-col md="2">
              <label class="mt-1">Nama Lengkap</label>
            </b-col>
            <b-col md="10">
              <b-form-input v-model="form.nama" type="text" placeholder="Masukkan Nama Lengkap"></b-form-input>
              <div class="text-danger mt-1" v-if="errors != null">
                <ul>
                  <li v-for="(item, index) in errors.nama" :key="index"> {{ item }} </li>
                </ul>
              </div>
            </b-col>
          </b-form-row>

          <b-form-row class="mb-1">
            <b-col md="2">
              <label class="mt-1">Email</label>
            </b-col>
            <b-col md="10">
              <b-form-input v-model="form.email" type="text" placeholder="Masukkan Email"></b-form-input>
              <div class="text-danger mt-1" v-if="errors != null">
                <ul>
                  <li v-for="(item, index) in errors.email" :key="index"> {{ item }} </li>
                </ul>
              </div>
            </b-col>
          </b-form-row>

          <b-form-row class="mb-1">
            <b-col md="2">
              <label class="mt-1">Password</label>
            </b-col>
            <b-col md="10">
              <b-form-input v-model="form.password" type="password" placeholder="Masukkan Password"></b-form-input>
              <small class="text-warning" v-if="edit"> <i>Abaikan jika tidak merubah password</i> </small>
              <div class="text-danger mt-1" v-if="errors != null">
                <ul>
                  <li v-for="(item, index) in errors.password" :key="index"> {{ item }} </li>
                </ul>
              </div>
            </b-col>
          </b-form-row>

          <b-form-row class="mb-1">
            <b-col md="2">
              <label class="mt-1">Ulangi Password</label>
            </b-col>
            <b-col md="10">
              <b-form-input v-model="form.re_password" type="password" placeholder="Ulangi Password"></b-form-input>
              <small class="text-warning" v-if="edit"> <i>Abaikan jika tidak merubah password</i> </small>
              <div class="text-danger mt-1" v-if="errors != null">
                <ul>
                  <li v-for="(item, index) in errors.re_password" :key="index"> {{ item }} </li>
                </ul>
              </div>
            </b-col>
          </b-form-row>

          <b-form-row class="mb-1">
            <b-col md="2">
              <label class="mt-1">Sebagai</label>
            </b-col>
            <b-col md="10">
              <b-form-select v-model="form.role" :options="roles"></b-form-select>
              <div class="text-danger mt-1" v-if="errors != null">
                <ul>
                  <li v-for="(item, index) in errors.role" :key="index"> {{ item }} </li>
                </ul>
              </div>
            </b-col>
          </b-form-row>

          <b-form-row class="mb-1">
            <b-col md="2">
              <label>
                Aktif
              </label>
            </b-col>
            <b-col md="10">
              <b-form-radio-group v-model="form.aktif" :options="options" class="mb-3" value-field="item"
                text-field="name" disabled-field="notEnabled"></b-form-radio-group>
              <div class="text-danger mt-1" v-if="errors != null">
                <ul>
                  <li v-for="(item, index) in errors.aktif" :key="index"> {{ item }} </li>
                </ul>
              </div>
            </b-col>
          </b-form-row>

          <b-form-row class="mt-1">
            <b-col md="12" class="text-center mt-1">
              <b-button type="submit" variant="primary">Simpan</b-button>
            </b-col>
          </b-form-row>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
// import helpers from '../../helpers/helpers';
export default {
  name: "EntryUser",
  data() {
    return {
      form: {
        id: null,
        nama: '',
        email: '',
        password: '',
        re_password: '',
        role: '',
        aktif: 'Y',
      },
      options: [{
        item: 'Y',
        name: 'Y'
      },
      {
        item: 'N',
        name: 'N'
      },
      ],
      errors: "",
      edit: false,
      roles: [],
      path: '/api/pengguna',
      path_role: '/api/pengguna/role/getoption'
    }
  },
  created() {
    this.patchRole();
    let act = this.$route.params.act;
    if (act != 'add') {
      this.petchData(act);
    }
  },
  methods: {
    patchRole() {
      this.roles = [];
      axios.get(this.path_role).then((response) => {
        let data = response.data.data;

        data.forEach(element => {
          this.roles.push({
            value: element.id,
            text: element.name
          })
        });

      }).catch((error) => {
        // this.$swal.close();
      });
    },
    petchData(id) {
      this.$swal({
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
      });
      axios.get(this.path + '/' + id).then((response) => {
        this.$swal.close();
        let data = response.data.data;
        this.form = {
          id: data.id,
          nama: data.name,
          email: data.email,
          password: null,
          re_password: null,
          role: data.roles[0].id,
          aktif: data.active,
        };
        this.edit = true;
      }).catch((error) => {
        this.$swal.close();
      });
    },
    submit(e) {
      e.preventDefault();

      const self = this;
      self.errors = null;

      //   var formData = self.getherFormData();

      //   const config = {
      //     headers: {
      //       'content-type': 'multipart/form-data'
      //     }
      //   }

      self.$swal({
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          self.$swal.showLoading();
        },
      });

      axios.post(self.path, self.form)
        .then(function (response) {
          self.$swal.close();
          self.$swal({
            title: 'Data Berhasil Disimpan',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              // self.$route
              self.$router.push('/panel/master-data/pengguna');
            }
          });
        })
        .catch(function (error) {
          // console.log(error.response);
          if (error.response) {
            self.$swal.close();
            self.$swal({
              icon: 'error',
              title: 'Periksa kembali form anda',
              allowOutsideClick: false,
            });
            if (error.response.data) {
              self.errors = error.response.data;
            }
          }
        });
    },
    getherFormData() {

      let formData = new FormData();

      let status = this.$route.params.status;
      if (status != 'add') {
        formData.append('id', status);
      }
      formData.append('name', this.name);
      formData.append('urutan', this.urutan);
      formData.append('aktif', this.aktif);

      return formData;
    },
    onImageChange(e) {
      const image = e.target.files[0];
      if (image.size > 1024 * 512) {
        e.preventDefault();
        this.$swal({
          type: 'warning',
          title: 'Terjadi kesalahan',
          text: 'ukuran gambar melebihi 500Kb',
        })
        this.$refs.imgupload.value = null;
        this.urlImage = null;
        return;
      }

      this.gambar = image;
      this.urlImage = URL.createObjectURL(image);
    },
  }

}
</script>
