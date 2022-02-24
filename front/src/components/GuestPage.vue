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
      <div class="search-container">
        <input
          class="search-input"
          type="text"
          placeholder="استاد مورد نظر خود را جستجو کنید..."
          v-model="search"
        />
      </div>
      <div class="row professors-container">
        <div
          v-for="prof in filteredList"
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
                    <ul class="text-center">
                      <li class="list-inline-item">
                        <a
                          class="social-icon text-center"
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
  computed: {
    filteredList() {
      return this.professors.filter((post) => {
        return post.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  created() {
    // this.$store.commit("setUserId", localStorage.getItem('id'));
    this.getProfessorsData();
  },
  data() {
    return {
      search: "",
      loading: true,
      professors: [],
    };
  },
  methods: {
    getProfessorsData() {
      axios
        .get(`http://192.168.1.239:8080/professors/`)
        .then((response) => {
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
  border-radius: 20px;
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
  -webkit-box-shadow: 5px 7px 9px -4px rgb(0 0 0 / 50%);
  -moz-box-shadow: 5px 7px 9px -4px rgb(0 0 0 / 50%);
  box-shadow: 5px 7px 9px -4px rgb(0 0 0 / 50%);
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
  border-radius: 20px;
}
.backside .card{
  width: 348px;
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
.backside ul {
  margin-right: -2.6rem;
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
  margin-top: 3rem !important;
}
.search-container {
  margin-top: 2rem !important;
  padding-top: 30px;
}
.navbar-btn a,
.navbar-btn:hover {
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
.search-input {
  width: 100%;
  padding: 12px 24px;
  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;
  color: #61625f;
  background-color: transparent;
  border-radius: 50px;
  border: 1px solid #274c77;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
.search-input::placeholder {
  color: #8b8c89;
  text-transform: uppercase;
}
.search-input:hover,
.search-input:focus {
  padding: 12px 0;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #274c77;
  border-radius: 0;
}
</style>
