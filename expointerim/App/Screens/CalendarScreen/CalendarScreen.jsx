import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

import { Calendar as RNCalendar } from 'react-native-calendars';

export default function CalendarScreen() {

  const [calendars, setCalendars] = useState([]);
  const [day, setDay] = useState([])
  const [markedDate, setMarkedDate] = useState('');
  
  const todayDate = new Date()
  let todayDay = todayDate.getDate();
  let todayMonth = todayDate.getMonth() + 1;
  let todayYear = todayDate.getFullYear();
  let currentDate = `${todayYear}-${todayMonth}-${todayDay}`
  // let stringDate = JSON.stringify(currentDate)
  let stringDate = currentDate.toString()
  // let stringDate2 = '{ stringDate }'

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
        setCalendars(calendars);
      }
    })();
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMarkedDate(formattedDate);
  }, []);

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }

  return (
    <>

    <View style={styles.container}>
      <RNCalendar stringDate={stringDate}
        // You can customize the calendar here
        // For more options, refer to the react-native-calendars documentation
        style={styles.calendar}
        markedDates={{ [markedDate]: { selected: true } }} // Mark today's date as selected
        // markedDates={{ stringDate : { selected: true } }} // Example: Select today's date
        // markedDates={{ '2024-03-03' : { selected: true } }} // Example: Select today's date
        onDayPress={(day) => 
          // console.log('selected day', day)
          setDay(day)
        }
      />
      {day &&
      <View>
        <Text> The day you chose is {day.dateString} </Text>
        <Text> The month of the date you is the {day.month} </Text>
      </View>

      }
      {
        stringDate && 
        <Text> '{ stringDate }' </Text>
      }
      <View style={styles.buttonContainer}>
        <Button title="Create a new calendar" onPress={createCalendar} />
      </View>
    </View>

    

    </>
  );
}

// async function getDefaultCalendarSource() {
//   const defaultCalendar = await Calendar.getDefaultCalendarAsync();
//   return defaultCalendar.source;
// }

// async function createCalendar() {
//   const defaultCalendarSource =
//     Platform.OS === 'ios'
//       ? await getDefaultCalendarSource()
//       : { isLocalAccount: true, name: 'Expo Calendar' };
//   const newCalendarID = await Calendar.createCalendarAsync({
//     title: 'Expo Calendar',
//     color: 'blue',
//     entityType: Calendar.EntityTypes.EVENT,
//     sourceId: defaultCalendarSource.id,
//     source: defaultCalendarSource,
//     name: 'internalCalendarName',
//     ownerAccount: 'personal',
//     accessLevel: Calendar.CalendarAccessLevel.OWNER,
//   });
//   console.log(`Your new calendar ID is: ${newCalendarID}`);
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  calendarContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});


{/* <View style={styles.container}>
     
     {calendars.map(calendar => (
        <View key={calendar.id} style={styles.calendarContainer}>
          <Text>{calendar.name}</Text>
          {/* You can render more information about each calendar here */}
    //     </View>
    //   ))}
    
    //   <View style={styles.buttonContainer}>
    //     <Text>Calendar Module Example</Text>
    //     <Button title="Create a new calendar" onPress={createCalendar} />
    //   </View>
    // </View> */}
