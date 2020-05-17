import React from "react";
import * as ui from "maishu-ui-toolkit";
import { FormValidator, rules } from "maishu-dilu";
import { createDialogElement } from "../controls/utiltiy";
import ReactDOM from "react-dom";
import { Tab } from "app/components/category-products";

interface Props {

}

interface State {
    tab: Partial<Tab>,
    parent?: Tab,
}

type Callback = (item: Partial<Tab>) => void;

class CategoryDialog extends React.Component<Props, State> {

    validator: FormValidator;
    callback: Callback;

    constructor(props: Props) {
        super(props);
        this.state = { tab: {} }
    }

    confirm() {
        if (!this.validator.check())
            return;

        if (this.callback) {
            let nameInput = element.querySelector("[name='name']") as HTMLInputElement;
            let sortNumberInput = element.querySelector("[name='sortNumber']") as HTMLInputElement;
            let sortNumber = Number.parseInt(sortNumberInput.value);
            if (Number.isNaN(sortNumber))
                sortNumber = null;

            this.callback({ name: nameInput.value, sortNumber });
        }
        ui.hideDialog(element);
    }

    componentDidMount() {
        this.validator = new FormValidator(element.querySelector(".modal-body"),
            { name: "name", rules: [rules.required("请输入类别名称")] },
            { name: "sortNumber", rules: [rules.numeric("请输入数字")], condition: (element) => element.value != "" }
        )
    }

    render() {
        let { tab, parent } = this.state;
        tab = tab || {}
        return <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={() => ui.hideDialog(element)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">选择商品</h4>
                </div>
                <div className="modal-body">
                    {parent != null ? <div className="form-group clearfix input-control">
                        <label>所属分类</label>
                        <span>
                            {parent.name}
                        </span>
                    </div> : null}
                    <div className="form-group clearfix input-control">
                        <label>名称*</label>
                        <span><input className="form-control" name="name" value={tab.name || ""}
                            placeholder="请输入名称"
                            onChange={e => {
                                tab.name = e.target.value;
                                this.setState({ tab });
                            }} /></span>
                    </div>
                    <div className="form-group clearfix input-control">
                        <label>序号</label>
                        <span><input className="form-control" name="sortNumber"
                            placeholder="请输入序号"
                            ref={e => {
                                if (!e) return;
                                e.value = tab.sortNumber == null ? "" : `${tab.sortNumber}`;
                                e.onchange = () => {
                                    let num = Number.parseInt(e.value);
                                    if (!Number.isNaN(num)) {
                                        tab.sortNumber = num;
                                        this.setState({ tab });
                                    }
                                }
                            }}
                        /></span>
                    </div>

                </div>
                <div className="modal-footer">
                    <button name="cancel" type="button" className="btn btn-default"
                        onClick={() => ui.hideDialog(element)}>
                        取消
                    </button>
                    <button name="ok" type="button" className="btn btn-primary"
                        onClick={() => this.confirm()}>
                        确定
                    </button>
                </div>
            </div>
        </div>
    }
}

let element = createDialogElement();
let instance: CategoryDialog = ReactDOM.render(<CategoryDialog />, element) as any;

export function showTabDialog(callback: Callback, parent: Tab, item: Partial<Tab>) {
    ui.showDialog(element);
    instance.callback = callback;
    instance.validator.clearErrors();
    instance.setState({ tab: item, parent });
}