import React, { useState } from 'react';
import { StyleSheet,View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';

const Create = () => {
    const [value, setValue] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <Text category='h4' style={styles.inputLabel}>
                    Ingresar Tarea
                </Text>
                <Input
                    multiline={true}
                    textStyle={styles.inputTextStyle}
                    placeholder='Place your Text'
                    value={value}
                    onChangeText={(nextValue) => setValue(nextValue)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    input: {
        marginTop: '5vh',
        marginHorizontal: '5vw'
    },
    inputTextStyle: {
        minHeight: 80,
    },
    inputLabel: {
        marginBottom: '15px'
    }
});

export default Create;
