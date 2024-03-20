import { Alert, StyleSheet, Text, View, TouchableOpacity, Button, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Agenda } from 'react-native-calendars';
import { Query } from 'react-apollo'

import testIDs from './testIDs';
import { useQuery, ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRoute } from '@react-navigation/native';

// import { GET_MEETINGS } from './queries';

// import client from './ApolloClient'; // Import Apollo Client instance


const client2 = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
  });

  // Access the URI parameter
// const { clientUri } = useRoute().params;

// Initialize Apollo Client with the provided URI
// const client4 = new ApolloClient({
//     uri: clientUri,
//     cache: new InMemoryCache()
// });

  const GET_MEETINGS = gql`
  query Meetings {
        meetings {
            id
            title
            startTime
            endTime
            attendees {
                id
                name
            }
    }
  }
`;

export default function AgendaScreen() {

    // const [items, setItems] = useState({});
    // const [markedDate, setMarkedDate] = useState('');

    console.log('from GET_MEETING: ', GET_MEETINGS);
    // console.log('from data: ', data?.meeting);

    const { loading, error, data, refetch } = useQuery(GET_MEETINGS, { client2 }); // Pass Apollo Client instance to useQuery

    console.log('from Error: ', error instanceof Error)
    console.log('from Error-Details: ', JSON.stringify(error, null, 2))
    

    // const data2 = data?.meetings
    // console.log('from Data2: ', data2)

    // console.log("Loading:", loading);
    // console.log("Error:", error);
    // console.log("Data:", data);

    // // const [createEvent] = useMutation(CREATE_EVENT);
    // // const { data: subscriptionData, loading: subscriptionLoading } = useSubscription(EVENT_CREATED);
    // // const [addEvent] = useMutation(ADD_EVENT);

    // // Handle loading state
    // if (loading) 
    //     return (
    //         // <View style={styles.centralView}>
    //         //     <Text>Loading...</Text>
    //         // </View>
    //         <ApolloProvider client={client2}>
    //             <View style={styles.centralView}>
    //                 <ActivityIndicator size="large" color="#0000ff" />
    //             </View>
    //         </ApolloProvider>
    //     );

    // // Handle error state
    // if (error) return (
    //     // <View style={styles.centralView}>
    //     //     <Text>Error! ${error.message}</Text>
    //     // </View>
    //     <ApolloProvider client={client2}>
    //         <View style={styles.centralView}>
    //             <Text>Error! {error.message}</Text>
    //             {/* Option to retry fetching data */}
    //             <Button title="Retry" onPress={() => refetch()} /> 
    //         </View>
    //     </ApolloProvider>
    // );

    // if (data) 
    //     console.log("Received data:", data) // Log received data for inspection
    //     // const processedItems = {};
    //     // ... process data
    //     return (
    //     <Query query={GET_MEETINGS} client={client2}>
    //         <View style={styles.centralView}>
    //             <Text>{JSON.stringify(data)}</Text>
    //         </View>
    //     </Query>
    // )
    

    // Ensure data exists and has the expected structure before processing
    // if (!data || !data.meetings || !Array.isArray(data.meetings)) {
    //     return (
    //     <ApolloProvider client={client2}>
    //         <View style={styles.centralView}>
    //             <Text>No meetings data available.</Text>
    //         </View>
    //     </ApolloProvider>
    //     );
    // }

    // const meetings = data.meetings
    // console.log('data from meeting: ', meetings)


    // // const handleAddEvent = () => {
    // //     addEvent({
    // //       variables: {
    // //         input: {
    // //           title: 'New Event',
    // //           date: '2024-03-10',
    // //         },
    // //       },
    // //     });
    // //   };

    //   // Option 1 - Process data only if it exists and has the expected structure
    // const processedItems = {};

    // data.meetings.forEach(meeting => {
    //     const formattedDate = timeToString(meeting.startTime);
    //     processedItems[formattedDate] = processedItems[formattedDate] || [];
    //     processedItems[formattedDate].push({
    //     ...meeting,
    //     height: Math.max(50, Math.floor(Math.random() * 150)),
    //     type: 'meeting',
    //     });
    // });

    // // // Option 2
    // // useEffect(() => {
    // //     if (data) {
    // //         const processedItems = {};

    // //         // Process meetings data
    // //         data.meetings.forEach(meeting => {
    // //             const formattedDate = timeToString(meeting.startTime); // Assuming timeToString formats for display
    // //             processedItems[formattedDate] = processedItems[formattedDate] || [];
    // //             processedItems[formattedDate].push({
    // //             ...meeting, // Include meeting details (title, attendees, etc.)
    // //             height: Math.max(50, Math.floor(Math.random() * 150)), // Adjust height if needed
    // //             type: 'meeting', // Identify as a meeting event
    // //             });
    // //         });

    // //         // Add simulated events (replace with your actual logic)
    // //         loadItems({ timestamp: Date.now() });

    // //         setItems(processedItems);

    // //     }


    // //     const today = new Date();
    // //     const formattedDate = today.toISOString().split('T')[0];
    // //     setMarkedDate(formattedDate);
    // //   }, [data, loading]);
    
    //   useEffect(() => {
    //     loadItems({ timestamp: Date.now() }); // Load items for the current date initially
    //   }, []);
    
    //   const loadItems = (day) => {
    //     const newItems = {};
    
    //     setTimeout(() => {
    //       for (let i = -15; i < 85; i++) {
    //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //         const strTime = timeToString(time);
    
    //         if (!newItems[strTime]) {
    //           newItems[strTime] = [];
    
    //           const numItems = Math.floor(Math.random() * 3 + 1);
    //           for (let j = 0; j < numItems; j++) {
    //             newItems[strTime].push({
    //               name: 'Item for ' + strTime + ' #' + j,
    //               height: Math.max(50, Math.floor(Math.random() * 150)),
    //               day: strTime
    //             });
    //           }
    //         }
    //       }
    
    //       setItems({ ...newItems });
    //     }, 1000);
    //   };

    //   const renderItem = (reservation, isFirst) => {
    //     const fontSize = isFirst ? 16 : 14;
    //     const color = isFirst ? 'black' : '#43515c';
    
    //     return (
    //       <TouchableOpacity
    //         testID={testIDs.agenda.ITEM}
    //         style={[styles.item, { height: reservation.height }]}
    //         onPress={() => Alert.alert(reservation.name)}
    //       >
    //         <Text style={{ fontSize, color }}>{reservation.name}</Text>
    //       </TouchableOpacity>
    //     );
    //   };
    
    //   const renderEmptyDate = () => {
    //     return (
    //       <View style={styles.emptyDate}>
    //         <Text>This is empty date!</Text>
    //       </View>
    //     );
    //   };
    
    //   const rowHasChanged = (r1, r2) => {
    //     return r1.name !== r2.name;
    //   };
    
    //   const timeToString = (time) => {
    //     const date = new Date(time);
    //     return date.toISOString().split('T')[0];
    //   };

  return (
    <>

    {/* <ApolloProvider client={client4}> */}

        <View style={styles.centralView}>
        {/* <FlatList 
        data={data}
        // numColumns={4}
        // horizontal={true}
        // showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
            
                <View 
                    // style={styles.iconContainer}
                > 
                <Text 
                    // style={{fontFamily: 'outfit-medium', marginTop: 5}}
                >
                    {item.name}
                </Text>
                </View>
        )}
      /> */}
        </View>

    {/* </ApolloProvider> */}

    {/* <View style={styles.centralView}>
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={processedItems}
        loadItemsForMonth={loadItems}
        selected={ markedDate  }
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
    </View>
    <View>
      <Text>Calendar</Text>
      <Button
        title="Add Event"
        onPress={handleAddEvent}
      />
      {data.meetings.map(meeting => (
        <View key={meeting.id}>
          <Text>{meeting.title}</Text>
          <Text>{meeting.date}</Text>
        </View>
      ))}
    </View> */}

    </>
  )
}

const styles = StyleSheet.create({
    centralView: {
      marginTop: 40,
      height: hp('100%'),
      width: wp('100%')
    },
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    }
  });