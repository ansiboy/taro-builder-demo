import { ImageService } from "../../../services/image-service";
import ImageThumber from '../image-thumber';
import { createDialogElement } from '../utiltiy';
import React = require('react');
import * as wuzhui from "maishu-wuzhui-helper";
import * as ui from "maishu-ui-toolkit";
import { errorHandle } from "maishu-chitu-admin/static";
import { Less } from 'maishu-ui-toolkit';

import ShopWebsiteConfig from "json!websiteConfig";
import { pathContact, DataSource, DataSourceSelectArguments } from "maishu-toolkit";
import common from "../common";
let contextName = ShopWebsiteConfig.requirejs.context;
// Less.renderByRequireJS(pathContact(common.path, "product-select-dialog.less"), { contextName });
import "./select-dialog.scss";

type FilterFlags<Base, Condition> = {
    [Key in keyof Base]:
    Base[Key] extends Condition ? Key : never
};

type AllowedNames<Base, Condition> =
    FilterFlags<Base, Condition>[keyof Base]


type SubType<Base, Condition> =
    Pick<Base, AllowedNames<Base, Condition>>


type SelectDialogProps<T> = {
    dataSource: DataSource<T>
    idField: AllowedNames<T, string>;
    nameField: AllowedNames<T, string>;
    imageField: AllowedNames<T, string>;
    element: HTMLElement;
    maxCount?: number;
} & React.Props<SelectDialog<T>>;

type SelectDialogState<T> = {
    items?: T[],
    selectedIds: string[],
    allowSelect: boolean,
}

type ConfirmSelectedProducts = (productIds: string[]) => Promise<any> | void;
export abstract class SelectDialog<T> extends React.Component<SelectDialogProps<T>, SelectDialogState<T>>{

    private pagingBarElement: HTMLElement;
    private searchInput: HTMLInputElement;
    private confirmSelectedProducts: (productIds: string[]) => Promise<any> | void;
    private imageService: ImageService;
    private selectArguments: DataSourceSelectArguments;

    constructor(props: SelectDialogProps<T>) {
        super(props);

        this.state = { selectedIds: [], allowSelect: true };

        this.imageService = new ImageService(err => errorHandle(err));
        this.selectArguments = { maximumRows: 18, filter: '!OffShelve' };
        this.props.dataSource.selected.add(args => {
            this.setState({ items: args.selectResult.dataItems })
        });
    }

    show(selectedIds: string[], confirmSelectedProducts: (productIds: string[]) => Promise<any> | void)
    show(confirmSelectedProducts: (productIds: string[]) => Promise<any> | void)
    show(selectedIdsOrCallback: string[] | ConfirmSelectedProducts, confirmSelectedProducts?: (productIds: string[]) => Promise<any> | void) {

        let selectedIds: string[];
        if (typeof selectedIdsOrCallback == "function") {
            confirmSelectedProducts = selectedIdsOrCallback;
            selectedIdsOrCallback = [];
        }
        else {
            selectedIds = selectedIdsOrCallback;
        }

        this.confirmSelectedProducts = confirmSelectedProducts;
        this.setState({ selectedIds });

        this.selectArguments.startRowIndex = 0;
        this.props.dataSource.select(this.selectArguments);

        ui.showDialog(this.props.element);
    }

    selectItem(p: T) {
        let idField = this.props.idField;
        let selecteIds = this.state.selectedIds;


        let exists = selecteIds.filter(o => o == p[idField] as any)[0] != null;

        // 如果已经选择，则取消选择
        if (exists) {
            selecteIds = selecteIds.filter(o => o != p[idField] as any);
            this.setState({ selectedIds: selecteIds })
            return
        }

        if (this.props.maxCount != null && selecteIds.length >= this.props.maxCount)
            return;

        selecteIds.push(p[idField] as any);
        this.setState({ selectedIds: selecteIds });
    }

    setPagingBar(e: HTMLElement) {
        if (!e || wuzhui.Control.getControlByElement(e))
            return;
    }

    componentDidMount() {
        new wuzhui.DataSourcePagingBar({
            dataSource: this.props.dataSource,
            element: this.pagingBarElement,
            pagerSettings: {
                activeButtonClassName: 'active',
                buttonWrapper: 'li',
                buttonContainerWraper: 'ul',
                showTotal: false,
            },
        });
        let ul = this.pagingBarElement.querySelector('ul');
        ul.className = "pagination";
    }

    renderImage(e: HTMLImageElement) {
        if (!e) return;
        ui.renderImage(e);
    }

    search() {
        this.props.dataSource.select();
    }

    render() {
        let { items: products, selectedIds } = this.state;
        let { idField, imageField, nameField } = this.props;
        let allowSelect = this.props.maxCount == null || selectedIds.length < this.props.maxCount;
        let status: 'loading' | 'none' | 'finish';
        if (products == null)
            status = 'loading';
        else if (products.length == 0)
            status = 'none';
        else
            status = 'finish';

        return <div className="modal-dialog modal-lg select-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={() => ui.hideDialog(this.props.element)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">选择商品</h4>
                </div>
                <div className="modal-body">
                    <div className="input-group">
                        <input type="text" className="form-control pull-right input-sm" placeholder="请输入SKU或名称、类别" style={{ width: '100%' }}
                            ref={(e: HTMLInputElement) => this.searchInput = e || this.searchInput} />
                        <span className="input-group-btn">
                            <button className="btn btn-primary btn-sm pull-right" onClick={() => this.search()}>
                                <i className="icon-search"></i>
                                <span>搜索</span>
                            </button>
                        </span>
                    </div>
                    <hr className="row" />
                    {status == 'loading' ?
                        <div className="loading">
                            数据正在加载中...
                        </div> : null}
                    {status == 'none' ?
                        <div className="norecords">
                            暂无商品数据
                        </div> : null}
                    {status == 'finish' ?
                        <div className="products">
                            {products.map(p => {
                                return <div key={p[idField] as any} className="product"
                                    onClick={() => this.selectItem(p)}>
                                    <ImageThumber imagePath={this.imageService.imageSource(p[imageField] as any)}
                                        text={p[nameField] as any} disabled={!allowSelect && selectedIds.indexOf(p[idField] as any) < 0}
                                        selectedText={selectedIds.indexOf(p[idField] as any) >= 0 ? `${selectedIds.indexOf(p[idField] as any) + 1}` : ''} />
                                </div>
                            }

                            )}
                        </div>
                        : null
                    }
                    <div className="clearfix"></div>
                </div>
                <div className="modal-footer">
                    <div className="paging-bar pull-left"
                        ref={(e: HTMLElement) => this.pagingBarElement = e || this.pagingBarElement} >
                    </div>
                    <button name="cancel" type="button" className="btn btn-default"
                        onClick={() => ui.hideDialog(this.props.element)}>
                        取消
                    </button>
                    <button name="ok" type="button" className="btn btn-primary"
                        onClick={() => {
                            if (this.confirmSelectedProducts) {
                                this.confirmSelectedProducts(selectedIds)
                            }
                            ui.hideDialog(this.props.element);
                        }}>
                        确定
                    </button>
                </div>
            </div>
        </div>
    }
}

