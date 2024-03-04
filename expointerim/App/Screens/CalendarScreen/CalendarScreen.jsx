import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

import { Agenda, Calendar as RNCalendar } from 'react-native-calendars';
import Colors from '../../Utils/Colors';

export default function CalendarScreen() {

  const [calendars, setCalendars] = useState([]);
  const [day, setDay] = useState([])
  const [markedDate, setMarkedDate] = useState('');
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = { ...items };
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
  
        if (!newItems[strTime]) {
          newItems[strTime] = [];
          
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            newItems[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
      setItems(newItems);
    }, 0);
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
    

  

  const [selected, setSelected] = useState('');

  const markselectdate = (day) => {
    setSelected(day.dateString);
  };

  const onDayPress = useCallback((day) => {
    // console.log(day.dateString)
    setSelected(day.dateString);
  }, []);
  
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
        <View style={styles.calendarContainer}>
          <RNCalendar
            // You can customize the calendar here
            // For more options, refer to the react-native-calendars documentation
            // showWeekNumbers
            markedDates={{ [markedDate]: { selected: true, selectedColor: Colors.PRIMARY, }, [selected]: { selected: true, selectedColor: '#000000', selectedTextColor: Colors.PRIMARY } }} // Mark today's date as selected
            // markedDates={{ stringDate : { selected: true } }} // Example: Select today's date
            // markedDates={{ '2024-03-03' : { selected: true } }} // Example: Select today's date
            // onDayPress={(day) => markselectdate(day)}
            onDayPress={onDayPress}
            // onPress = {(day) => {{ [day.dateString]: { selected: true } }}}
              // console.log('selected day has following information: ', day)
              // setDay(day)
            theme={{
          backgroundColor: '#F0FFFF',
          calendarBackground: '#F0FFFF',
          textSectionTitleColor: '#2F4F4F',
          selectedDayBackgroundColor: '#000000',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ffffff',
          todayBackgroundColor: Colors.PRIMARY,
          dayTextColor: '#000000',
          textDisabledColor: '#FFE4B5',
          arrowColor: Colors.PRIMARY,
          }}
          />
          
        </View>
      </View>
    </>
  );
}




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
    width: '85%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: Colors.BLACK
  },
});
