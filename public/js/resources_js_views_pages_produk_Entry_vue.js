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
// import helpers from '../../helpers/helpers';
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "EntryUser",
  data: function data() {
    return {
      form_info_produk: {
        id: null,
        nama: '',
        harga: '',
        hpp: '',
        aktif: 'Y'
      },
      form_gambar_produk: {
        id_produk: null,
        list_gambar: []
      },
      options: [{
        item: 'Y',
        name: 'Y'
      }, {
        item: 'N',
        name: 'N'
      }],
      errors: "",
      edit: false,
      roles: [],
      path_info_produk: '/api/produk',
      path_gambar_produk: '/api/gambar-produk',
      path_kategori_produk: '/api/kategori-produk',
      loadingWizard: true,
      errors_info_produk: null,
      errors_gambar_produk: null,
      step1: null,
      step2: null,
      step3: null
    };
  },
  created: function created() {
    var act = this.$route.params.act;

    if (act != 'add') {
      this.petchData(act);
    }
  },
  methods: {
    handleValidation: function handleValidation(isValid, tabIndex) {// console.log(tabIndex);
    },
    setLoading: function setLoading(value) {
      this.loadingWizard = value;
    },
    petchData: function petchData(id) {
      var _this = this;

      this.$swal({
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: function onBeforeOpen() {
          _this.$swal.showLoading();
        }
      });
      axios.get(this.path + '/' + id).then(function (response) {
        _this.$swal.close();

        var data = response.data.data;
        _this.form = {
          id: data.id,
          nama: data.name,
          aktif: data.active
        };
        _this.edit = true;
      }).catch(function (error) {
        _this.$swal.close();
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
                if (!(this.form.id != null)) {
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
                  self.form.id = id_produk;
                  selft.form_gambar_produk.id_produk = id_produk; // return true;
                  // this.setLoading(false);

                  // return true;
                  // this.setLoading(false);
                  self.step1 = true;
                }).catch(function (error) {
                  self.step1 = false; // this.setLoading(false);

                  // this.setLoading(false);
                  if (error.response) {
                    self.errors_konfig_msg = "Terjadi kesalahan, silahkan coba lagi.";

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
                _context3.next = 2;
                return this.saveGambarProduk();

              case 2:
                if (!(this.form_gambar_produk.id_produk != null && this.form_gambar_produk.list_gambar.length > 0)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", true);

              case 6:
                return _context3.abrupt("return", this.step2);

              case 7:
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
        var self;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                self = this;
                self.errors_gambar_produk = null; // this.setLoading(true);

                _context4.next = 4;
                return axios.post(self.path_gambar_produk, self.form_gambar_produk).then(function (response) {
                  // self.form.id = response.data.data.id;
                  // return true;
                  // this.setLoading(false);
                  self.step1 = true;
                }).catch(function (error) {
                  self.step1 = false; // this.setLoading(false);

                  // this.setLoading(false);
                  if (error.response) {
                    if (error.response.data) {
                      self.errors_gambar_produk = error.response.data;
                    }
                  } // return false;

                });

              case 4:
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
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.$swal({
                  title: 'Silahkan Tunggu . . .',
                  showConfirmButton: false,
                  allowOutsideClick: false,
                  onBeforeOpen: function onBeforeOpen() {
                    _this2.$swal.showLoading();
                  }
                });
                _context5.next = 3;
                return this.saveKategoriProduk();

              case 3:
                this.$swal.close();

                if (this.step2) {
                  this.$swal({
                    title: 'Data Berhasil Disimpan',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                  }).then(function (result) {
                    if (result.value) {
                      // self.$route
                      _this2.$router.push('/panel/list-banding-data');
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
                self.errors_data = null;
                _context6.next = 4;
                return axios.post(self.path_kategori_produk, {
                  konfig_id: self.form.id,
                  data: self.form_data
                }).then(function (response) {
                  self.step2 = true; // console.log(response.data);
                  // this.$swal.close();
                  // this.loadingWizard = false;
                  // status = true;
                  // return true;
                }).catch(function (error) {
                  // console.log(error.response);
                  self.step2 = false;

                  if (error.response) {
                    // this.$swal.close();
                    // this.$swal({
                    //     icon: 'error',
                    //     title: 'Periksa kembali form anda',
                    //     allowOutsideClick: false,
                    // });
                    if (error.response.data) {
                      self.errors_data = error.response.data;
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
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: function onBeforeOpen() {
          self.$swal.showLoading();
        }
      });
      axios.post(self.path, self.form).then(function (response) {
        self.$swal.close();
        self.$swal({
          title: 'Data Berhasil Disimpan',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false
        }).then(function (result) {
          if (result.value) {
            // self.$route
            self.$router.push('/panel/master-data/pengguna');
          }
        });
      }).catch(function (error) {
        // console.log(error.response);
        if (error.response) {
          self.$swal.close();
          self.$swal({
            icon: 'error',
            title: 'Periksa kembali form anda',
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
      var status = this.$route.params.status;

      if (status != 'add') {
        formData.append('id', status);
      }

      formData.append('name', this.name);
      formData.append('urutan', this.urutan);
      formData.append('aktif', this.aktif);
      return formData;
    },
    onImageChange: function onImageChange(e) {
      var image = e.target.files[0];

      if (image.size > 1024 * 512) {
        e.preventDefault();
        this.$swal({
          type: 'warning',
          title: 'Terjadi kesalahan',
          text: 'ukuran gambar melebihi 500Kb'
        });
        this.$refs.imgupload.value = null;
        this.urlImage = null;
        return;
      }

      this.gambar = image;
      this.urlImage = URL.createObjectURL(image);
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
              _vm._v("\n        Entry Data Agama\n        "),
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
                      attrs: { to: "/panel/master-data/pengguna" },
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
                                placeholder: "Masukkan Nama Lengkap",
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
                            _vm.errors != null
                              ? _c("div", { staticClass: "text-danger mt-1" }, [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.errors.nama,
                                      function (item, index) {
                                        return _c("li", { key: index }, [
                                          _vm._v(" " + _vm._s(item) + " "),
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
                            _vm.errors != null
                              ? _c("div", { staticClass: "text-danger mt-1" }, [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.errors.harga,
                                      function (item, index) {
                                        return _c("li", { key: index }, [
                                          _vm._v(" " + _vm._s(item) + " "),
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
                            _vm.errors != null
                              ? _c("div", { staticClass: "text-danger mt-1" }, [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.errors.hpp,
                                      function (item, index) {
                                        return _c("li", { key: index }, [
                                          _vm._v(" " + _vm._s(item) + " "),
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
                          _c("label", [
                            _vm._v("\n                Aktif\n              "),
                          ]),
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
                                          _vm._v(" " + _vm._s(item) + " "),
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
                _c("tab-content", {
                  attrs: {
                    title: "Gambar Produk",
                    "before-change": _vm.stepTwoProses,
                  },
                }),
                _vm._v(" "),
                _c("tab-content", {
                  attrs: {
                    title: "Kategori Produk",
                    "before-change": _vm.stepThreeProses,
                  },
                }),
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