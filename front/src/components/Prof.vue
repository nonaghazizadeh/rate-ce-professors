<template>
  <div>
    <div>
      <b-navbar toggleable="expand-lg" class="navbar-color" fixed="top">
        <b-navbar-brand>اساتید دانشکده مهندسی کامپوتر</b-navbar-brand>
        <b-navbar-nav class="mr-auto">
          <b-nav-form>
            <b-button size="sm" class="m-2 my-sm-0 px-3 navbar-btn"
              ><router-link
                v-if="this.$store.state.userId === ''"
                :to="{ path: '/register' }"
                >ورود/ ثبت‌نام
              </router-link>
              <router-link
                v-if="this.$store.state.userId !== ''"
                :to="{ name: 'user', params: { id: this.$store.state.userId } }"
                replace
              >
                پروفایل من
              </router-link></b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <loader v-if="loading" />
    <div v-if="!loading" class="container mt-5">
      <div class="row mt-3">
        <div class="col-3 info-part">
          <div class="position-fixed">
            <div class="frontside-prof">
              <div class="card prof-card">
                <div class="card-body text-center front-card-body">
                  <p>
                    <img class="img-fluid" :src="image_url" alt="card image" />
                  </p>
                  <h4 class="card-title">{{ name }}</h4>
                  <p>{{ email }}</p>
                  <p class="mt-5 gray-text">{{ info }}</p>
                </div>
              </div>
            </div>
            <div class="card avg-rate-card">
              <div class="row">
                <div
                  class="my-3 col-2 progress fourth"
                  :style="[
                    management_avg < 50
                      ? {
                          '--fg': '#bb435d',
                          '--bg': '#e9ecef',
                          '--value': management_avg,
                        }
                      : {
                          '--fg': '#136f63',
                          '--bg': '#e9ecef',
                          '--value': management_avg,
                        },
                  ]"
                  role="progressbar"
                  aria-valuemin="0"
                  :aria-valuenow="management_avg"
                  aria-valuemax="100"
                ></div>
                <div
                  class="my-3 col-2 progress third"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :style="[
                    grading_avg < 50
                      ? {
                          '--fg': '#bb435d',
                          '--bg': '#e9ecef',
                          '--value': grading_avg,
                        }
                      : {
                          '--fg': '#136f63',
                          '--bg': '#e9ecef',
                          '--value': grading_avg,
                        },
                  ]"
                ></div>
                <div
                  class="mt-3 col-2 progress second"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :style="[
                    teaching_avg < 50
                      ? {
                          '--fg': '#bb435d',
                          '--bg': '#e9ecef',
                          '--value': teaching_avg,
                        }
                      : {
                          '--fg': '#136f63',
                          '--bg': '#e9ecef',
                          '--value': teaching_avg,
                        },
                  ]"
                ></div>
                <div
                  class="mt-3 col-2 progress first"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="5"
                  :style="[
                    ethic_avg < 50
                      ? {
                          '--fg': '#bb435d',
                          '--bg': '#e9ecef',
                          '--value': ethic_avg,
                        }
                      : {
                          '--fg': '#136f63',
                          '--bg': '#e9ecef',
                          '--value': ethic_avg,
                        },
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="container">
            <div class="row">
              <div
                v-for="editable in editableComments"
                class="col-md-12"
                :key="editable.id"
              >
                <div class="media g-mb-30 media-comment">
                  <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                    <div class="g-mb-15">
                      <h5 class="h5 g-color-gray-dark-v1 mb-0 comment-name">
                        {{ editable.show_name ? editable.author : `نا شناس` }}
                      </h5>
                    </div>
                    <p>
                      {{ editable.content }}
                    </p>
                    <span>
                      <i
                        class="far fa-edit pointer comment-icon"
                        v-b-modal="modalId(editable.id)"
                      ></i>
                    </span>
                    <b-modal
                      dir="rtl"
                      :id="'modal' + editable.id"
                      title="ویرایش نظر"
                    >
                      <template #modal-header>
                        <h5>ویرایش متن</h5>
                      </template>

                      <template #default>
                        <textarea
                          v-model="editable.content"
                          cols="30"
                          rows="7"
                          class="form-control comment-text-area"
                        >
                        </textarea>
                      </template>

                      <template #modal-footer="{ cancel }">
                        <b-button
                          size="sm"
                          class="edit-modal-btn"
                          @click="editComment(editable.id, editable.content)"
                        >
                          ویرایش
                        </b-button>
                        <b-button
                          size="sm"
                          class="edit-modal-close-btn"
                          @click="cancel()"
                        >
                          بستن
                        </b-button>
                      </template>
                    </b-modal>
                    <span>
                      <i
                        @click="deleteComment(editable.id)"
                        class="far fa-trash-alt trash-icon pointer comment-icon"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div
                v-for="noneEditable in nonEditableComments"
                class="col-md-12"
                :key="noneEditable.id"
              >
                <div class="media g-mb-30 media-comment">
                  <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                    <div class="g-mb-15">
                      <h5 class="h5 g-color-gray-dark-v1 mb-0 comment-name">
                        {{
                          noneEditable.show_name
                            ? noneEditable.author
                            : `نا شناس`
                        }}
                      </h5>
                    </div>
                    <p>
                      {{ noneEditable.content }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-3 col-12" v-if="auth_status">
                <form id="algin-form" class="add-comment">
                  <div class="form-group">
                    <h4 class="add-rate-comment-title">نظر دهی</h4>
                    <label for="rating-md-no-border" class="mt-3 rate-label"
                      >اخلاق</label
                    >
                    <b-form-rating
                      id="rating-md-no-border"
                      v-model="ethic_value"
                      no-border
                      class="rate"
                    ></b-form-rating>
                    <label for="rating-md-no-border" class="mt-3 rate-label"
                      >تدریس</label
                    >
                    <b-form-rating
                      id="rating-md-no-border"
                      v-model="teaching_value"
                      no-border
                      class="rate"
                    ></b-form-rating>
                    <label for="rating-md-no-border" class="mt-3 rate-label"
                      >نمره‌دهی</label
                    >
                    <b-form-rating
                      id="rating-md-no-border"
                      v-model="grading_value"
                      no-border
                      class="rate"
                    ></b-form-rating>
                    <label for="rating-md-no-border" class="mt-3 rate-label"
                      >مدیریت</label
                    >
                    <b-form-rating
                      id="rating-md-no-border"
                      v-model="management_value"
                      no-border
                      class="rate"
                    ></b-form-rating>
                    <textarea
                      cols="30"
                      rows="7"
                      class="form-control comment-text-area mt-3"
                      placeholder="نظر خود را بنویسید ..."
                      v-model="content"
                    ></textarea>
                    <div class="comment-check-box mt-2">
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="status"
                        name="checkbox-1"
                        value="show"
                        unchecked-value="no_show"
                      >
                        نمایش نام کاربری
                      </b-form-checkbox>
                    </div>
                  </div>

                  <div class="form-group mt-3">
                    <button
                      type="button"
                      id="post"
                      class="btn add-comment-btn"
                      @click="addView()"
                    >
                      ثبت
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "./Loader.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      auth_status: false,
      loading: true,
      image_url: "",
      name: "",
      email: "",
      info: "",
      editableComments: [],
      nonEditableComments: [],
      status: "no_show",
      ethic_value: 0,
      teaching_value: 0,
      grading_value: 0,
      management_value: 0,
      ethic_avg: 0,
      teaching_avg: 0,
      grading_avg: 0,
      management_avg: 0,
      content: "",
    };
  },
  methods: {
    modalId(i) {
      return "modal" + i;
    },
    getInitialData() {
      if (this.$store.state.userId !== "") {
        this.auth_status = true;
        this.getProfessorDataVerified();
      } else {
        this.getProfessorDataNonVerified();
      }
    },
    getProfessorDataVerified() {
      axios
        .get(`http://192.168.1.239:8080/professors/one`, {
          params: {
            prof_id: this.$route.params.id,
            stu_id: this.$store.state.userId,
          },
        })
        .then((response) => {
          this.image_url = response.data.image_url;
          this.name = response.data.name;
          this.email = response.data.email;
          this.info = response.data.info;
          this.ethic_avg = response.data.ethic_avg;
          this.teaching_avg = response.data.teaching_avg;
          this.grading_avg = response.data.grading_avg;
          this.management_avg = response.data.management_avg;
          this.editableComments = response.data.editable_comments;
          this.nonEditableComments = response.data.non_editable_comments;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getProfessorDataNonVerified() {
      axios
        .get(`http://192.168.1.239:8080/professors/one`, {
          params: {
            prof_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.image_url = response.data.image_url;
          this.name = response.data.name;
          this.email = response.data.email;
          this.info = response.data.info;
          this.ethic_avg = response.data.ethic_avg;
          this.teaching_avg = response.data.teaching_avg;
          this.grading_avg = response.data.grading_avg;
          this.management_avg = response.data.management_avg;
          this.editableComments = response.data.editable_comments;
          this.nonEditableComments = response.data.non_editable_comments;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addView() {
      if (this.content === "") {
        this.createRate();
      } else {
        this.createRate().then(() => {
          this.createComment();
        });
      }
    },
    createComment() {
      let show_name = true;
      console.log(this.status);
      if ((this.status = "show")) {
        show_name = false;
      }
      const data = {
        prof_id: this.$route.params.id,
        stu_id: this.$store.state.userId,
        content: this.content,
        show_name: show_name,
      };
      axios
        .post("http://192.168.1.239:8080/comments/new", data)
        .then((response) => {
          this.image_url = response.data.image_url;
          this.name = response.data.name;
          this.email = response.data.email;
          this.info = response.data.info;
          this.ethic_avg = response.data.ethic_avg;
          this.teaching_avg = response.data.teaching_avg;
          this.grading_avg = response.data.grading_avg;
          this.management_avg = response.data.management_avg;
          this.editableComments = response.data.editable_comments;
          this.nonEditableComments = response.data.non_editable_comments;
          this.status = "no_show";
          this.content = "";
          this.ethic_value = 0;
          this.grading_value = 0;
          this.management_value = 0;
          this.teaching_avg = 0;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createRate() {
      this.loading = true;
      const data = {
        prof_id: this.$route.params.id,
        stu_id: this.$store.state.userId,
        ethic: this.ethic_value,
        teaching: this.teaching_value,
        grading: this.grading_value,
        management: this.management_value,
      };
      return axios
        .post("http://192.168.1.239:8080/professors/rate", data)
        .then((response) => {
          this.image_url = response.data.image_url;
          this.name = response.data.name;
          this.email = response.data.email;
          this.info = response.data.info;
          this.ethic_avg = response.data.ethic_avg;
          this.teaching_avg = response.data.teaching_avg;
          this.grading_avg = response.data.grading_avg;
          this.management_avg = response.data.management_avg;
          this.editableComments = response.data.editable_comments;
          this.nonEditableComments = response.data.non_editable_comments;
          this.status = "no_show";
          this.content = "";
          this.ethic_value = 0;
          this.grading_value = 0;
          this.management_value = 0;
          this.teaching_avg = 0;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          if (this.content === "") {
            this.loading = false;
          }
        });
    },
    deleteComment(id) {
      this.loading = true;
      axios
        .delete("http://192.168.1.239:8080/comments", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          this.image_url = response.data.image_url;
          this.name = response.data.name;
          this.email = response.data.email;
          this.info = response.data.info;
          this.ethic_avg = response.data.ethic_avg;
          this.teaching_avg = response.data.teaching_avg;
          this.grading_avg = response.data.grading_avg;
          this.management_avg = response.data.management_avg;
          this.editableComments = response.data.editable_comments;
          this.nonEditableComments = response.data.non_editable_comments;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editComment(id, content) {
      this.loading = true;
      const data = {
        id: id,
        content: content,
      };
      axios
        .put("http://192.168.1.239:8080/comments/update", data)
        .then((response) => {
          this.$bvModal.hide("modal" + id);
          this.image_url = response.data.image_url;
          this.name = response.data.name;
          this.email = response.data.email;
          this.info = response.data.info;
          this.ethic_avg = response.data.ethic_avg;
          this.teaching_avg = response.data.teaching_avg;
          this.grading_avg = response.data.grading_avg;
          this.management_avg = response.data.management_avg;
          this.editableComments = response.data.editable_comments;
          this.nonEditableComments = response.data.non_editable_comments;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  created() {
    this.getInitialData();
  },
};
</script>

<style>
.frontside-prof .card .card-title {
  color: #274c77 !important;
}

.frontside-prof .card .card-body img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.prof-card {
  min-height: 450px;
  width: 270px;
}
.avg-rate-card {
  margin-top: 20px;
  min-height: 80px;
  width: 270px;
}

.progress {
  margin-right: 18px;
}
@keyframes growProgressBar {
  0%,
  3% {
    --pgPercentage: 0;
  }
  10% {
    --pgPercentage: var(--value);
  }
}

@property --pgPercentage {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

div[role="progressbar"] {
  --size: 3rem;
  --pgPercentage: var(--value);
  animation: growProgressBar 3s 1 forwards;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(
      closest-side,
      white 80%,
      transparent 0 99.9%,
      white 0
    ),
    conic-gradient(var(--fg) calc(var(--pgPercentage) * 1%), var(--bg) 0);
  font-family: Helvetica, Arial, sans-serif;
  font-size: calc(var(--size) / 5);
  color: var(--fg);
}
.first[role="progressbar"]::before {
  content: "اخلاق";
}
.second[role="progressbar"]::before {
  content: "تدریس";
}
.third[role="progressbar"]::before {
  content: "نمره";
}
.fourth[role="progressbar"]::before {
  content: "مدیریت";
}
body {
  background: #e7ecef;
}
@media (min-width: 0) {
  .g-mr-15 {
    margin-right: 1.07143rem !important;
  }
}
@media (min-width: 0) {
  .g-mt-3 {
    margin-top: 0.21429rem !important;
  }
}
.g-height-50 {
  height: 50px;
}
.g-width-50 {
  width: 50px !important;
}
@media (min-width: 0) {
  .g-pa-30 {
    padding: 2.14286rem !important;
  }
}
.g-bg-secondary {
  background-color: #fafafa !important;
}
.u-shadow-v18 {
  box-shadow: 0 5px 10px -6px rgba(0, 0, 0, 50%);
  border-radius: 20px;
}
.g-color-gray-dark-v4 {
  color: #777 !important;
}
.g-font-size-12 {
  font-size: 0.85714rem !important;
}
.media-comment {
  margin-top: 20px;
}
.info-part {
  margin-top: 20px;
}
.trash-icon {
  margin-right: 3px;
}
.pointer {
  cursor: pointer;
}
.comment-name {
  text-align: right;
  color: #025788;
}
.navbar-color {
  background-color: #274c77 !important;
}
.navbar-btn a,
.navbar-btn a:hover {
  color: #274c77;
  text-decoration: none;
}
.navbar-btn {
  background-color: #e7ecef !important;
  color: #274c77;
}
.add-comment-btn,
.add-comment-btn:hover {
  background-color: #274c77 !important;
  color: white;
  border-radius: 20px;
  width: 100px;
}
.navbar-brand {
  color: white !important;
}
.add-rate-comment-title {
  color: #025788;
  text-align: right;
}
label {
  color: #025788;
}
#align-form {
  margin-top: 20px;
}
.form-group p a {
  color: white;
}
#darker img {
  margin-right: 15px;
  position: static;
}
.form-group input,
.form-group textarea {
  background-color: #e9ecef;
  border-radius: 10px;
}
.add-comment {
  background-color: #fafafa;
  border-radius: 20px;
  border-color: #025788;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 5px 10px -6px rgba(0, 0, 0, 50%);
}
.add-comment-btn {
  padding: 0px 8px !important;
}
.comment-icon {
  color: #6096ba;
}
.custom-control-label {
  margin-right: 7px;
  color: #8b8c89;
}
.comment-check-box {
  text-align: right;
}
.rate {
  background-color: transparent;
  color: #a3cef1;
}
.rate-label,
.comment-text-area {
  font-size: 13px;
}
.modal-header .close {
  display: none;
}
.edit-modal-btn {
  background-color: #274c77 !important;
}
.modal-title {
  color: #274c77 !important;
}
.edit-modal-close-btn,
.edit-modal-close-btn:hover {
  background-color: #bb435d;
}
.custom-control-input:checked ~ .custom-control-label::before {
  background-color: #6096ba !important;
  border-color: #274c77 !important;
}
.custom-control-label {
  color: #274c77 !important;
}
.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
.gray-text {
  color: #8b8c89;
}
</style>
