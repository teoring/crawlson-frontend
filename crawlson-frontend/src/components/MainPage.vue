<template>
    <div class="container">
        <div class="topbard">
            <img class="logo" src="/logo_2.png" alt="logo">
        </div>

        <div class="main-container">
            <div class="main-area">
                <div class="card">
                    <h5>Recent houses</h5>
                    <DataView :value="houses" :layout="layout" :paginator="true" :rows="9">
                        <template #header>
                            <div class="flex justify-content-end">
                                <DataViewLayoutOptions v-model="layout" />
                            </div>
                        </template>

                        <template #list="slotProps">
                            <div class="grid grid-nogutter">
                                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
                                        <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="`http://localhost/house_images/${item.key}.jpg`" :alt="item.name" />
                                        <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                                <div class="text-xl font-bold">{{ item.address }}</div>
                                                <div class="text-lg ">{{item.city}}, {{item.postcode}}</div>
                                                <div class="flex align-items-center gap-3">
                                                    <span class="flex align-items-center gap-2">
                                                        <i class="pi pi-map"></i>
                                                        <span class="font-semibold">{{ item.origin }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                                <span class="text-2xl font-semibold">{{ item.price }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template #grid="slotProps">
                            <div class="grid grid-nogutter">
                                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 lg:col-12 xl:col-4 p-3">
                                    <div class="p-3 border-1 surface-border surface-card border-round">

                                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                            <div class="flex align-items-center gap-2 p-1 py-3 pl-2">
                                                <i class="pi pi-map"></i>
                                                <span class="font-semibold">{{ item.origin }} | 10 Jan 2024</span>
                                            </div>
                                            <Tag v-if="item.energy_label" icon="pi pi-tag" rounded=true :severity="getSeverity(item.energy_label)" :value="item.energy_label" ></Tag>
                                        </div>

                                        <div class="flex flex-column align-items-center gap-3 py-1">
                                            <img class="w-10 shadow-1 border-round" :src="`http://localhost/house_images/${item.key}.jpg`" />
                                            <div class="text-xl font-bold">
                                                {{ item.address }}
                                            </div>
                                            <div class="text-lg">
                                                <i class="pi pi-map-marker"></i>
                                                {{item.city}}, {{item.postcode}}
                                            </div>
                                            <div class="text-lg">
                                                <Chip v-if="item.living_area" :label="item.living_area" class="prop-chip pl-3 pr-3 mr-2" image="/area-icon.svg">
                                                </Chip>
                                                <Chip v-if="item.construction_year" :label="item.construction_year" class="prop-chip pl-3 pr-3 mr-2" image="/const-year-icon.svg">
                                                </Chip>
                                            </div>

                                        </div>

                                        <div class="flex align-items-center justify-content-between pl-3 pt-2 ">
                                            <span class="text-xl font-semibold">{{ item.price }}</span>
                                            <a :href="item.url" target="_blank" rel="noopener noreferrer">
                                                <Button icon="pi pi-map" rounded></Button>
                                            </a>
                                            <a :href="item.url" target="_blank" style="pl-1"  rel="noopener noreferrer">
                                                <Button icon="pi pi-arrow-right" rounded></Button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        
                    </DataView>

                    <div class="skeleton" v-if="dashboard_loading">
                        <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                        <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                        <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                        <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                    </div>
                    <div class="skeleton" v-if="dashboard_loading">
                        <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                        <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                        <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                        <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                © Crawlson 2024
            </div>
        </div>

        <Menu class="sidebar" :model="items" />
    </div>
  </template>
  
  <script>

  import { GET_USER_INFO, GET_JWT_TOKEN } from "../store/storeconstants";
  import { ref } from "vue";
  import Config from '../config'
  import axios from "axios";

  export default {
    name: 'MainPage',
 
    beforeMount() {
        const instance = axios.create({
            baseURL: Config.serverAddr,
            timeout: 5000,
            headers: {
                "authorization": "bearer " + this.$store.state.auth.jwtToken,
                "Content-Type": 'application/x-www-form-urlencoded',
            }
        });

        try {
            let _this = this;
            instance.get( "api/v1/dashboard/houses", null, {}
            ).then( (response) => {
                if( response && response.data && response.data.data && response.data.data.houses_overview )
                {
                    _this.houses = response.data.data.houses_overview;
                    _this.dashboard_loading = false;
                } else {
                    this.$store.commit("setErrorMessage", "Unexpected error. Refresh the page and try again." );
                }
            }).catch( (error) => {
                this.$store.commit("setErrorMessage", "Unexpected error. Refresh the page and try again." );
                console.log( error );
            });
        }
        catch( error ) {
            console.log( error );
        }
    },
    data() {
      return {
        layout: ref('grid'),
        houses: [],
        dashboard_loading: true,
        sortOptions: ref([
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ]),
        items: ref([
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-home'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out'
                    }
                ]
            }
        ])
      }
    },
    methods:{
        getUsername() {
            let user = this.$store.getters[`auth/${GET_USER_INFO}`];
            return user.first_name + " " + user.last_name;
        }, 
        getSeverity(label) {
            if( label.charAt(0) == 'A' )
                return 'success';
            if( label.charAt(0) == 'B' )
                return 'success';
            if( label.charAt(0) == 'C' )
                return 'success';
            if( label.charAt(0) == 'D' )
                return 'warning';
            if( label.charAt(0) == 'E' )
                return 'warning';

            return "error";
        }
    }
  }
  </script>

<style>
.p-menu {
    border: 0px solid;
    border-radius: 0px;
}
.topbard {
    position: fixed;
    height: 5rem;
    z-index: 997;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 2rem;
    background-color: var(--surface-card);
    transition: left .2s;
    display: flex;
    align-items: center;
    box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;}

html {
    font-size: 14px;
}

.logo {
    height:40px;
    padding-left:30px;
}
.p-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: var(--text-color-secondary);
    border-radius: 50%;
    width: 3.5rem;
    height: 3rem;
    cursor: pointer;
    transition: background-color .2s;
    text-align: left;
    background-color: transparent;
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    user-select: none;
}
.button-holder {
    margin: 0 0 0 auto;
    padding: 0;
    list-style: none;
    display: flex;
}
.pi-l {
    font-size: 1.5rem;
}
body {
    font-family: var(--font-family);
    color: var(--text-color);
    background-color: var(--surface-ground);
    margin: 0;
    padding: 0;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.p-submenu-header {
    text-align: start;
}
.p-menuitem-link {
    padding: 0.75rem 0.1rem;
    padding-left: 30px;
}
.main-container {
    margin-left: 232px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    padding: 6.5rem 2rem 2rem 4rem;
    transition: margin-left .2s;
}
.footer {
    transition: margin-left .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid var(--surface-border);
    font-weight: 500!important;
}
.card {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--card-shadow);
    border-radius: 12px;
}
.sidebar {
    border: 1px solid var(--surface-border);
    border-radius: 12px;
    position: fixed;
    width: 230px;
    height: calc(100vh - 9rem);
    z-index: 999;
    overflow-y: auto;
    -webkit-user-select: none;
    user-select: none;
    top: 6.5rem;
    left: 2rem;
    transition: transform .2s,left .2s;
    background-color: var(--surface-overlay);
    padding: 0.5rem 1.0rem;
    box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;
}
.skeleton-item {
    width:25%!important;
    padding: 2rem!important;
}
.skeleton {
    flex-wrap: wrap!important;
    box-sizing: border-box;
    display: flex!important;
}
.house-pic {
    width: 100px;
    float: left;
}
h5 {
    font-size: 1.25rem;
    margin: 0 0 1rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: var(--surface-900);
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    text-align: left;
    font-family: "Inter var", sans-serif;
}
.layout-menu .layout-root-menuitem>.layout-menuitem-root-text {
    font-size: .857rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--surface-900);
    margin: 0.75rem 0;
}
.prop-chip {
    font-size: 0.9rem;
}
.prop-chip img {
    width: 1.5rem;
    height: 1.5rem;
}
</style>