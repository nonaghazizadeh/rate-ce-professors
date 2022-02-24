<template>
  <div>
    <div>
      <b-navbar toggleable="expand-lg" class="navbar-color" fixed="top">
        <b-navbar-brand>
          <router-link :to="{ path: '/' }" replace
            >اساتید دانشکده مهندسی کامپیوتر</router-link
          >
        </b-navbar-brand>
      </b-navbar>
    </div>
    <div class="container h-100 register-container">
      <div class="d-flex justify-content-center">
        <b-card
          title="ثبت نام کاربر"
          tag="article"
          style="width: 40rem"
          class="mb-2 card-shadow register-card"
        >
          <b-card-body>
            <b-form>
              <label class="sr-only" for="inline-form-input-name">نام</label>
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 register-form"
                placeholder="نام"
                v-model="firstname"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-lastname"
                >نام خانوادگی</label
              >
              <b-form-input
                id="inline-form-input-lastname"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3 register-form"
                placeholder="نام خانوادگی"
                v-model="lastname"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-stid"
                >شماره دانشجویی</label
              >
              <b-form-input
                id="inline-form-input-stid"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3 register-form"
                placeholder="شماره دانشجویی"
                v-model="student_number"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-code">کد ملی</label>
              <b-form-input
                id="inline-form-input-code"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3 register-form"
                placeholder="کد ملی"
                v-model="code_meli"
              ></b-form-input>
              <b-button
                class="mt-3 signup-btn btn-shadow"
                @click="registerUser()"
                >ثبت نام</b-button
              >
              <p class="check-text">
                <router-link class="route-text" :to="{ path: '/login' }" replace
                  >قبلا ثبت‌نام کرده‌اید؟</router-link
                >
              </p>
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
      firstname: "",
      lastname: "",
      student_number: "",
      code_meli: "",
    };
  },
  methods: {
    registerUser() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        student_number: this.student_number,
        code_meli: this.code_meli,
      };
      axios
        .post("http://192.168.1.239:8080/students/new", data)
        .then(() => {
          this.$router.replace("/");
        });
    },
  },
};
</script>

<style scoped>
.register-container {
  padding-top: 10%;
  margin-top: auto;
  margin-bottom: auto;
}
.register-card {
  border-radius: 20px;
}
.register-card .card-body {
  padding-bottom: 0.3rem !important;
}
.check-text {
  text-align: left;
  color: #274c77;
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 50%);
}
.btn-shadow {
  box-shadow: 0 5px 10px -2px rgb(0 0 0 / 30%);
}
.signup-btn {
  background-color: #274c77 !important;
  border-radius: 20px;
  width: 100px;
}
.card-title {
  color: #274c77;
}
.route-text,
.route-text:hover {
  color: #274c77 !important;
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
.register-form {
  background-color: #e9ecef;
  border-radius: 10px;
}
.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
</style>
