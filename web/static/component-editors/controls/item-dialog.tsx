import React = require("react");
import * as ui from "maishu-ui-toolkit";
import { FormValidator } from "maishu-dilu";
import ReactDOM from "react-dom";

type ConfirmCallback<T> = (item: T) => void;
export interface ItemDialogState<T> {
    item: T, title?: string
}
export class ItemDialog<P, T, S extends ItemDialogState<T> = ItemDialogState<T>> extends React.Component<P, S> {
    private item: T;
    protected element: HTMLElement;
    private confirmCallback: ConfirmCallback<T>;

    protected confirmButtonText = "保存"
    protected cancelButtonText = "取消";
    protected validator: FormValidator;


    constructor(props) {
        super(props);

        this.element = document.createElement("div");
        this.element.className = "modal fade";
        document.body.append(this.element);

        this.state = { item: {} as T } as any;
        let render = this.render;
        console.assert(render != null);

        this.render = () => {
            let { title, item } = this.state || {} as this["state"];
            if (item == null)
                item = {} as this["state"]["item"];

            let r = <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">{title || ""}</h4>
                    </div>
                    <div className="modal-body">
                        {render.bind(this)()}
                    </div>
                    <div className="modal-footer" style={{ marginTop: 0 }}>
                        <button type="button" className="btn btn-default" data-dismiss="modal">
                            {this.cancelButtonText}
                        </button>
                        <button type="button" className="btn btn-primary"
                            onClick={() => this.confirm()}>
                            {this.confirmButtonText}
                        </button>
                    </div>
                </div>
            </div>

            return ReactDOM.createPortal(r, this.element);
        }
    }


    private confirm() {
        if (this.validator && !this.validator.check())
            return;

        let { item } = this.state;
        Object.assign(this.item, item);
        ui.hideDialog(this.element);
        if (this.confirmCallback)
            this.confirmCallback(item)
    }

    show(item: T, title: string, confirm?: ConfirmCallback<T>)
    show(title: string, confirm?: ConfirmCallback<T>)
    show(arg1: any, arg2: any, arg3?: any) {
        let item: T, title: string, confirm: ConfirmCallback<T>;
        if (typeof arg1 == "string") {
            title = arg1;
            confirm = arg2;
        }
        else {
            item = arg1;
            title = arg2;
            confirm = arg3;
        }

        if (this.validator)
            this.validator.clearErrors();

        this.item = item;
        this.confirmCallback = confirm;
        this.setState({ item: Object.assign({}, item) as any, title }, () => {
            ui.showDialog(this.element);
        });
    }

}
