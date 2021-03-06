import React, { Component } from 'react';
import { 
    Text, 
    View, 
    Input, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions,
    TextInput
} from 'react-native'


const { width, height } = Dimensions.get('window')

// 수정을 누르면 변해야 하기 때문에 stateful한 class를 사용한다.
export default class ToDo extends React.Component{
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    }
    render() {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleCompleteToDo}>
                        <View 
                            style={[
                                styles.circle,
                                isCompleted? styles.completeCircle : styles.uncompleteCircle
                            ]} 
                        />
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput 
                            style={[
                                styles.input, 
                                styles.text, 
                                isCompleted ? styles.completeText : styles.uncompleteText
                            ]} 
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this._controlInput}
                            returnKeyType={"done"}
                            onBlur={this._finishEditing}
                        /> 
                        ) : (
                        <Text style={[
                            styles.text,
                            isCompleted? styles.completeText : styles.uncompleteText
                        ]}
                        >
                        {text}
                        </Text> 
                    )}
                </View>
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✅</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✏️</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
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
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        })
    }
    _finishEditing = () => {
        this.setState({
            isEditing: false
        })
    }
    _controlInput = text => {
        this.setState({
            toDoValue: text
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
    },
    completeText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompleteText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row",
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        width: width / 2,
    }

})