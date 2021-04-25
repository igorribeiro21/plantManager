import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SvgFromUri } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
        dateTimeNotification: Date;
        id: string;
    };
    handleRemove: () => void;
}

export const PlantCardSecondary = ({ data, handleRemove, ...rest }: PlantProps) => {
    const navigation = useNavigation();

    function handleEdit() {
        Alert.alert(`Deseja alterar o horário da planta ${data.name}?`, `${data.hour}`, [
            {
                text: 'Não',
                style: 'cancel'
            }, {
                text: 'Sim',
                onPress: () => navigation.navigate('EditPlant', {
                    dateTimeNotification: `${data.dateTimeNotification}`,
                    hour: `${data.hour}`,
                    name: `${data.name}`,
                    photo: `${data.photo}`,
                    id: `${data.id}`
                })
            }
        ]);
    }
    return (
        <Swipeable
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather
                                name="trash"
                                size={32}
                                color={colors.white}
                            />


                        </RectButton>
                    </View>
                </Animated.View>
            )}
            renderLeftActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonEdit}
                            onPress={handleEdit}
                        >
                            <AntDesign
                                name="edit"
                                color={colors.white}
                                size={32}
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.container}
                {...rest}
            >
                <SvgFromUri
                    uri={data.photo}
                    width={50}
                    height={50} />
                <Text style={styles.title}>
                    {data.name}
                </Text>

                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regar às
                </Text>

                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5

    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
    },
    buttonEdit: {
        width: 100,
        height: 85,
        backgroundColor: colors.orange,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        left: 10
    },
});