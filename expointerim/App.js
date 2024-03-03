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

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master',
  cache: new InMemoryCache()
});

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
});
