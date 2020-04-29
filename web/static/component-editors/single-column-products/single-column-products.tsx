// import { SingleColumnProducts, Props } from "app/components/single-column-products.tsx";
// import * as React from "react";
// import { registerComponent } from "taro-builder-core";


// export class DesignSingleColumnProducts extends SingleColumnProducts {
//     constructor(props: Props) {
//         super(props);

//     }

//     componentWillReceiveProps(props: Props) {
//         debugger
//         let self = this as any as React.Component<Props>;
//         let isChanged = props.productsCount != self.props.productsCount || props.showCategories != self.props.showCategories;
//         if (isChanged) {
//             setTimeout(() => {
//                 this.repeater.reload();
//             }, 100);
//         }
//     }

//     render(){
//         return <div>FFFF</div>
//     }


// }

// registerComponent("SingleColumnProducts", DesignSingleColumnProducts);