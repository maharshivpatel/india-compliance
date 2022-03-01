import IndiaComplianceAccountApp from "./IndiaComplianceAccountApp.vue";

class IndiaComplianceAccountPage {
    constructor(options) {
        Object.assign(this, options);
        this.show();
    }

    show() {
        const $vm = new Vue({
            el: this.wrapper,
            render: (h) => h(IndiaComplianceAccountApp),
        });
        this.$component = $vm.$children[0];
    }
}

frappe.provide("india_compliance.page");
india_compliance.page.IndiaComplianceAccountPage = IndiaComplianceAccountPage;