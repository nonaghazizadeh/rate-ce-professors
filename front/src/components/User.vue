<template>
  <div>
    <div>
      <b-navbar toggleable="expand-lg" class="navbar-color" fixed="top">
        <b-navbar-brand>
          <router-link :to="{ path: '/' }" replace
            >اساتید دانشکده مهندسی کامپیوتر</router-link
          >
        </b-navbar-brand>
        <b-navbar-nav class="mr-auto">
          <b-nav-form>
            <b-button
              size="sm"
              class="m-2 my-sm-0 px-3 navbar-btn"
              @click="exit()"
              ><router-link :to="{ path: '/register' }" replace
                >خروج</router-link
              ></b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <loader v-if="loading" />
    <div v-if="!loading" class="container mt-5">
      <div class="row mt-3">
        <div class="col-4 info-part">
          <b-card
            title="اطلاعات کاربری"
            tag="article"
            style="width: 20rem; height: 15rem"
            class="mb-2 card-shadow user-card"
          >
            <b-card-body>
              <div class="card-body text-center user-card-body">
                <p class="text-right">
                  <span>نام کاربری: </span>
                  <span class="info-content">{{ username }}</span>
                </p>
                <p class="text-right">
                  <span>شماره دانشجویی: </span>
                  <span class="info-content">{{ stid }}</span>
                </p>
              </div>
            </b-card-body>
          </b-card>
        </div>

        <div class="col-5 info-part">
          <b-card
            title="ثبت درخواست افزودن استاد"
            tag="article"
            style="width: 43rem; height: 15rem"
            class="mb-2 card-shadow user-card"
          >
            <b-card-body>
              <b-form>
                <label class="sr-only" for="inline-form-input-pname"
                  >نام استاد</label
                >
                <b-form-input
                  id="inline-form-input-pname"
                  class="mb-2 mr-sm-2 mb-sm-0 mt-3 req-form"
                  placeholder="نام استاد"
                  v-model="profName"
                ></b-form-input>
                <b-button class="mt-4 req-btn" @click="addProfessorRequest()"
                  >ثبت درخواست</b-button
                >
              </b-form>
            </b-card-body>
          </b-card>
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
      loading: true,
      username: "",
      stid: "",
      profName: "",
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios
        .get(`http://192.168.1.239:8080/students`, {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.username =
            response.data.firstname + " " + response.data.lastname;
          this.stid = response.data.student_number;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addProfessorRequest() {
      const data = { name: this.profName };
      axios
        .post("http://192.168.1.239:8080/requests/new", data)
        .then(() => {
          this.makeSuccessToast();
          this.profName = ""
        })
        .catch((e) => {
          console.error(e.response.data.message);
          this.makeFailToast(e.response.data.message);
        });
    },
    makeSuccessToast() {
      this.$bvToast.toast("درخواست افزودن استاد با موفقیت ثبت شد", {
        autoHideDelay: 5000,
        toaster: "b-toaster-bottom-left",
        noCloseButton: true,
        bodyClass: "right-text",
      });
    },
    makeFailToast(message) {
      this.$bvToast.toast(message, {
        autoHideDelay: 5000,
        toaster: "b-toaster-bottom-left",
        noCloseButton: true,
        bodyClass: "right-text",
      });
    },
    exit() {
      this.$store.commit("setUserId", '');
      this.$router.replace("/register");
    },
  },
};
</script>

<style>
.user-card .card-title {
  color: #274c77 !important;
}
.user-card-body {
  padding-top: 20px !important;
}
.user-card {
  border-radius: 20px;
}

body {
  background: #e7ecef;
}
.info-part {
  margin-top: 25px;
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
.navbar-brand a {
  color: white !important;
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
.info-content {
  margin-right: 10px;
}
.req-btn {
  background-color: #274c77 !important;
  border-radius: 20px;
  width: 130px;
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 30%);
}
.req-form {
  background-color: #e9ecef;
  border-radius: 10px;
}
.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 50%);
}
</style>
