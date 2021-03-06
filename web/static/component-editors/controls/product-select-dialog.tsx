import { ShoppingService } from "../../services/shopping";
import { ImageService } from "../../services/image-service";
import ImageThumber from './image-thumber';
import { createDialogElement } from './utiltiy';
import React = require('react');
import ReactDOM = require('react-dom');
import * as wuzhui from "maishu-wuzhui-helper";
import * as ui from "maishu-ui-toolkit";
import { errorHandle } from "maishu-chitu-admin/static";
import { Less } from 'maishu-ui-toolkit';

import ShopWebsiteConfig from "json!websiteConfig";
import { Product } from '../../models/shopping';
import { pathContact } from "maishu-toolkit";
import common from "./common";
let contextName = ShopWebsiteConfig.requirejs.context;

Less.renderByRequireJS(pathContact(common.path, "product-select-dialog.less"), { contextName });
type ProductsDialogProps = {
    // shopping: ShoppingService,
} & React.Props<ProductSelectDialog>;

type ProductsDialogState = {
    products?: Product[],
    selectedIds: string[],
}

type ConfirmSelectedProducts = (productIds: string[]) => Promise<any> | void;
export class ProductSelectDialog extends React.Component<ProductsDialogProps, ProductsDialogState>{

    private dataSource: wuzhui.DataSource<Product>;
    private pagingBarElement: HTMLElement;
    private searchInput: HTMLInputElement;
    private confirmSelectedProducts: (productIds: string[]) => Promise<any> | void;
    private selectArguments: wuzhui.DataSourceSelectArguments;
    private shoppingService: ShoppingService;
    private imageService: ImageService;

    constructor(props: ProductsDialogProps) {
        super(props);

        this.state = { selectedIds: [] };

        this.shoppingService = new ShoppingService(err => errorHandle(err));
        this.imageService = new ImageService(err => errorHandle(err));

        this.dataSource = new wuzhui.DataSource({
            select: (args) => {
                args.maximumRows = 18;
                return this.shoppingService.products(args);
            }
        });

        this.selectArguments = { maximumRows: 18, filter: '!OffShelve' };
        this.dataSource.selected.add(args => {
            this.setState({ products: args.selectResult.dataItems })
        });
    }

    static show(selectedIds: string[], confirmSelectedProducts: (productIds: string[]) => Promise<any> | void)
    static show(confirmSelectedProducts: (productIds: string[]) => Promise<any> | void)
    static show(selectedIdsOrCallback: string[] | ConfirmSelectedProducts, confirmSelectedProducts?: (productIds: string[]) => Promise<any> | void) {

        let selectedIds: string[];
        if (typeof selectedIdsOrCallback == "function") {
            confirmSelectedProducts = selectedIdsOrCallback;
            selectedIdsOrCallback = [];
        }
        else {
            selectedIds = selectedIdsOrCallback;
        }

        instance.confirmSelectedProducts = confirmSelectedProducts;
        instance.setState({ selectedIds });

        instance.selectArguments.startRowIndex = 0;
        instance.dataSource.select(instance.selectArguments);

        ui.showDialog(element);
    }

    selecteProduct(p: Product) {
        let selecteIds = this.state.selectedIds;
        let exists = selecteIds.filter(o => o == p.Id)[0] != null;

        // 如果已经选择，则取消选择
        if (exists) {
            selecteIds = selecteIds.filter(o => o != p.Id);
            this.setState({ selectedIds: selecteIds })
        }
        else {
            selecteIds.push(p.Id);
        }
        this.setState({ selectedIds: selecteIds });
    }

    setPagingBar(e: HTMLElement) {
        if (!e || wuzhui.Control.getControlByElement(e))
            return;
    }

    componentDidMount() {
        new wuzhui.DataSourcePagingBar({
            dataSource: this.dataSource,
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

    renderImage(e: HTMLImageElement, src: string) {
        if (!e) return;
        ui.renderImage(e);
    }

    search(text: string) {
        this.dataSource.select();
    }

    render() {
        let { products, selectedIds } = this.state;
        let status: 'loading' | 'none' | 'finish';
        if (products == null)
            status = 'loading';
        else if (products.length == 0)
            status = 'none';
        else
            status = 'finish';

        return (
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={() => ui.hideDialog(element)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">选择商品</h4>
                    </div>
                    <div className="modal-body">
                        <div className="input-group">
                            <input type="text" className="form-control pull-right input-sm" placeholder="请输入SKU或名称、类别" style={{ width: '100%' }}
                                ref={(e: HTMLInputElement) => this.searchInput = e || this.searchInput} />
                            <span className="input-group-btn">
                                <button className="btn btn-primary btn-sm pull-right" onClick={() => this.search(this.searchInput.value)}>
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
                                    // let selected = selecteItems.indexOf(p) >= 0;
                                    return <div key={p.Id} className="product"
                                        onClick={() => this.selecteProduct(p)}>
                                        <ImageThumber imagePath={this.imageService.imageSource(p.ImagePath)}
                                            text={p.Name}
                                            selectedText={selectedIds.indexOf(p.Id) >= 0 ? `${selectedIds.indexOf(p.Id) + 1}` : ''} />
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
                            onClick={() => ui.hideDialog(element)}>
                            取消
                            </button>
                        <button name="ok" type="button" className="btn btn-primary"
                            onClick={() => {
                                if (this.confirmSelectedProducts) {
                                    this.confirmSelectedProducts(selectedIds)
                                }
                                ui.hideDialog(element);
                            }}>
                            确定
                            </button>
                    </div>
                </div>
            </div>
        );
    }
}

let element = createDialogElement('product-select-dialog');

let instance: ProductSelectDialog = ReactDOM.render(<ProductSelectDialog />, element) as any;