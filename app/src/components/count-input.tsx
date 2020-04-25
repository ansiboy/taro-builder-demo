import React from "react";
import "./count-input.scss";
import { View, Input } from "@tarojs/components";

interface CountInputProps {
    value: number;
    onChange?: (value: number) => void;
}

interface CountInputState {
    value: number;
}

export class CountInput extends React.Component<CountInputProps, CountInputState> {

    static defaultProps: CountInputProps = { value: 0 }

    constructor(props) {
        super(props);

        this.state = { value: this.props.value };
    }
    private add() {
        let value = this.state.value;
        this.setState({ value: value + 1 });
        if (this.props.onChange)
            this.props.onChange(value);
    }
    private minus() {
        let value = this.state.value;
        value = value - 1;
        if (value < 0) {
            return;
        }
        this.setState({ value });
        if (this.props.onChange)
            this.props.onChange(value);
    }
    render() {
        let value = this.state.value;
        return <View className="count-input">
            <View className="plus" onClick={e => this.minus()}>
                <View className="at-icon at-icon-subtract"></View>
            </View>
            <Input className="number" value={`${value}`} />
            <View className="minus" onClick={e => this.add()}>
                <View className="at-icon at-icon-add"></View>
            </View>
        </View>
    }
}