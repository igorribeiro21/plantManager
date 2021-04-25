import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    Alert,
}
    from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import fonts from '../styles/fonts';
import { RectButton } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import { isBefore } from 'date-fns';
import { editPlant } from '../libs/storage';
import { Button } from '../components/Button';

interface EditPlantProps {
    dateTimeNotification: Date;
    hour: string;
    name: string;
    photo: string;
    id: string;
}

export function EditPlant() {
    const routes = useRoute();
    const navigation = useNavigation();
    const { dateTimeNotification, hour, name, photo, id } = routes.params as EditPlantProps;
    const [showDatePicker, setShowDatePicker] = useState(false);
    let data = new Date(dateTimeNotification);
    const [dataText, setDataText] = useState<string>();
    const [newDate, setNewDate] = useState(new Date());

    useEffect(() => {
        setDataText(hour);
    }, []);

    function showDateTimePicker() {
        setShowDatePicker(true);
    }

    function handleDataText(event: Event, dateTime: Date | undefined) {
        if (Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime) {
            setDataText(String(`${dateTime.getHours()}:${dateTime.getMinutes()}`));
            setNewDate(dateTime);
        }


        setShowDatePicker(false);
    }

    async function EditPlant() {
        await editPlant(id, newDate);
        navigation.navigate('MyPlants');
    }   

    return (
        <View style={styles.container}>
            {
                showDatePicker && (
                    <DateTimePicker
                        value={data}
                        mode="time"
                        display="spinner"
                        onChange={handleDataText}
                    />
                )
            }

            <SvgFromUri
                uri={photo}
                width={120}
                height={200} />

            <Text style={styles.textTitle}>
                Deseja alterar o horário {'\n'} da planta {name}?
                 </Text>
            <RectButton
                onPress={showDateTimePicker}
            >
                <Text
                    style={styles.textHour}
                >
                    {dataText}
                </Text>
            </RectButton>

            <View style={{width:220,marginTop:20}}>
                <Button
                    title="Editar"
                    onPress={EditPlant}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        fontFamily: fonts.complement,
        fontSize: 28,
        lineHeight: 35
    },
    textHour: {
        fontFamily: fonts.complement,
        fontSize: 72
    }
})