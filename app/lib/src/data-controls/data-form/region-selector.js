"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = __importDefault(require("@tarojs/taro"));
const components_1 = require("@tarojs/components");
const maishu_toolkit_1 = require("maishu-toolkit");
const data_form_1 = require("./data-form");
const services_1 = require("../../services");
const taro_ui_1 = require("taro-ui");
const default_errors_1 = require("./default-errors");
const react_1 = __importDefault(require("react"));
class RegionSelector extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.id = maishu_toolkit_1.guid();
        this.state = { provinces: [], cities: [], counties: [], regions: [] };
    }
    async validate() {
        const context = this.context;
        let rules = this.props.validateRules || [];
        let errorMessage;
        let value = context.dataItem[this.props.dataField];
        for (let i = 0; i < rules.length; i++) {
            let r = await rules[i].validate(value);
            if (r == false) {
                let ruleError = rules[i].error;
                if (typeof ruleError == "string")
                    errorMessage = ruleError;
                else if (typeof ruleError == "function")
                    errorMessage = ruleError();
                else {
                    let defaultError = default_errors_1.defaultErrors[rules[i].type];
                    errorMessage = defaultError.replace("%s", this.props.dataField);
                }
            }
        }
        this.setState({ errorMessage });
        return errorMessage == null;
    }
    onPickerChanged(countyIndex) {
        let { counties } = this.state;
        // let province = provinces[provinceIndex];
        // let city = cities[cityIndex];
        let county = counties[countyIndex];
        let context = this.context;
        context.dataItem[this.props.dataField] = county.Id;
        this.setState({});
    }
    componentDidMount() {
        services_1.services.shopping.regions().then(items => {
            let provinces = items.filter(o => o.ParentId == null);
            console.assert(provinces[0] != null);
            let cities = items.filter(o => o.ParentId == provinces[0].Id);
            console.assert(cities[0] != null);
            let counties = items.filter(o => o.ParentId == cities[0].Id);
            this.setState({ provinces, cities, counties, regions: items });
        });
    }
    getCurrentRegion(regions, countyId) {
        if (countyId == null)
            return null;
        let county = regions.filter(o => o.Id == countyId)[0];
        if (county == null)
            return null;
        let city = regions.filter(o => o.Id == county.ParentId)[0];
        console.assert(city != null);
        let province = regions.filter(o => o.Id == city.ParentId)[0];
        console.assert(province != null);
        let currentRegion = { province, city, county };
        return currentRegion;
    }
    render() {
        let { provinces, cities, counties, regions } = this.state;
        let validateRules = this.props.validateRules || [];
        let hasRequired = validateRules.filter(o => o.type == "required").length > 0;
        let errorMessage = this.state.errorMessage;
        let context = this.context;
        let currentRegion = null;
        if (context.form != null && context.form.inputs[this.id] == null) {
            context.form.inputs[this.id] = this;
        }
        if (context.dataItem) {
            let countyId = context.dataItem[this.props.dataField];
            currentRegion = this.getCurrentRegion(regions, countyId);
        }
        return react_1.default.createElement(components_1.View, null,
            react_1.default.createElement(components_1.Picker, { mode: "multiSelector", value: [], range: [provinces, cities, counties], rangeKey: "Name", ref: e => this.picker = this.picker || e, onColumnChange: e => {
                    let currentTarget = e.currentTarget;
                    let { column, value } = currentTarget;
                    switch (column) {
                        case 0:
                            let province = provinces[value];
                            cities = regions.filter(o => o.ParentId == province.Id);
                            counties = regions.filter(o => o.ParentId == cities[0].Id);
                            this.setState({ cities, counties });
                            break;
                        case 1:
                            let city = cities[value];
                            counties = regions.filter(o => o.ParentId == city.Id);
                            this.setState({ counties });
                            break;
                    }
                }, onChange: (e) => {
                    let value = e.currentTarget.value;
                    this.onPickerChanged(value[2] || 0);
                } },
                react_1.default.createElement(taro_ui_1.AtInput, { title: this.props.title, placeholder: this.props.placeholder, name: this.props.dataField, required: hasRequired, error: errorMessage != undefined, value: currentRegion ? `${currentRegion.province.Name} ${currentRegion.city.Name} ${currentRegion.county.Name}` : "", onErrorClick: () => {
                        taro_1.default.showToast({ title: errorMessage || "", icon: "none" });
                    }, onChange: () => {
                        if (errorMessage)
                            this.validate();
                    } })));
    }
}
exports.RegionSelector = RegionSelector;
RegionSelector.contextType = data_form_1.DataFormContext;
//# sourceMappingURL=region-selector.js.map