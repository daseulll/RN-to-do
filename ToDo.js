import React, { Component } from 'react';
import { 
    Text, 
    View, 
    Input, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions
} from 'react-native'


const { width, height } = Dimensions.get('window')

// 수정을 누르면 변해야 하기 때문에 stateful한 class를 사용한다.
export default class ToDo extends React.Component{
    state = {
        isEditing: false,
        isCompleted: false
    }
    render() {
        const { isCompleted } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._toggleCompleteToDo}>
                    <View 
                        style={[
                            styles.circle,
                            isCompleted? styles.completeCircle : styles.uncompleteCircle
                        ]} 
                    />
                </TouchableOpacity>
                <Text style={styles.text}>Hello I'm To Do</Text>
            </View>
        )
    }
    _toggleCompleteToDo = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completeCircle: {
        borderColor: "#bbb"
    },
    uncompleteCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    }
})