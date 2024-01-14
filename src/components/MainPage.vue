<template>
    <div class="container">
        <div class="main-container">
            <div class="main-area">
                <div class="card pt-3">
                    <DataView  :value="selected_houses" :paginator="true" :alwaysShowPaginator="false" @page="onDataViewPageChanged()" :layout="layout"  :rows="12">
                        <template #empty>
                                <div v-if="searchInput != null" class="pt-3">
                                    Nothing was found
                                </div>
                                <div v-if="searchInput == null" class="flex flex-wrap pt-2">
                                    <div class="w-full xl:w-4 p-3">
                                        <Skeleton class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" class="mb-2"></Skeleton>
                                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                                        <Skeleton height="2rem" class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" height="4rem"></Skeleton>
                                    </div>
                                    <div class="w-full xl:w-4 p-3">
                                        <Skeleton class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" class="mb-2"></Skeleton>
                                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                                        <Skeleton height="2rem" class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" height="4rem"></Skeleton>
                                    </div>
                                    <div class="w-full xl:w-4 p-3">
                                        <Skeleton class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" class="mb-2"></Skeleton>
                                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                                        <Skeleton height="2rem" class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" height="4rem"></Skeleton>
                                    </div>
                                </div>
                                <div v-if="searchInput == null" class="flex flex-wrap">
                                    <div class="w-full xl:w-4 p-3">
                                        <Skeleton class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" class="mb-2"></Skeleton>
                                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                                        <Skeleton height="2rem" class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" height="4rem"></Skeleton>
                                    </div>
                                    <div class="w-full xl:w-4 p-3">
                                        <Skeleton class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" class="mb-2"></Skeleton>
                                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                                        <Skeleton height="2rem" class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" height="4rem"></Skeleton>
                                    </div>
                                    <div class="w-full xl:w-4 p-3">
                                        <Skeleton class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" class="mb-2"></Skeleton>
                                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                                        <Skeleton height="2rem" class="mb-2"></Skeleton>
                                        <Skeleton width="10rem" height="4rem"></Skeleton>
                                    </div>
                                </div>
                        </template>

                        <template #header>
                            <div>
                                <div class="flex  flex-wrap justify-content-end align-items-center gap-3">
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText class="flex flex-wrap" v-model="searchInput" v-tooltip.top="'Enter address, city, postcode, price, date or source.'" placeholder="Search" />
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
                                                    <!-- <Button text   size="small" class="p-2"  @click="bookmarkHouse()" icon="pi pi-bookmark"></Button> -->
                                                </div>
                                                <a
                                                    :href="getGoogleAddressLink(item)"
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
                </div>
            </div>
        </div>
        <Toast position="bottom-right" group="br" />
    </div>
</template>

<script>
import { GET_USER_INFO, GET_JWT_TOKEN, SET_AUTHENTICATION, SET_JWT_TOKEN, SET_USER_INFO } from "../store/storeconstants";
import { ref } from "vue";
import Config from "../config";
import axios from "axios";
import { useDateFormat } from "@vueuse/core";
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
                    this.showToast( "error", "Can't reach the server." );
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
            searchInput: null,
            sortOptions: ref([
                { label: "Matched houses", value: "matched_houses" },
                { label: "All houses", value: "all_houses" },
            ]),
            sortKey: ref(),
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

        },
        getAddressString( house ) {
            let ret = house.address;
            if( house.postcode ) {
                ret += ", " + house.postcode;
            }

            if( house.city ) {
                ret += ", " + house.city;
            }

            ret = ret.replaceAll( ",", "" );

            return ret;
        },
        getGoogleAddressLink( house ) {
            let addressString = this.getAddressString( house );
            return "https://maps.google.com/?q=" + encodeURIComponent( addressString );
        }
    },
};
</script>

<style>
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
</style>
