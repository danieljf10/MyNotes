import { SafeAreaView, Text } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 

// added features
import { View } from 'react-native';





function App() {
  useDeviceContext(tw);

  const A = () => {
    return <Text style={tw`text-blue-800 text-4xl`}>Component A 🌀</Text>
  }

  
  
  return (
    <Provider store={store}>
      <SafeAreaView style={tw`bg-gray-900 flex-1`}>
        <Text style={tw`w-screen  p-12 text-white font-bold text-center text-4xl`}>
          Notes
        </Text>

        <View style={[tw`w-screen h-px bg-gray-800`, {height: 2}]}></View>
        <View style={tw`w-screen  bg-gray-900 flex-1`}></View>

      </SafeAreaView>
    </Provider>

    
  )
}

export default App;



/* DEFAULT CODE
import { SafeAreaView, Text } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 

function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text style={tw`w-screen mt-16 text-center text-xl`}>
          Hello World
        </Text>
      </SafeAreaView>
    </Provider>
  )
}

export default App;

*/
