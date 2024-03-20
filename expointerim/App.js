import React from 'react';
import { AppRegistry } from 'react-native';
// import App from './App';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Constants from "expo-constants"

import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from './App/Navigations/TabNavigations';

import { useFonts } from 'expo-font';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AgendaScreen from './App/Screens/AgendaScreen/AgendaScreen';
 
// AppRegistry.registerComponent('MyApp', () => App);

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// // Conditionally determine the URI based on some logic
// const getApiUri = () => {
//   // Implement your logic to determine which API URI to use
//   // For example, you can check the environment or some user settings
//   const isLocalhost = true; // Example condition, modify as needed
//   return isLocalhost ? 'http://localhost:4000/' : 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master';
// };


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master',
  cache: new InMemoryCache()
});

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       errorPolicy: 'none'
//     },
//     query: {
//       errorPolicy: 'none'
//     },
//     mutate: {
//       errorPolicy: 'none'
//     }
//   }
// });

// // Initialize Apollo Client with the determined URI
// const client = new ApolloClient({
//   uri: getApiUri(),
//   cache: new InMemoryCache()
// });

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'outfit-regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>

      {/* <SafeAreaView 
        // styles={styles.container}
      > */}

      <ApolloProvider client={client}>
        
        <View style={styles.container}>
          
          {/* Sign in component */}
          
          <SignedIn>
          
            <NavigationContainer>
              <TabNavigations />
            </NavigationContainer>
           
            {/* <ApolloProvider client={client2}>
              <AgendaScreen />
            </ApolloProvider> */}
          </SignedIn>
          

          {/* Sign out component */}
          <SignedOut>
            <Login />
          </SignedOut>
          <StatusBar style="auto" />
        </View>
        </ApolloProvider>
      

      {/* </SafeAreaView> */}


    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container2: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
