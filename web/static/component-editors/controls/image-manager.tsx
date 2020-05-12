import ImageUpload from './image-upload';
import ImageThumber from './image-thumber';
import * as wuzhui from "maishu-wuzhui";
import { createDialogElement } from './utiltiy';
import React = require('react');
import ReactDOM = require('react-dom');
import { DataSourceSelectArguments } from 'maishu-wuzhui';
import { errorHandle } from "maishu-chitu-admin/static";
import * as ui from "maishu-ui-toolkit";
import { parseUrl, pathContact } from "maishu-toolkit";
import { AjaxOptions } from 'maishu-chitu-service';
import { Less } from 'maishu-ui-toolkit';

import { ImageService } from '../../services/image-service';
import { config } from '../../config';
import websiteConfig from "json!websiteConfig";
import common from "./common";
let contextName = websiteConfig.requirejs.context;
Less.renderByRequireJS(pathContact(common.path, "image-manager.less"), { contextName });

type SiteImageData = {
    id: string, width?: number, height?: number
}

type State = {
    images: SiteImageData[],
    selectedItems: string[],
    selectedMax?: number
}

type Props = { element: HTMLElement } & React.Props<ImageManager>;
class ImageManager extends React.Component<Props, State> {

    private showDialogCallback: (imageIds: string[]) => void;
    private dataSource: wuzhui.DataSource<SiteImageData>;
    private pagingBarElement: HTMLElement;
    private selectArguments: DataSourceSelectArguments;
    private imageService: ImageService;

    constructor(props) {
        super(props);

        this.state = { images: [], selectedItems: [] };
        this.selectArguments = { maximumRows: 17 };
        this.dataSource = createImageDataSource();
        this.dataSource.selected.add(args => {
            this.setState({ images: args.selectResult.dataItems })
        })
        this.dataSource.inserted.add(args => {
            this.state.images.push(args.dataItem);
            this.setState({ images: this.state.images })
        })
        this.imageService = new ImageService((err) => errorHandle(err));
    }

    async componentDidMount() {

        new wuzhui.DataSourcePagingBar({
            dataSource: this.dataSource,
            element: this.pagingBarElement,
            pagerSettings: {
                activeButtonClassName: 'active',
                buttonWrapper: 'li',
                buttonContainerWraper: 'ul',
                showTotal: false
            },
        });

        let ul = this.pagingBarElement.querySelector('ul');
        ul.className = "pagination";

        // dataSource.select(this.selectArguments);
    }

    show(selectedMax: number, callback?: (imageIds: string[]) => void) {
        this.showDialogCallback = callback;
        // this.state.selectedItems = [];
        // this.setState(this.state);

        this.selectArguments.startRowIndex = 0;
        this.dataSource.select(this.selectArguments);

        this.setState({ selectedItems: [], selectedMax })
        ui.showDialog(this.props.element);
    }

    async saveImage(data: string) {
        this.dataSource.insert({ data } as any);
    }

    removeImage(item: { id: string }): any {
        this.dataSource.delete(item);
    }

    render() {
        let { images, selectedItems, selectedMax } = this.state;
        let element = this.props.element;
        return (
            // <div className="image-manager modal fade" ref={(e: HTMLElement) => this.element = e || this.element}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close"
                            onClick={() => ui.hideDialog(element)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">选择图片</h4>
                    </div>
                    <div className="modal-body">
                        {images.map((o, i) => {
                            let selectedText = selectedItems.indexOf(o.id) >= 0 ? `${selectedItems.indexOf(o.id) + 1}` : ''
                            let selectedAll = selectedItems.length == selectedMax
                            let thumber = <ImageThumber key={o.id} imagePath={this.imageService.imageSource(o.id, 150, 150)} className="col-xs-2"
                                remove={(imagePath: string) => this.removeImage(o)}
                                selectedText={selectedText}
                                disabled={selectedAll && !selectedText}
                                text={o.width != null && o.height != null ? `${o.width} X ${o.height}` : " "}
                                onClick={(sender, e) => {
                                    let selectedItems: string[] = this.state.selectedItems
                                    if (selectedItems.indexOf(o.id) >= 0) {
                                        selectedItems = selectedItems.filter(c => c != o.id);
                                    }
                                    else {
                                        if (selectedItems.length == selectedMax)
                                            return

                                        selectedItems.push(o.id);
                                    }
                                    this.setState({ selectedItems });
                                }} />

                            return thumber;
                        })}
                        <ImageUpload className="col-xs-2" saveImage={(data) => this.saveImage(data.base64)}
                            width={400} />
                        <div className="clearfix" />
                    </div>
                    <div className="modal-footer">
                        <div className="pull-left"
                            ref={(e: HTMLElement) => this.pagingBarElement = e || this.pagingBarElement}>
                        </div>
                        {selectedMax ? <div className="pull-left" style={{ paddingTop: 8, paddingLeft: 10 }}>
                            最多可选<b style={{ padding: '0 2px 0 2px' }}>{selectedMax}</b>张</div> : null}
                        <button name="cancel" type="button" className="btn btn-default"
                            onClick={() => ui.hideDialog(element)}>
                            取消
                            </button>
                        <button name="ok" type="button" className="btn btn-primary"
                            onClick={() => {
                                if (this.showDialogCallback) {
                                    let imageIds = this.state.selectedItems.map(o => o);
                                    this.showDialogCallback(imageIds);
                                }
                                ui.hideDialog(element);
                            }}>
                            确定
                        </button>
                    </div>
                </div>
            </div>
            // </div>
        )
    }
}

let element = createDialogElement('image-manager');

let instance: ImageManager = ReactDOM.render(<ImageManager element={element} />, element) as any;

export default {
    show(callback?: (imageIds: string[]) => void) {
        instance.show(null, callback);
    }
}

export function showImageDialog(maxImagesCount: number, callback: (imageIds: string[]) => void)
export function showImageDialog(callback: (imageIds: string[]) => void)
export function showImageDialog(maxImagesCount: any, callback?: any) {
    if (typeof maxImagesCount == 'function') {
        maxImagesCount = null
        callback = maxImagesCount
    }
    instance.show(maxImagesCount, callback)
}

function createImageDataSource() {
    let station = new ImageService(err => errorHandle(err));

    let ajax = station.ajax;
    station.ajax = function (url: string, options?: AjaxOptions) {
        options = options || {} as AjaxOptions;
        options.headers["application-id"] = config.applicationId;  //urlParams.appKey;
        let r = ajax.apply(station, [url, options]);
        return r;
    }
    let dataSource = new wuzhui.DataSource<SiteImageData>({
        primaryKeys: ['id'],
        async select(args) {
            let result = await station.list(args);//, 140, 140
            return result;
        },
        async delete(item) {
            let result = await station.remove(item.id);
            return result;
        },
        async insert(item) {
            console.assert((item as any).data != null);
            let result = await station.upload((item as any).data);
            Object.assign(item, result);
            return result;
        }
    })

    return dataSource;
}