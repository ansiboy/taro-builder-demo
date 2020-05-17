import React from "react";
import { MenuNode, Props as ComponentProps, Menu } from "app/components/menu";
import { MenuNodeDialog, links } from "./menu-node-dialog";
import * as ui from "maishu-ui-toolkit";
import { PropEditor } from "maishu-jueying";
import { defaultProps } from "app/components/default-props";
/*
    { showIcon: boolean },
    { menuNodes: MenuNode[] }> {
*/

interface State {
    // showIcon?: boolean,
    // menuNodes?: MenuNode[],
}

export class MenuNodeList extends PropEditor<State, MenuNode[]>{
    menuNodeDialog: MenuNodeDialog;

    constructor(props) {
        super(props);

        this.state = {};
    }
    newItem() {
        this.menuNodeDialog.show({} as MenuNode, "添加菜单项", (item) => {
            // let { menuNodes } = this.state;
            let menuNodes = this.props.value || [];
            menuNodes.push(item);
            // this.setState({ menuNodes });
            this.props.updateComponentProp(menuNodes);
        });
    }
    editItem(item: MenuNode) {
        this.menuNodeDialog.show(item, "编辑菜单项", () => {
            // let { menuNodes } = this.state;
            // this.setState({ menuNodes });
            let menuNodes = this.props.value || [];
            this.props.updateComponentProp(menuNodes);
        })
    }
    async deleteItem(menuItem: MenuNode) {
        let menuNodes = this.props.value.filter(o => o != menuItem);
        // this.setState({ menuNodes });
        this.props.updateComponentProp(menuNodes);
    }
    linkName(url: string) {
        let link = links.filter(o => o.url == url)[0];
        return link ? link.text : '';
    }
    render() {
        let compoenntProps = Object.assign({}, defaultProps.menu, this.props.editComponents[0].props) as ComponentProps;
        let showIcon = compoenntProps.showMenuIcon;
        let menuNodes = this.props.value;
        showIcon = showIcon == null ? false : showIcon;
        menuNodes = menuNodes || [];
        menuNodes.sort((a, b) => {
            return (a.sortNumber || 0) - (b.sortNumber || 0);
        });
        return <div className="menu-editor">
            {menuNodes.map((o, i) =>
                <div className="menu-item" key={i} style={{ display: "flow-root" }}>
                    <div className="pull-left" style={{ width: 60 }}>
                        {o.sortNumber}
                    </div>
                    <div className="pull-left" style={{ width: 100 }}>
                        {o.name}
                    </div>
                    <div className="pull-left">
                        {o.url} {this.linkName(o.url) ? `(${this.linkName(o.url)})` : ''}
                    </div>
                    <div className="pull-right">
                        <button className="btn btn-danger btn-sm pull-right" style={{ marginLeft: 4 }}
                            ref={(e: HTMLButtonElement) => {
                                if (!e) return;
                                e.onclick = ui.buttonOnClick(() => this.deleteItem(o), { confirm: `确定要删除菜单项 "${o.name}" 吗?` });
                            }}>
                            <i className="icon-remove" />
                            <span style={{ paddingLeft: 4 }}>删除</span>
                        </button>
                        <button className="btn btn-info btn-sm pull-right"
                            ref={(e: HTMLButtonElement) => {
                                if (!e) return;
                                e.onclick = () => this.editItem(o);
                            }}>
                            <i className="icon-pencil" />
                            <span style={{ paddingLeft: 4 }}>修改</span>
                        </button>
                    </div>
                </div>
            )}
            <div className="menu-item text-center">
                <button className="btn btn-primary"
                    onClick={() => {
                        this.newItem();
                    }}>
                    <i className="icon-plus" />
                    <span>点击添加菜单项</span>
                </button>
            </div>
            <MenuNodeDialog {...{ showIcon: showIcon, ref: (e) => this.menuNodeDialog = e || this.menuNodeDialog }} />
        </div>
    }
}
