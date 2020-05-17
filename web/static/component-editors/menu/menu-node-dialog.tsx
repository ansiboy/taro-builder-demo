import { MenuNode } from "app/components/menu";
import { ItemDialog } from "../controls/item-dialog";
import React from "react";

type Link = {
    text: string,
    url: string
}

export let links: Link[] = [
    { text: '请选择链接', url: '' },
    { text: '店铺主页', url: '#home_index' },
    { text: '购物车', url: '#shopping_shoppingCart' },
    { text: '会员主页', url: '#user_index' },
    { text: '商品类别', url: '#home_class' }
]

let icons = [
    "icon-home", "icon-shopping-cart", "icon-user", "icon-comment",
    "icon-rss", "icon-truck", "icon-reorder", "icon-calendar",
    "icon-th-large"
]

export class MenuNodeDialog extends ItemDialog<{ showIcon: boolean }, MenuNode> {
    private iconsElement: HTMLElement;

    private isCustomUrl() {
        if (this.state.item == null)
            return false;

        let currentUrl = this.state.item.url || "";
        let containsUrl = links.map(o => o.url).indexOf(currentUrl) >= 0;
        return !(containsUrl);
    }

    private toggleIconsPanel() {
        this.iconsElement.style.display ?
            this.iconsElement.style.removeProperty('display') :
            this.iconsElement.style.display = 'none';
    }

    render() {
        let { showIcon } = this.props;
        let { item: currentItem } = this.state || {} as this["state"];
        return <>
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">名称*</label>
                    <div className="col-sm-10">
                        <input name="name" type="text" className="form-control" placeholder="请输入菜单项名称"
                            value={currentItem.name || ""}
                            onChange={e => {
                                currentItem.name = e.target.value;
                                this.setState({ item: currentItem })
                            }} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">序号</label>
                    <div className="col-sm-10">
                        <input name="sortNumber" type="text" className="form-control" placeholder="请输入菜单项序号"
                            value={currentItem.sortNumber || ""}
                            onChange={e => {
                                currentItem.sortNumber = Number.parseInt(e.target.value);
                                this.setState({ item: currentItem })
                            }} />
                    </div>
                </div>
                {showIcon ?
                    <div className="form-group">
                        <label className="col-sm-2 control-label">图标</label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <input name="icon" type="text" className="form-control" placeholder="请输入菜单项图标"
                                    value={currentItem.icon || ""}
                                    onChange={e => {
                                        currentItem.icon = e.target.value;
                                        this.setState({ item: currentItem });
                                    }} />
                                <div className="input-group-addon"
                                    onClick={() => this.toggleIconsPanel()}>
                                    <i className="icon-cog" style={{ cursor: 'pointer' }} />
                                </div>
                                <div ref={(e: HTMLElement) => this.iconsElement = e || this.iconsElement} style={{
                                    position: 'absolute', height: 100, width: '100%', background: 'white',
                                    zIndex: 10, left: 0, top: 35, border: 'solid 1px #ccc', overflowY: 'auto',
                                    display: 'none'
                                }}>
                                    <div style={{ position: 'absolute', width: '100%', borderBottom: 'solid 1px #ccc', padding: '4px 6px', background: 'white' }}>
                                        <span>请选择图标</span>
                                        <i className="icon-remove" style={{ position: 'absolute', right: 6, top: 6 }}
                                            onClick={() => this.toggleIconsPanel()} />
                                    </div>
                                    <div style={{ padding: '30px 6px 6px 6px' }}>
                                        {icons.map(o =>
                                            <i key={o} className={o} style={{ display: 'table-cell', padding: 10, fontSize: 20 }}
                                                onClick={() => {
                                                    currentItem.icon = o;
                                                    this.toggleIconsPanel();
                                                    this.setState({ item: currentItem });
                                                }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
                <div className="form-group">
                    <label className="col-sm-2 control-label">链接*</label>
                    <div className="col-sm-10">
                        <input name="url" className="form-control"
                            style={{ display: this.isCustomUrl() ? null : 'none' }}
                            ref={(e: HTMLInputElement) => {
                                if (!e) return;
                                e.value = currentItem.url || '';
                                e.onchange = () => {
                                    currentItem.url = e.value;
                                }
                            }} />
                        <select className="form-control"
                            style={{ display: this.isCustomUrl() ? 'none' : null }}
                            ref={(e: HTMLSelectElement) => {
                                if (!e) return;
                                e.value = currentItem.url;
                                e.onchange = () => {
                                    let option = e.options[e.selectedIndex] as HTMLOptionElement;
                                    currentItem.url = option.value;
                                }
                            }}>
                            {links.map((o, i) =>
                                <option key={i} value={o.url}>
                                    {o.text}
                                </option>
                            )}

                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <input type="checkbox" style={{ display: "initial" }}
                            ref={(e: HTMLInputElement) => {
                                if (!e) return;
                                e.value = currentItem.url || '';
                                e.checked = this.isCustomUrl();
                                e.onchange = () => {
                                    if (e.checked) {
                                        this.state.item.url = null;
                                        this.setState(this.state);
                                    }
                                    else {
                                        this.state.item.url = '';
                                        this.setState(this.state);
                                    }
                                }

                            }} /> 自定义链接
                            </div>
                </div>
            </div>


        </>
    }
}