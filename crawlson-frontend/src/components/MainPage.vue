<template>
    <div class="container">
        <div class="topbard">
            <img class="logo" src="/logo_2.png" alt="logo" />
        </div>

        <div class="main-container">
            <div class="main-area">
                <div class="card pt-3">
                    <DataView :value="selected_houses" @page="onDataViewPageChanged()" :layout="layout" :paginator="true" :rows="12">
                        <template #header>
                            <div>
                                <!-- <div class="flex align-items-center">
                                    <h5>Recent houses</h5>
                                </div> -->
                                <div class="flex justify-content-end align-items-center gap-3">
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText v-model="searchInput" v-tooltip.top="'Enter address, city, postcode, price, date or source.'" placeholder="Search" />
                                    </span>
                                    <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Matched houses" @change="onFilterChange($event)" />
                                    <DataViewLayoutOptions v-model="layout" />
                                </div>
                            </div>
                        </template>

                        <template #list="slotProps">
                            <div class="grid grid-nogutter">
                                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                                    <div
                                        class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
                                        :class="{
                                            'border-top-1 surface-border': index !== 0,
                                        }"
                                    >
                                        <img
                                            class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                                            :src="`http://localhost/house_images/${item.key}.jpg`"
                                            :alt="item.name"
                                        />
                                        <div
                                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
                                        >
                                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                                <div class="text-xl font-bold"></div>
                                                <div class="text-lg">{{ item.city }}, {{ item.postcode }}</div>
                                                <div class="flex align-items-center gap-3">
                                                    <span class="flex align-items-center gap-2">
                                                        <i class="pi pi-map"></i>
                                                        <span class="font-semibold">{{ item.origin }} |</span>
                                                        <span>{{ tsToDate( item.first_seen ) }} | </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                                            >
                                                <span class="text-2xl font-semibold">{{ item.price }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template #grid="slotProps">
                            <div class="grid grid-nogutter">
                                <div
                                    v-for="(item, index) in slotProps.items"
                                    :key="index"
                                    class="col-12 sm:col-6 lg:col-12 xl:col-4 p-3"
                                >
                                    <div class="p-3 py-2 border-1 surface-border surface-card border-round">
                                        <div class="flex flex-wrap align-items-center justify-content-between">
                                            <div class="flex align-items-center gap-2 p-1 py-3 pl-2">
                                                <Tag class="" v-tooltip:bottom="{ value: getMatchTooltip(item.assessment),
                                                    pt: {
                                                        }
                                                    }" v-if="item.assessment && item.assessment" :icon="getMatchIcon(item.assessment)" :severity="getMatchSeverity(item.assessment)" :value="getNormalizedMatchLabel(item.assessment)"></Tag>
                                                <span class=""> | </span>
                                                <i class="pi pi-map"></i>
                                                <span class="">{{ item.origin }} | </span>
                                                <span class="">{{ tsToDate(item.first_seen) }}</span>

                                            </div>
                                            <Tag
                                                v-if="item.energy_label"
                                                icon="pi pi-tag pr-1"
                                                :class="getEnergyLabelClass(item.energy_label)"
                                                :value="item.energy_label"
                                            ></Tag>
                                        </div>

                                        <div class="flex flex-column align-items-center gap-2">
                                            <a :href="item.url" target="_blank" rel="noopener noreferrer">
                                                <img
                                                    class="border-round object-fill w-11 max-h-1"
                                                    :src="`http://localhost/house_images/${item.key}.jpg`"
                                                />
                                            </a>
                                            <div>
                                                <h5 class="m-0 pt-2 align-middle">
                                                    {{ item.address }}
                                                </h5>
                                            </div>
                                            <div class="text-lg py-1">
                                                <i class="pi pi-map-marker"></i>
                                                {{ item.city }}, {{ item.postcode }}
                                            </div>
                                            <div class="text-lg">
                                                <Chip
                                                    v-if="item.living_area"
                                                    :label="item.living_area"
                                                    class="prop-chip pl-4 pr-3 mr-2"
                                                    image="/area-icon.svg"
                                                >
                                                </Chip>
                                                <Chip
                                                    v-if="item.construction_year"
                                                    :label="item.construction_year"
                                                    class="prop-chip pl-4"
                                                    image="/const-year-icon.svg"
                                                >
                                                </Chip>
                                            </div>
                                        </div>

                                        <div class="flex align-items-center justify-content-between pl-3 pt-4">
                                            <span class="text-xl font-semibold">{{ item.price }}</span>
                                            <div class="flex justify-content-between pr-2 m-1">
                                                <div class="pr-2">
                                                    <Button text   size="small" class="p-2"  @click="bookmarkHouse()" icon="pi pi-bookmark"></Button>
                                                </div>
                                                <a
                                                    :href="item.url"
                                                    class="pr-2"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button outlined size="small" class="p-2" icon="pi pi-map"></Button>
                                                </a>
                                                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                                                    <Button size="small" class="p-2" icon="pi pi-arrow-right"></Button>
                                                </a>
                                            </div>
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

            <div class="footer">© Crawlson 2024</div>
        </div>
        <Menu class="sidebar" :model="items" />
        <Toast position="bottom-right" group="br" />
    </div>
</template>

<script>
import { GET_USER_INFO, GET_JWT_TOKEN, SET_AUTHENTICATION, SET_JWT_TOKEN, SET_USER_INFO } from "../store/storeconstants";
import { ref } from "vue";
import Config from "../config";
import axios from "axios";
import { useDateFormat, useNow } from "@vueuse/core";
import { useToast } from "primevue/usetoast";
import { watch } from "vue";
import { useStore } from "vuex";

export default {
    name: "MainPage",
    setup() {
        const store = useStore();
        const toast = useToast();

        watch(
            () => store.getters.getErrorMessage,
            (message, prevMessage) => {
                if (message) {
                    toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: message,
                        group: "br",
                        life: 6000,
                    });
                }
            }
        );

        watch(
            () => store.getters.getInfoMessage,
            (message, prevMessage) => {
                console.log("info message", message);
                if (message) {
                    toast.add({
                        severity: "info",
                        summary: "Update",
                        detail: message,
                        group: "br",
                        life: 6000,
                    });
                }
            }
        );
    },
    watch: { searchInput( input )
        {
            console.log( input );

            input = input.toLowerCase();

            this.onFilterChange( { value: { value: this.selected_filter } } );

            let foundHouses = this.selected_houses;

            if( input != "" ) {
                foundHouses = foundHouses.filter( function( house ) {
                    let formatted = useDateFormat( house.first_seen, "DD MMM HH:mm").value;

                    let found = house.address.toLowerCase().search( input )  != -1 ||
                                house.city.toLowerCase().search( input )     != -1 ||
                                house.postcode.toLowerCase().search( input ) != -1 ||
                                house.origin.toLowerCase().search( input )   != -1 ||
                                house.price.toLowerCase().search( input )     != -1 ||
                                formatted.toLowerCase().search( input )      != -1;
                    return found;
                });

                this.selected_houses = foundHouses;
            }

            this.selected_houses = foundHouses;
        }
    },
    beforeMount() {
        const instance = axios.create({
            baseURL: Config.serverAddr,
            timeout: 5000,
            headers: {
                authorization: "bearer " + this.$store.state.auth.jwtToken,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        try {
            let _this = this;
            instance
                .get("api/v1/dashboard/houses", null, {})
                .then( (response) => {
                    if( response && response.data && response.data.data && response.data.data.houses ) {
                        _this.stored_houses = response.data.data.houses;
                        _this.assessments = response.data.data.assessments;

                        this.mergeAssessmentsWithHouses();
                        this.displayMatchedHouses();

                        _this.dashboard_loading = false;

                    } else {
                        this.showToast( "error", "Unexpected error. Refresh the page and try again." );
                    }

                }).catch((error) => {
                    this.showToast( "error", "Unexpected error. Refresh the page and try again." );
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    },
    data() {
        return {
            layout: ref("grid"),
            stored_houses: [],
            selected_houses: [],
            selected_filter: "matched_houses",
            assessments: [],
            dashboard_loading: true,
            showAllHouses: false,
            searchInput: "",
            sortOptions: ref([
                { label: "Matched houses", value: "matched_houses" },
                { label: "All houses", value: "all_houses" },
            ]),
            sortKey: ref(),
            items: ref([
                {
                    label: "Home",
                    items: [
                        {
                            label: "Dashboard",
                            icon: "pi pi-home",
                        },
                        {
                            label: "My house",
                            icon: "pi pi-bookmark",
                        },
                        {
                            label: "Settings",
                            icon: "pi pi-cog",
                            command: () => {  this.$router.push({ name: "settings" }); }
                        },
                    ],
                },
                {
                    label: "Profile",
                    items: [
                        {
                            label: "Account",
                            icon: "pi pi-user",
                        },
                        {
                            label: "Logout",
                            icon: "pi pi-sign-out",
                            command: this.logout
                        },
                    ],
                },
            ]),
        };
    },
    methods: {
        onFilterChange(event) {
            console.log(event)
            const value = event.value.value;
            console.log(value)

            this.selected_filter = value;

            if( value == "all_houses" ) {
                this.selected_houses = this.stored_houses;
            } else if( value == "matched_houses" ) {
                this.displayMatchedHouses();
            }
        },
        showToast( severity, message ){
            let topic = "";

            if( severity == "error") { topic = "setErrorMessage" }
            if( severity == "info") { topic = "setInfoMessage" }

            this.$store.commit( topic, message );

            setTimeout(() => {
                this.$store.commit( topic, "");
            }, 100);
        },
        logout() {
            this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
            this.$store.commit(`auth/${SET_JWT_TOKEN}`, "");
            this.$store.commit(`auth/${SET_USER_INFO}`, {});
            this.$router.push({ name: "login" });
        },
        tsToDate(ts) {
            const formatted = useDateFormat(ts, "DD MMM HH:mm");
            return formatted.value;
        },
        getEnergyLabelClass(label) {
            if (label.startsWith("A++") || label.startsWith("A_PLUS_PLUS") ) return "p-tag-a-pp";
            if (label.startsWith("A+") || label.startsWith("A_PLUS") ) return "p-tag-a-p";
            if (label.charAt( 0 ) == "A" ) return "p-tag-a";
            if (label.charAt(0) == "B") return "p-tag-b";
            if (label.charAt(0) == "C") return "p-tag-c";
            if (label.charAt(0) == "D") return "p-tag-d";

            return "p-tag-e";
        },
        mergeAssessmentsWithHouses() {
            for( let i = 0; i < this.stored_houses.length; i++ ) {
                let house_ = this.stored_houses[i];
                let assessment = this.assessments.find( (assessment) => assessment.house_key == house_.key );
                if( assessment != undefined ) {
                    this.stored_houses[i].assessment = assessment;
                }
            }
        },
        displayMatchedHouses() {
            let matchedHouses = this.stored_houses.filter( function( house ) {
                return house.assessment != undefined && house.assessment.match == true;
            });

            this.selected_houses = matchedHouses;
        },
        getMatchTooltip( assessment ) {
            if( assessment && assessment.reason ) {
                return assessment.reason;
            }
            return "";
        },
        getMatchIcon( assessment ) {
            if( assessment && assessment.category ) {
                if( assessment.category == "match" ) { return "pi pi-check"; }
            }
            return "pi pi-times";
        },
        getMatchSeverity( assessment ) {
            if( assessment && assessment.category ) {
                if( assessment.category == "match" ) { return "success"; }
            }
            return "danger";
        },
        getNormalizedMatchLabel( assessment ) {
            if( assessment && assessment.category ) {
                let category = assessment.category;
                category = category.replace( "_", ' ' );
                category = category.charAt( 0 ).toUpperCase() + category.slice( 1 );
                return category;
            }
            return "";
        },
        onDataViewPageChanged() {
            window.scrollTo( 0, 0 );
        },
        bookmarkHouse() {
            
        }
    },
};
</script>

<style>
.p-highlight {
    font-weight: 800 !important;
}
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
    transition: left 0.2s;
    display: flex;
    align-items: center;
    box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;
}
html {
    font-size: 14px;
}
.logo {
    height: 40px;
    padding-left: 30px;
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
    transition: background-color 0.2s;
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
.p-tag-a-pp {
    background-color: #63aa5a;
}
.p-tag-a-p {
    background-color: #7bae4a;
}
.p-tag-a {
    background-color: #bdd342;
}
.p-tag-b {
    background-color: #ffe731;
}
.p-tag-c {
    background-color: #fbb900;
}
.p-tag-d {
    background-color: #fb8800;
}
.p-tag-e {
    background-color: #e30613;
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
    transition: margin-left 0.2s;
}
.footer {
    transition: margin-left 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid var(--surface-border);
    font-weight: 500 !important;
}
.card {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--card-shadow);
    border-radius: 12px;
}
.p-menu {
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
    transition: transform 0.2s, left 0.2s;
    background-color: var(--surface-overlay);
    padding: 0.5rem 1rem;
    box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;
}
.skeleton-item {
    width: 25% !important;
    padding: 2rem !important;
}
.skeleton {
    flex-wrap: wrap !important;
    box-sizing: border-box;
    display: flex !important;
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
.layout-menu .layout-root-menuitem > .layout-menuitem-root-text {
    font-size: 0.857rem;
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
.p-dataview-header {
    padding: 0.5rem 1rem;
}
</style>
