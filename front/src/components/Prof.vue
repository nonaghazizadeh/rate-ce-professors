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
            <div class="frontside">
              <div class="card">
                <div class="card-body text-center front-card-body">
                  <p>
                    <img class="img-fluid" :src="image_url" alt="card image" />
                  </p>
                  <h4 class="card-title">{{ name }}</h4>
                  <p>{{ email }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="mt-3 col-1 progress fourth"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="'--value: '+ management_avg" 
              ></div>
              <div
                class="mt-3 col-1 progress third"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="'--value: '+ grading_avg" 
              ></div>
              <div
                class="mt-3 col-1 progress second"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="'--value: '+ teaching_avg" 
              ></div>
              <div
                class="mt-3 col-1 progress first"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="5"
                :style="'--value: '+ ethic_avg" 
              ></div>
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
                        {{ editable.author }}
                      </h5>
                    </div>
                    <p>
                      {{ editable.comment }}
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
                          v-model="editable.comment"
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
                          @click="edit()"
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
                        {{ noneEditable.author }}
                      </h5>
                    </div>
                    <p>
                      {{ noneEditable.comment }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-3" v-if="auth_status">
                <form id="algin-form" class="add-comment">
                  <div class="form-group">
                    <h4 class="add-rate-title">ثبت امتیاز</h4>
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
                    <h4 class="add-comment-title mt-5">ثبت نظر</h4>
                    <textarea
                      cols="30"
                      rows="7"
                      class="form-control comment-text-area"
                      placeholder="نظر خود را بنویسید ..."
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
                    <button type="button" id="post" class="btn add-comment-btn">
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
    };
  },
  methods: {
    modalId(i) {
      return "modal" + i;
    },
    getInitialData() {
      if (this.$store.state.userId !== "") {
        this.getProfessorData().then(() => {
          this.getUserAuthStatus();
        });
      } else {
        this.getProfessorData();
      }
    },
    getUserAuthStatus() {
      axios
        .get(
          `https://617534a508834f0017c70b5c.mockapi.io/api/v1/users/` +
            this.$store.state.userId
        )
        .then((response) => {
          this.auth_status = response.data.auth_status
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getProfessorData() {
      return axios
        .get(
          `https://617534a508834f0017c70b5c.mockapi.io/api/v1/profs/` +
            this.$route.params.id
        )
        .then((response) => {
          this.image_url = response.data.image_url;
          this.name = response.data.name;
          this.email = response.data.email;
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
          if (this.$store.state.userId === "") {
            this.loading = false;
          }
        });
    },
  },
  created() {
    this.getInitialData();
  },
};
</script>

<style>
.frontside .card .card-title,
.backside .card .card-title {
  color: #274c77 !important;
}

.frontside .card .card-body img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
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
  --fg: #274c77;
  --bg: #def;
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

div[role="progressbar"]::before {
  counter-reset: percentage var(--value);
  content: counter(percentage) "%";
}
.first[role="progressbar"]::before {
  content: "اخلاق";
}
.second[role="progressbar"]::before {
  content: "تدریس";
}
.third[role="progressbar"]::before {
  content: "نمره‌دهی";
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
  box-shadow: 0 5px 10px -6px rgba(0, 0, 0, 0.15);
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
a,
a:hover {
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
}
.navbar-brand {
  color: white !important;
}
.add-comment-title,
.add-rate-title {
  color: #025788;
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
  background-color: #ececec;
  border-radius: 12px;
}

.add-comment {
  background-color: #fafafa;
  border-radius: 5px;
  padding: 20px;
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
</style>
