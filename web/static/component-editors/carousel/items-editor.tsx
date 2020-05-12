import { PropEditor, PropEditorState } from "maishu-jueying";
import { CarouselItem, Props as ComponentProps, Carousel } from "app/components/carousel";
import React = require("react");
import * as ui from "maishu-ui-toolkit";
import ImageManager from "../controls/image-manager";
import { ImageService } from "../../services/image-service";
import { errorHandle } from "maishu-chitu-admin/static";

//========================================
// 列表项的宽度，这 css 样式设定，要与它相同
const itemHeight = 120;
//========================================

export class ItemsEditor extends PropEditor<PropEditorState<CarouselItem[]>, CarouselItem[]>{
    imageService: ImageService;
    constructor(props) {
        super(props);

        this.imageService = new ImageService(err => errorHandle(err));
    }

    async showImageDialog() {
        ImageManager.show((imageIds) => {
            imageIds.forEach(o => {
                let items = this.props.value || [];
                items.push({ image: o, url: '', title: '' });
                this.props.updateComponentProp(items);
            })
        });
    }

    componentWillUpdate() {
        return false;
    }

    render() {
        let props = Object.assign({}, Carousel.defaultProps, this.props.editComponents[0].props) as ComponentProps;
        let { itemScale, clickType, items } = props;

        let itemWidth: number;
        if (itemScale) {
            itemWidth = itemHeight / itemScale;
        }

        return <div className="carousel-editor">
            <ul key="ul" className="carousel-items">
                {items.map((o, i) =>
                    <li key={i} style={{ width: itemWidth }}>
                        <div className="form-group">
                            <img key={o.image} src={this.imageService.imageSource(o.image, null, 120)} />
                        </div>
                        <div className="bottom-bar">
                            设置页面
                        </div>
                        <div className="top-bar">
                            <i className="icon-remove" ref={(e: HTMLButtonElement) => {
                                if (!e) return;
                                ui.buttonOnClick(e, () => {
                                    items = items.filter(c => c != o);
                                    // this.state.items = items;
                                    // this.setState(this.state);
                                    this.props.updateComponentProp(items);
                                    return Promise.resolve();
                                }, { confirm: '确定删除吗' })

                            }} />
                        </div>
                        {/* {clickType == 'openPage' ?
                            <div className="form-group">
                                <input className="form-control" placeholder="请输入和图片对应的链接" />
                            </div> : null
                        }
                        <div className="form-group">
                            <button className="btn btn-block btn-danger"
                                ref={(e: HTMLButtonElement) => {
                                    if (!e) return;
                                    ui.buttonOnClick(e, () => {
                                        items = items.filter(c => c != o);
                                        // this.state.items = items;
                                        // this.setState(this.state);
                                        this.props.updateComponentProp(items);
                                        return Promise.resolve();
                                    }, { confirm: '确定删除吗' })

                                }}>
                                删除
                            </button>
                        </div> */}
                    </li>
                )}
                <li style={{ width: itemWidth, color: 'unset' }} className="btn-link" onClick={() => this.showImageDialog()}>
                    <i className="icon-plus icon-4x"></i>
                    <div>从相册选取图片</div>
                </li>
            </ul>
            <div key="div" className="clearfix"></div>
        </div>
    }
}