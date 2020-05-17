import { Tab } from "app/components/category-products";
import { PropEditor, PropEditorState } from "maishu-jueying";
import React from "react";
import { guid } from "maishu-toolkit";
import { showTabDialog } from "./tab-dialog";
import { categoryDialog } from "../controls/select-dialogs/category-select-dialog";
import { productDialog } from "../controls/select-dialogs/product-select-dialog";

export class TabsEditor extends PropEditor<PropEditorState<Tab[]>, Tab[]>{
    /** 添加一级分类 */
    addParent() {
        showTabDialog((item) => {
            let value = this.props.value || [];
            value.push({ id: guid(), name: item.name, source: "category" });
            this.props.updateComponentProp(value)
        }, null, {});
    }
    /** 添加二级分类 */
    addChild(parent: Tab) {
        let tabs = this.props.value || [];
        showTabDialog((item) => {
            parent.children = parent.children || [];
            parent.children.push({ id: guid(), name: item.name, source: "category" })
            this.props.updateComponentProp(tabs)
        }, parent, {});
    }
    remove(id: string) {
        let tabs = this.props.value || [];
        tabs = tabs.filter(o => o.id != id);
        this.props.updateComponentProp(tabs);
    }
    edit(tab: Tab, parent: Tab | null) {
        showTabDialog((item) => {
            Object.assign(tab, item);
            this.setState({});
            let tabs = this.props.value || [];
            this.props.updateComponentProp(tabs)
        }, parent, tab)
    }
    selectProduct(tab: Tab) {
        productDialog.show(tab.productIds || [], (productIds) => {
            tab.productIds = productIds;
            let tabs = this.props.value;
            this.props.updateComponentProp(tabs);
        })
    }
    selectCategory(tab: Tab) {
        categoryDialog.show(tab.categoryId != null ? [tab.categoryId] : [], (categoryIds) => {
            tab.categoryId = categoryIds[0];
            let tabs = this.props.value;
            this.props.updateComponentProp(tabs);
        })
    }
    renderItem(tab: Tab, parent: Tab | null) {
        return <tr>
            <td style={{ paddingLeft: parent ? 52 : null }}>
                {parent == null ? <button className="btn btn-minier btn-primary"
                    title="点击添加子类别"
                    style={{ marginRight: 6 }}
                    onClick={() => this.addChild(tab)}>
                    <i className="icon-plus"></i>
                </button> : null}
                {tab.name}
            </td>
            <td style={{ textAlign: "center" }}>
                <div className="radio-inline">
                    <input name={tab.id} type="radio" checked={tab.source == "category"}
                        onChange={e => {
                            tab.source = "category";
                            this.setState({});
                        }} />
                    <span>商品类别</span>
                </div>
                <div className="radio-inline">
                    <input name={tab.id} type="radio" checked={tab.source == "manual"}
                        onChange={e => {
                            tab.source = "manual";
                            this.setState({});
                        }} />
                    <span>手动选择</span>
                </div>
            </td>
            <td style={{ textAlign: "center" }}>
                <button className="btn btn-primary btn-minier"
                    onClick={() => { tab.source == "manual" ? this.selectProduct(tab) : this.selectCategory(tab) }} >
                    {tab.source == "manual" ? "选择商品" : "选择类别"}
                </button>

                <button className="btn btn-minier btn-info"
                    onClick={() => this.edit(tab, null)}>
                    <i className="icon-pencil"></i>
                </button>
                <button className="btn btn-danger btn-minier"
                    onClick={() => this.remove(tab.id)}>
                    删除
                </button>
            </td>
        </tr>
    }
    render() {
        let tabs = this.props.value || [];
        return <div>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th style={{ width: 220 }}>商品来源</th>
                        <th style={{ width: 200 }}>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {tabs.map(o => {
                        return <>
                            {this.renderItem(o, null)}
                            {(o.children || []).map(c =>
                                this.renderItem(c, o)
                            )}
                        </>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} style={{ textAlign: "center" }}>
                            <button className="btn btn-primary" type="button" style={{ width: 120 }}
                                onClick={() => this.addParent()}>
                                添加商品分类
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    }
}
