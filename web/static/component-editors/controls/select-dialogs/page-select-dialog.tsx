import React from "react";
import * as ui from "maishu-ui-toolkit";
import { createDialogElement } from "../utiltiy";
import ReactDOM from "react-dom";
import { DataSourcePagingBar, createGridView, boundField, customField, GridViewCell, customDataField } from "maishu-wuzhui-helper";
import { dataSources } from "../../../services/data-sources";
import { PageRecord } from "../../../services/local-service";

class PageSelectDialog extends React.Component {
    pagingBarElement: HTMLElement;
    table: any;
    callback: Callback;
    dataSource = dataSources.page;

    componentDidMount() {
        createGridView({
            dataSource: this.dataSource,
            element: this.table,
            columns: [
                customDataField<PageRecord>({
                    headerText: "页面名称",
                    render: (dataItem, cellElement) => {
                        cellElement.onclick = () => {
                            if (this.callback) {
                                this.callback(dataItem);
                            }
                            ui.hideDialog(dialogElement);
                        }
                        return dataItem.name;
                    }
                })
            ],
            pageSize: null,
        })

        new DataSourcePagingBar({
            dataSource: this.dataSource,
            element: this.pagingBarElement,
            pagerSettings: {
                activeButtonClassName: 'active',
                buttonWrapper: 'li',
                buttonContainerWraper: 'ul',
                showTotal: false,
            },
        })
    }

    render() {
        return <div className="modal-dialog select-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={() => ui.hideDialog(dialogElement)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">选择页面</h4>
                </div>
                <div className="modal-body">
                    <table ref={e => this.table = e || this.table} />
                </div>
                <div className="modal-footer">
                    <div className="paging-bar pull-left"
                        ref={(e: HTMLElement) => this.pagingBarElement = e || this.pagingBarElement} >
                    </div>
                    <button name="cancel" type="button" className="btn btn-default"
                        onClick={() => ui.hideDialog(dialogElement)}>
                        取消
                    </button>
                    <button name="ok" type="button" className="btn btn-primary"
                        onClick={() => {
                            ui.hideDialog(dialogElement);
                        }}>
                        确定
                    </button>
                </div>
            </div>
        </div>
    }
}

let dialogElement = createDialogElement();
let dialog = ReactDOM.render(<PageSelectDialog />, dialogElement) as any as PageSelectDialog;

type Callback = (item: PageRecord) => void;
export function showPageDialog(callback: Callback) {
    dialog.callback = callback;
    ui.showDialog(dialogElement);
}