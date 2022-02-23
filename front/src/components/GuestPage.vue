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
              </router-link>
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <loader v-if="loading" />
    <div v-if="!loading" class="container mt-5">
      <div class="row professors-container">
        <div
          v-for="prof in professors"
          class="col-xs-12 col-sm-6 col-md-4"
          :key="prof.id"
        >
          <div class="image-flip">
            <div class="mainflip flip-0">
              <div class="frontside">
                <div class="card">
                  <div class="card-body text-center front-card-body">
                    <p>
                      <img
                        class="img-fluid"
                        :src="prof.image_url"
                        alt="card image"
                      />
                    </p>
                    <h4 class="card-title">{{ prof.name }}</h4>
                  </div>
                </div>
              </div>
              <div class="backside">
                <div class="card my-auto">
                  <div class="card-body text-center back-card-body">
                    <h4 class="card-title">{{ prof.name }}</h4>
                    <p class="card-text">
                      {{ prof.info }}
                    </p>
                    <ul>
                      <li class="list-inline-item">
                        <a
                          class="social-icon text-xs-center"
                          target="_blank"
                          :href="'mailto:' + prof.email"
                        >
                          <i class="fa fa-envelope email-icon"></i>
                        </a>
                      </li>
                    </ul>
                    <p class="more-info-text">
                      <router-link
                        :to="{ name: 'professor', params: { id: prof.id } }"
                      >
                        اطلاعات بیشتر
                      </router-link>
                    </p>
                  </div>
                </div>
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
  name: "GuestPage",
  components: {
    Loader,
  },
  created() {
    this.getProfessorsData();
  },
  data() {
    return {
      loading: true,
      professors: [],
    };
  },
  methods: {
    getProfessorsData() {
      axios
        .get(`https://617534a508834f0017c70b5c.mockapi.io/api/v1/profs`)
        .then((response) => {
          console.log(response.data);
          this.professors = response.data;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
body {
  background: #e7ecef;
}
#team .card {
  border: none;
  background: #ffffff;
}

.image-flip:hover .backside,
.image-flip.hover .backside {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
  border-radius: 0.25rem;
}

.image-flip:hover .frontside,
.image-flip.hover .frontside {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.mainflip {
  -webkit-transition: 1s;
  -webkit-transform-style: preserve-3d;
  -ms-transition: 1s;
  -moz-transition: 1s;
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transition: 1s;
  transform-style: preserve-3d;
  position: relative;
}

.frontside {
  position: relative;
  -webkit-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  z-index: 2;
  margin-bottom: 10px;
}

.backside {
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
  -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
  box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
}

.frontside,
.backside {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 1s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 1s;
  -moz-transform-style: preserve-3d;
  -o-transition: 1s;
  -o-transform-style: preserve-3d;
  -ms-transition: 1s;
  -ms-transform-style: preserve-3d;
  transition: 1s;
  transform-style: preserve-3d;
}

.frontside .card,
.backside .card {
  min-height: 312px;
}

.backside .card a {
  font-size: 18px;
  color: #274c77 !important;
}

.frontside .card .card-title,
.backside .card .card-title {
  color: #274c77 !important;
}

.frontside .card .card-body img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.back-card-body {
  padding-top: 70px !important;
}

.front-card-body {
  padding-top: 60px !important;
}
a,
a:hover {
  color: white;
  text-decoration: none;
}

.more-info-text {
  text-align: left;
}
.navbar-color {
  background-color: #274c77 !important;
}
.professors-container {
  margin-top: 5rem !important;
}
a,
a:hover {
  color: #274c77 !important;
  text-decoration: none !important;
}
.navbar-btn {
  background-color: #e7ecef !important;
  color: #274c77;
}
.navbar-brand {
  color: white !important;
}
.email-icon {
  color: #6096ba;
}
</style>
