"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_pages_produk_Entry_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/produk/Entry.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/produk/Entry.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import helpers from '../../helpers/helpers';
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "EntryUser",
  components: {},
  data: function data() {
    return {
      form_info_produk: {
        id: null,
        nama: "",
        harga: "",
        hpp: "",
        deskripsi: "",
        aktif: "Y"
      },
      form_gambar_produk: {
        id_produk: null,
        gambar: []
      },
      form_kategori_produk: {
        id_produk: null,
        kategori: []
      },
      options: [{
        item: "Y",
        name: "Y"
      }, {
        item: "N",
        name: "N"
      }],
      options_kategori: [],
      errors: "",
      edit: false,
      list_image: [],
      path_info_produk: "/api/produk",
      path_gambar_produk: "/api/gambar-produk",
      path_kategori_produk: "/api/kategori-produk",
      loadingWizard: true,
      errors_info_produk: null,
      errors_gambar_produk: null,
      errors_kategori_produk: null,
      step1: null,
      step2: null,
      step3: null
    };
  },
  created: function created() {
    this.patchKategori();
    this.petchDataEdit();
  },
  methods: {
    handleValidation: function handleValidation(isValid, tabIndex) {// console.log(tabIndex);
    },
    setLoading: function setLoading(value) {
      this.loadingWizard = value;
    },
    patchKategori: function patchKategori() {
      var _this = this;

      this.options_kategori = [];
      axios.get(this.path_kategori_produk + "/getoption").then(function (response) {
        var data = response.data.data;
        data.forEach(function (element) {
          _this.options_kategori.push({
            value: element.id,
            text: element.nama
          });
        });
      }).catch(function (error) {});
    },
    petchData: function petchData(id) {
      var _this2 = this;

      this.list_image = [];
      this.$swal({
        title: "Silahkan Tunggu . . .",
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: function onBeforeOpen() {
          _this2.$swal.showLoading();
        }
      });
      axios.get(this.path_info_produk + "/" + id).then(function (response) {
        _this2.$swal.close();

        var data = response.data.data;
        _this2.form_info_produk = {
          id: data.id,
          nama: data.nama,
          harga: data.harga,
          hpp: data.hpp,
          deskripsi: data.deskripsi,
          aktif: data.aktif
        };
        _this2.form_gambar_produk.id_produk = data.id;
        _this2.form_kategori_produk.id_produk = data.id;
        _this2.step1 = true;

        if (data.gambar_produk.length > 0) {
          _this2.step2 = true;
          data.gambar_produk.forEach(function (element) {
            _this2.list_image.push({
              id: element.id,
              status: "edit",
              file: response.data.status.url + "/" + element.path
            });
          });
        }

        if (data.kategori_produk_relasi.length > 0) {
          _this2.step3 = true;
          data.kategori_produk_relasi.forEach(function (element) {
            _this2.form_kategori_produk.kategori.push(element.kategori_produk.id);
          });
        }

        _this2.edit = true;
      }).catch(function (error) {
        _this2.$swal.close();
      });
    },
    stepOneProses: function () {
      var _stepOneProses = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.saveinfoproduk();

              case 2:
                if (!(this.form_info_produk.id != null)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", true);

              case 6:
                return _context.abrupt("return", this.step1);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function stepOneProses() {
        return _stepOneProses.apply(this, arguments);
      }

      return stepOneProses;
    }(),
    saveinfoproduk: function () {
      var _saveinfoproduk = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var self;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                self.errors_info_produk = null; // this.setLoading(true);

                _context2.next = 4;
                return axios.post(self.path_info_produk, self.form_info_produk).then(function (response) {
                  var id_produk = response.data.data.id;
                  self.form_info_produk.id = id_produk;
                  self.form_gambar_produk.id_produk = id_produk;
                  self.form_kategori_produk.id_produk = id_produk; // return true;
                  // this.setLoading(false);

                  // return true;
                  // this.setLoading(false);
                  self.step1 = true;
                }).catch(function (error) {
                  self.step1 = false; // this.setLoading(false);

                  // this.setLoading(false);
                  if (error.response) {
                    // self.errors_konfig_msg = "Terjadi kesalahan, silahkan coba lagi.";
                    if (error.response.data) {
                      self.errors_info_produk = error.response.data;
                    }
                  } // return false;

                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveinfoproduk() {
        return _saveinfoproduk.apply(this, arguments);
      }

      return saveinfoproduk;
    }(),
    stepTwoProses: function () {
      var _stepTwoProses = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.list_image.length == 0)) {
                  _context3.next = 5;
                  break;
                }

                this.errors_gambar_produk = {
                  gambar: ["The image field is required."]
                };
                return _context3.abrupt("return", false);

              case 5:
                if (!(this.form_gambar_produk.gambar.length > 0)) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 8;
                return this.saveGambarProduk();

              case 8:
                return _context3.abrupt("return", true);

              case 11:
                return _context3.abrupt("return", true);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stepTwoProses() {
        return _stepTwoProses.apply(this, arguments);
      }

      return stepTwoProses;
    }(),
    saveGambarProduk: function () {
      var _saveGambarProduk = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var self, formData, config;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                self = this;
                self.errors_gambar_produk = null;
                formData = self.getherFormData();
                config = {
                  headers: {
                    "content-type": "multipart/form-data"
                  }
                };
                _context4.next = 6;
                return axios.post(self.path_gambar_produk, formData, config).then(function (response) {
                  var data = response.data.data;
                  self.step2 = true;
                  self.form_gambar_produk.gambar = [];
                  self.petchDataEdit();
                }).catch(function (error) {
                  self.step2 = false;

                  if (error.response) {
                    if (error.response.data) {
                      self.errors_gambar_produk = error.response.data;
                    }
                  }
                });

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function saveGambarProduk() {
        return _saveGambarProduk.apply(this, arguments);
      }

      return saveGambarProduk;
    }(),
    stepThreeProses: function () {
      var _stepThreeProses = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.$swal({
                  title: "Silahkan Tunggu . . .",
                  showConfirmButton: false,
                  allowOutsideClick: false,
                  onBeforeOpen: function onBeforeOpen() {
                    _this3.$swal.showLoading();
                  }
                });
                _context5.next = 3;
                return this.saveKategoriProduk();

              case 3:
                this.$swal.close();

                if (this.step3) {
                  this.$swal({
                    title: "Data Berhasil Disimpan",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    allowOutsideClick: false
                  }).then(function (result) {
                    if (result.value) {
                      // self.$route
                      _this3.$router.push("/panel/master-data/produk");
                    }
                  });
                }

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function stepThreeProses() {
        return _stepThreeProses.apply(this, arguments);
      }

      return stepThreeProses;
    }(),
    saveKategoriProduk: function () {
      var _saveKategoriProduk = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var self;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                self = this;
                self.errors_kategori_produk = null; //   console.log(self.form_kategori_produk);

                _context6.next = 4;
                return axios.post(self.path_kategori_produk + "/save-produk", self.form_kategori_produk).then(function (response) {
                  self.step3 = true; // console.log(response.data);
                  // this.$swal.close();
                  // this.loadingWizard = false;
                  // status = true;
                  // return true;
                }).catch(function (error) {
                  // console.log(error.response);
                  self.step3 = false;

                  if (error.response) {
                    // this.$swal.close();
                    // this.$swal({
                    //     icon: 'error',
                    //     title: 'Periksa kembali form anda',
                    //     allowOutsideClick: false,
                    // });
                    if (error.response.data) {
                      self.errors_kategori_produk = error.response.data;
                    }
                  } // return false;

                });

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function saveKategoriProduk() {
        return _saveKategoriProduk.apply(this, arguments);
      }

      return saveKategoriProduk;
    }(),
    submit: function submit(e) {
      e.preventDefault();
      var self = this;
      self.errors = null; //   var formData = self.getherFormData();
      //   const config = {
      //     headers: {
      //       'content-type': 'multipart/form-data'
      //     }
      //   }

      self.$swal({
        title: "Silahkan Tunggu . . .",
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: function onBeforeOpen() {
          self.$swal.showLoading();
        }
      });
      axios.post(self.path, self.form).then(function (response) {
        self.$swal.close();
        self.$swal({
          title: "Data Berhasil Disimpan",
          icon: "success",
          confirmButtonColor: "#3085d6",
          allowOutsideClick: false
        }).then(function (result) {
          if (result.value) {
            // self.$route
            self.$router.push("/panel/master-data/pengguna");
          }
        });
      }).catch(function (error) {
        // console.log(error.response);
        if (error.response) {
          self.$swal.close();
          self.$swal({
            icon: "error",
            title: "Periksa kembali form anda",
            allowOutsideClick: false
          });

          if (error.response.data) {
            self.errors = error.response.data;
          }
        }
      });
    },
    getherFormData: function getherFormData() {
      var formData = new FormData();
      formData.append("produk_id", this.form_gambar_produk.id_produk); // formData.append('images', this.form_images.images);

      if (this.form_gambar_produk.gambar.length != 0) {
        for (var i = 0; i < this.form_gambar_produk.gambar.length; i++) {
          var file = this.form_gambar_produk.gambar[i];
          formData.append("gambar[" + i + "]", file);
        }
      }

      return formData;
    },
    onFileChange: function onFileChange(e) {
      this.errors_gambar_produk = null;
      var selectedFiles = e.target.files;

      for (var i = 0; i < selectedFiles.length; i++) {
        this.list_image.push({
          id: i + 1,
          status: "new",
          file: URL.createObjectURL(selectedFiles[i])
        });
        this.form_gambar_produk.gambar.push(selectedFiles[i]);
      }
    },
    deleteImage: function deleteImage(key, id, status) {
      var _this4 = this;

      if (status == "new") {
        this.list_image.splice(key, 1);
        this.form_gambar_produk.gambar.splice(key, 1);
      } else {
        this.$swal({
          title: "Peringatan",
          icon: "warning",
          text: "Apakah anda yakin ingin menghapus data ini?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          focusConfirm: false,
          confirmButtonText: "Proses"
        }).then(function (result) {
          if (result.value) {
            // alert('Helo')
            _this4.prosesDeleteImage(id);
          }
        });
      }
    },
    prosesDeleteImage: function prosesDeleteImage(id) {
      var _this5 = this;

      this.$swal({
        title: "Silahkan Tunggu . . .",
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: function onBeforeOpen() {
          _this5.$swal.showLoading();
        }
      });
      axios.delete(this.path_gambar_produk + "/" + id).then(function (response) {
        _this5.$swal({
          title: "Data Berhasil Dihapus",
          icon: "success",
          confirmButtonColor: "#3085d6",
          allowOutsideClick: false
        }).then(function (result) {
          if (result.value) {
            _this5.petchDataEdit();
          }
        });
      }).catch(function (error) {
        _this5.$swal({
          type: "error",
          title: "Silahkan Coba Lagi!",
          allowOutsideClick: false
        });
      });
    },
    petchDataEdit: function petchDataEdit() {
      var act = this.$route.params.act;

      if (act != "add") {
        this.petchData(act);
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/views/pages/produk/Entry.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/pages/produk/Entry.vue ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Entry_vue_vue_type_template_id_998193cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entry.vue?vue&type=template&id=998193cc& */ "./resources/js/views/pages/produk/Entry.vue?vue&type=template&id=998193cc&");
/* harmony import */ var _Entry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entry.vue?vue&type=script&lang=js& */ "./resources/js/views/pages/produk/Entry.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Entry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Entry_vue_vue_type_template_id_998193cc___WEBPACK_IMPORTED_MODULE_0__.render,
  _Entry_vue_vue_type_template_id_998193cc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/pages/produk/Entry.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/pages/produk/Entry.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/pages/produk/Entry.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Entry.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/produk/Entry.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/pages/produk/Entry.vue?vue&type=template&id=998193cc&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/pages/produk/Entry.vue?vue&type=template&id=998193cc& ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_template_id_998193cc___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_template_id_998193cc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_template_id_998193cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Entry.vue?vue&type=template&id=998193cc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/produk/Entry.vue?vue&type=template&id=998193cc&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/produk/Entry.vue?vue&type=template&id=998193cc&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/produk/Entry.vue?vue&type=template&id=998193cc& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "animated fadeIn" }, [
    _c(
      "div",
      { staticClass: "mt-4" },
      [
        _c(
          "b-card",
          [
            _c("div", { attrs: { slot: "header" }, slot: "header" }, [
              _vm._v("\n        Entry Produk\n        "),
              _c(
                "div",
                {
                  staticClass: "card-header-actions",
                  staticStyle: { height: "21px" },
                },
                [
                  _c(
                    "router-link",
                    {
                      staticClass: "btn btn-sm btn-warning text-white",
                      attrs: { to: "/panel/master-data/produk" },
                    },
                    [
                      _c("i", { staticClass: "fa fa-arrow-left" }),
                      _vm._v(" Kembali"),
                    ]
                  ),
                ],
                1
              ),
            ]),
            _vm._v(" "),
            _c(
              "form-wizard",
              {
                attrs: {
                  title: "Informasi Produk",
                  subtitle: "Silahkan lengkapi isian di bawah ini",
                },
                on: {
                  "on-validate": _vm.handleValidation,
                  "on-loading": _vm.setLoading,
                },
              },
              [
                _c(
                  "tab-content",
                  {
                    attrs: {
                      title: "Info Produk",
                      "before-change": _vm.stepOneProses,
                    },
                  },
                  [
                    _c(
                      "b-form-row",
                      { staticClass: "mb-1" },
                      [
                        _c("b-col", { attrs: { md: "2" } }, [
                          _c("label", { staticClass: "mt-1" }, [
                            _vm._v("Nama Produk"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-col",
                          { attrs: { md: "10" } },
                          [
                            _c("b-form-input", {
                              attrs: {
                                type: "text",
                                placeholder: "Masukkan Nama Produk",
                              },
                              model: {
                                value: _vm.form_info_produk.nama,
                                callback: function ($$v) {
                                  _vm.$set(_vm.form_info_produk, "nama", $$v)
                                },
                                expression: "form_info_produk.nama",
                              },
                            }),
                            _vm._v(" "),
                            _vm.errors_info_produk != null
                              ? _c("div", { staticClass: "text-danger mt-1" }, [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.errors_info_produk.nama,
                                      function (item, index) {
                                        return _c("li", { key: index }, [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(item) +
                                              "\n                  "
                                          ),
                                        ])
                                      }
                                    ),
                                    0
                                  ),
                                ])
                              : _vm._e(),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-form-row",
                      { staticClass: "mb-1" },
                      [
                        _c("b-col", { attrs: { md: "2" } }, [
                          _c("label", { staticClass: "mt-1" }, [
                            _vm._v("Harga Jual"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-col",
                          { attrs: { md: "10" } },
                          [
                            _c("b-form-input", {
                              attrs: {
                                type: "text",
                                placeholder: "Masukkan Harga Jual",
                              },
                              model: {
                                value: _vm.form_info_produk.harga,
                                callback: function ($$v) {
                                  _vm.$set(_vm.form_info_produk, "harga", $$v)
                                },
                                expression: "form_info_produk.harga",
                              },
                            }),
                            _vm._v(" "),
                            _vm.errors_info_produk != null
                              ? _c("div", { staticClass: "text-danger mt-1" }, [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.errors_info_produk.harga,
                                      function (item, index) {
                                        return _c("li", { key: index }, [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(item) +
                                              "\n                  "
                                          ),
                                        ])
                                      }
                                    ),
                                    0
                                  ),
                                ])
                              : _vm._e(),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-form-row",
                      { staticClass: "mb-1" },
                      [
                        _c("b-col", { attrs: { md: "2" } }, [
                          _c("label", { staticClass: "mt-1" }, [
                            _vm._v("Harga Modal"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-col",
                          { attrs: { md: "10" } },
                          [
                            _c("b-form-input", {
                              attrs: {
                                type: "text",
                                placeholder: "Masukkan Harga Modal",
                              },
                              model: {
                                value: _vm.form_info_produk.hpp,
                                callback: function ($$v) {
                                  _vm.$set(_vm.form_info_produk, "hpp", $$v)
                                },
                                expression: "form_info_produk.hpp",
                              },
                            }),
                            _vm._v(" "),
                            _vm.errors_info_produk != null
                              ? _c("div", { staticClass: "text-danger mt-1" }, [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.errors_info_produk.hpp,
                                      function (item, index) {
                                        return _c("li", { key: index }, [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(item) +
                                              "\n                  "
                                          ),
                                        ])
                                      }
                                    ),
                                    0
                                  ),
                                ])
                              : _vm._e(),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-form-row",
                      { staticClass: "mb-1" },
                      [
                        _c("b-col", { attrs: { md: "2" } }, [
                          _c("label", { staticClass: "mt-1" }, [
                            _vm._v("Deskripsi"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-col",
                          { attrs: { md: "10" } },
                          [
                            _c("b-form-textarea", {
                              attrs: {
                                id: "textarea",
                                placeholder: "Enter something...",
                                rows: "3",
                                "max-rows": "6",
                              },
                              model: {
                                value: _vm.form_info_produk.deskripsi,
                                callback: function ($$v) {
                                  _vm.$set(
                                    _vm.form_info_produk,
                                    "deskripsi",
                                    $$v
                                  )
                                },
                                expression: "form_info_produk.deskripsi",
                              },
                            }),
                            _vm._v(" "),
                            _vm.errors_info_produk != null
                              ? _c("div", { staticClass: "text-danger mt-1" }, [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.errors_info_produk.hpp,
                                      function (item, index) {
                                        return _c("li", { key: index }, [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(item) +
                                              "\n                  "
                                          ),
                                        ])
                                      }
                                    ),
                                    0
                                  ),
                                ])
                              : _vm._e(),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-form-row",
                      { staticClass: "mb-1" },
                      [
                        _c("b-col", { attrs: { md: "2" } }, [
                          _c("label", [_vm._v(" Aktif ")]),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-col",
                          { attrs: { md: "10" } },
                          [
                            _c("b-form-radio-group", {
                              staticClass: "mb-3",
                              attrs: {
                                options: _vm.options,
                                "value-field": "item",
                                "text-field": "name",
                                "disabled-field": "notEnabled",
                              },
                              model: {
                                value: _vm.form_info_produk.aktif,
                                callback: function ($$v) {
                                  _vm.$set(_vm.form_info_produk, "aktif", $$v)
                                },
                                expression: "form_info_produk.aktif",
                              },
                            }),
                            _vm._v(" "),
                            _vm.errors != null
                              ? _c("div", { staticClass: "text-danger mt-1" }, [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.errors.aktif,
                                      function (item, index) {
                                        return _c("li", { key: index }, [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(item) +
                                              "\n                  "
                                          ),
                                        ])
                                      }
                                    ),
                                    0
                                  ),
                                ])
                              : _vm._e(),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "tab-content",
                  {
                    attrs: {
                      title: "Gambar Produk",
                      "before-change": _vm.stepTwoProses,
                    },
                  },
                  [
                    _c("b-form-file", {
                      ref: "file",
                      staticClass: "mb-2",
                      attrs: { multiple: "", accept: "image/*" },
                      on: { change: _vm.onFileChange },
                      model: {
                        value: _vm.form_gambar_produk.gambar,
                        callback: function ($$v) {
                          _vm.$set(_vm.form_gambar_produk, "gambar", $$v)
                        },
                        expression: "form_gambar_produk.gambar",
                      },
                    }),
                    _vm._v(" "),
                    _c(
                      "b-row",
                      _vm._l(_vm.list_image, function (image, key) {
                        return _c(
                          "b-col",
                          { key: key, attrs: { md: "4", lg: "3" } },
                          [
                            _c(
                              "b-card",
                              {
                                staticClass: "mb-2 text-center",
                                staticStyle: { "max-width": "20rem" },
                                attrs: {
                                  title: "",
                                  "img-src": image.file,
                                  "img-alt": "Image",
                                  "img-top": "",
                                  tag: "article",
                                },
                              },
                              [
                                _c(
                                  "b-button",
                                  {
                                    attrs: { variant: "warning" },
                                    on: {
                                      click: function ($event) {
                                        return _vm.deleteImage(
                                          key,
                                          image.id,
                                          image.status
                                        )
                                      },
                                    },
                                  },
                                  [_vm._v("Hapus Gambar")]
                                ),
                              ],
                              1
                            ),
                          ],
                          1
                        )
                      }),
                      1
                    ),
                    _vm._v(" "),
                    _vm.errors_gambar_produk != null
                      ? _c("div", { staticClass: "text-danger mt-1" }, [
                          _c(
                            "ul",
                            _vm._l(
                              _vm.errors_gambar_produk.gambar,
                              function (item, index) {
                                return _c("li", { key: index }, [
                                  _vm._v(
                                    "\n                " +
                                      _vm._s(item) +
                                      "\n              "
                                  ),
                                ])
                              }
                            ),
                            0
                          ),
                        ])
                      : _vm._e(),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "tab-content",
                  {
                    attrs: {
                      title: "Kategori Produk",
                      "before-change": _vm.stepThreeProses,
                    },
                  },
                  [
                    _c(
                      "b-form-row",
                      { staticClass: "mb-1" },
                      [
                        _vm.options_kategori.length > 0
                          ? _c(
                              "b-col",
                              { attrs: { md: "12" } },
                              [
                                _c("b-form-group", {
                                  attrs: { label: "Kategori Produk" },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (ref) {
                                          var ariaDescribedby =
                                            ref.ariaDescribedby
                                          return [
                                            _c("b-form-checkbox-group", {
                                              attrs: {
                                                size: "md",
                                                options: _vm.options_kategori,
                                                "aria-describedby":
                                                  ariaDescribedby,
                                                name: "flavour-2a",
                                                stacked: "",
                                              },
                                              model: {
                                                value:
                                                  _vm.form_kategori_produk
                                                    .kategori,
                                                callback: function ($$v) {
                                                  _vm.$set(
                                                    _vm.form_kategori_produk,
                                                    "kategori",
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "form_kategori_produk.kategori",
                                              },
                                            }),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    2264882363
                                  ),
                                }),
                                _vm._v(" "),
                                _vm.errors_kategori_produk != null
                                  ? _c(
                                      "div",
                                      { staticClass: "text-danger mt-1" },
                                      [
                                        _c(
                                          "ul",
                                          _vm._l(
                                            _vm.errors_kategori_produk.kategori,
                                            function (item, index) {
                                              return _c("li", { key: index }, [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(item) +
                                                    "\n                  "
                                                ),
                                              ])
                                            }
                                          ),
                                          0
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ],
                              1
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ],
          1
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);