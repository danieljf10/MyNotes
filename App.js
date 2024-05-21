import { SafeAreaView, Text, View, TextInput, TouchableOpacity} from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { useState, useEffect } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';



function HomeScreen(){
  const [text, setText] = useState();

  
  const [data, setData] = useState([]);
  const generateData = (count) => Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));

  useEffect(() => {
    setData(generateData(100));
  }, []);

  const renderItem=({item, i}) => (
    <Text style={[tw`bg-gray-900 text-gray-500 m-1`, { height: Math.floor(Math.random() * 100) + 50 }]}>
      {item.id}
    </Text>
  )

  const [on, setOn] = useState(false);
  const callback = () => { !on ? setOn(true) : setOn(false) }

  return (
    
    <View style={tw`w-full h-full`}>
      <View>
        <Text style={tw`text-white text-center text-3xl mt-18 mb-5 font-bold`}>Notes</Text>
        <TextInput style={tw`w-100 h-8 bg-gray-800 rounded-lg text-white pl-2 my-1 m-auto`} placeholder="Search" value={text} onChangeText={(newValue) => setText(newValue)}/>
        <Text style={tw`mt-3 mb-3 text-center text-gray-400`}>Search For: {text}</Text>
      </View>
      
      <View style={tw`w-full h-1 bg-gray-600 `}></View>
      <MasonryList 
      style={tw`w-full h-screen mt-5 m-auto bg-gray-800`}
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      onEndReachedThreshold={0.1}
    />
    
    <View style={tw`w-auto h-auto absolute bottom-4 right-4`}>
      <TouchableOpacity style={tw`w-24 h-24  mb-1 text-2xl mx-auto mt-30 ${on ? "bg-green-900" : "bg-blue-900"} rounded-full`} onPress={callback}>
          <Text style={tw`text-center font-bold text-white my-auto text-2xl`}>
            {on ? "Save" : "+" }
          </Text>
      </TouchableOpacity>
    </View>

    </View>
  )
}

function NewNoteScreen(){
  return (
    <View style={tw`bg-white w-full h-10`}>
      
    </View>
  )
}

function ExistingNoteScreen(){

}

function App() {
  useDeviceContext(tw);

  const [text, setText] = useState();


  

  return (
    <Provider store={store}>
      <SafeAreaView style={tw`bg-gray-900 flex-1`}>
      
      {HomeScreen()}
      
        

        

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




vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV



*/
