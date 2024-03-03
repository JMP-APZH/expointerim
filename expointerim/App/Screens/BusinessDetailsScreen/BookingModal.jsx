import { StyleSheet, View, Text, Button, Modal, Platform } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'expo-calendar';
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'

// export default function BookingModal() {
  const BookingModal = () => {

  const [modalVisible, setModalVisible] = useState(false);
    // useEffect(() => {
    //     (async () => {
    //       const { status } = await Calendar.requestCalendarPermissionsAsync();
    //       if (status === 'granted') {
    //         const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    //         console.log('Here are all your calendars:');
    //         console.log({ calendars });
    //       }
    //     })();
    //   }, []);

  return (
    <>
    <View style={styles.container}>
      <PageHeading title= {'Booking'} />
      <Button title="Open Calendar" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Calendar style={styles.calendar} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {/* <View style={styles.calendarContainer}>
        <Calendar />
      </View> */}
    </View>
    {/* <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
      <Calendar />
    </View> */}

    </>
  );
}

export default BookingModal;


// async function createCalendar() {
//     const defaultCalendarSource =
//       Platform.OS === 'ios'
//         ? await getDefaultCalendarSource()
//         : { isLocalAccount: true, name: 'Expo Calendar' };
//     const newCalendarID = await Calendar.createCalendarAsync({
//       title: 'Expo Calendar',
//       color: 'blue',
//       entityType: Calendar.EntityTypes.EVENT,
//       sourceId: defaultCalendarSource.id,
//       source: defaultCalendarSource,
//       name: 'internalCalendarName',
//       ownerAccount: 'personal',
//       accessLevel: Calendar.CalendarAccessLevel.OWNER,
//     });
//     console.log(`Your new calendar ID is: ${newCalendarID}`);
//   }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
    },
    calendar: {
      marginBottom: 20,
    },
  })
