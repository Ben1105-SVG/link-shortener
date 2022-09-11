<template>
        <div class="container">
            <div class="field">
                <label for="username2">Please paste your url here</label>
                <InputText v-model="link" class="py-5 link" id="username2" type="username" aria-describedby="username2-help"/>
            </div>
            <p>
                Your shortened link is :
                <a class="redirect-link" target="_blank" :href="linkGenerated">{{ linkGenerated }}</a>
            </p>
            <Button label="Generate short url" @click="generateUrl" class="p-button-info submit-btn" />
        </div>
        <div class="container">
            <DataTable
                :paginator="true" :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10,20,50]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                :value="links"
                responsiveLayout="scroll">
                <Column
                    v-for="col in columns"
                    :field="col.field"
                    :header="col.header"
                >
                    <template v-if="col.field === 'code'" #body="slotProps">
                        <a class="redirect-link" :href="baseUrl + '/' + slotProps.data.code" v-text="baseUrl + '/' + slotProps.data.code" />
                    </template>
                    <template v-if="col.field === 'link'" #body="slotProps">
                        <a class="redirect-link-long" :href="slotProps.data.link" v-text="slotProps.data.link" />
                    </template>
                </Column>
            </DataTable>
        </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
export default {
    name: "App",
    data() {
        return {
            link: '',
            linkGenerated: '',
            columns: [
                {field: 'id', header: 'id'},
                {field: 'link', header: 'Long URL'},
                {field: 'code', header: 'Shortened url'},
                {field: 'ip_address', header: 'Ip address'}
            ]
        }
    },
    computed: {
        links() {
            return this.$store.getters.links
        },
        baseUrl() {
            return window.location.origin
        }
    },
    created() {
        this.fetchLinks()
    },
    methods: {
        fetchLinks() {
            this.$store.dispatch('fetchLinks')
        },
        generateUrl() {
            this.$store.dispatch('createLink', { link: this.link }).then(res => {
                this.linkGenerated = this.baseUrl + '/' + res.data.code
                this.fetchLinks()
            })
        }
    },
    components:{InputText, Button, DataTable, Column},
}
</script>

<style scoped>
.redirect-link {
    color: royalblue;
}

.redirect-link-long {
    color: red;
}
.container {
    margin: 0 auto 20px auto;
    box-shadow: 0 1px 4px #ccc;
    border-radius: 2px;
    padding: 10px 30px 5px;
    background: #fff;
    text-align: center;
}
.field {
    display: flex;
    flex-direction: column;
}
.link {
    height: 56px;
    padding: 10px 16px;
    margin: 10px 0;
    font: 17px lato,arial;
    color: #000;
    background: #fff;
    border: 1px solid #bbb;
    box-sizing: border-box;
}
.submit-btn {
    width:100%;
    border-radius: 10px;
}
</style>
