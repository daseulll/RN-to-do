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
        const { isCompleted, isEditing } = this.state;
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
                    <Text style={[
                        styles.text,
                        isCompleted? styles.completeText : styles.uncompleteText
                        ]}
                        >Hello I'm To Do
                    </Text>
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
        this.setState({
            isEditing: true
        })
    }
    _finishEditing = () => {
        this.setState({
            isEditing: false
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
    }

})