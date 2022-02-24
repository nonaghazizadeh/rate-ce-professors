<template>
  <div>
    <b-navbar toggleable="expand-lg" class="navbar-color" fixed="top">
      <b-navbar-brand>
        <router-link :to="{ path: '/' }" replace
          >اساتید دانشکده مهندسی کامپیوتر</router-link
        >
      </b-navbar-brand>
    </b-navbar>
    <div class="container h-100 admin-container">
      <div class="d-flex justify-content-center">
        <b-card
          title="ورود مدیر"
          tag="article"
          style="width: 40rem"
          class="mb-2 card-shadow admin-card"
        >
          <b-card-body>
            <b-form>
              <label class="sr-only" for="inline-form-input-username"
                >نام کاربری</label
              >
              <b-form-input
                id="inline-form-input-username"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3 admin-form"
                placeholder="نام کاربری"
                v-model="username"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-password"
                >رمز عبور</label
              >
              <b-form-input
                id="inline-form-input-password"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3 admin-form"
                placeholder="رمز عبور"
                v-model="password"
              ></b-form-input>
              <b-button class="mt-3 signin-btn btn-shadow" @click="loginAdmin()"
                >ورود</b-button
              >
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginAdmin() {
      axios
        .get("http://192.168.1.239:8080/admins/login", {
          params: {
            username: this.username,
            password: this.password,
          },
        })
        .then(() => {
          this.$router.replace("/admin");
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>

<style scoped>
.admin-container {
  padding-top: 10%;
  margin-top: auto;
  margin-bottom: auto;
}
.admin-card {
  border-radius: 20px;
}
.admin-card .card-body {
  padding-bottom: 0.7rem !important;
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 50%);
}
.btn-shadow {
  box-shadow: 0 5px 10px -2px rgb(0 0 0 / 30%);
}
.signin-btn {
  background-color: #274c77 !important;
  border-radius: 20px;
  width: 100px;
}
.card-title {
  color: #274c77;
}
.navbar-color {
  background-color: #274c77 !important;
}
.professors-container {
  margin-top: 5rem !important;
}
.navbar-btn {
  background-color: #e7ecef !important;
  color: #274c77;
}
.navbar-brand {
  color: white !important;
}
a,
a:hover {
  color: white !important;
  text-decoration: none !important;
}
.admin-form {
  background-color: #e9ecef;
  border-radius: 10px;
}
.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
</style>
