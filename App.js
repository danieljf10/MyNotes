// imported libraries & components to use in app
import { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import MasonryList from '@react-native-seoul/masonry-list'; 
import { useSearchNotesQuery, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from './db';

// Main Home Screen of App
function HomeScreen({ navigation }) {
  const [searchText, setSearchText] =  useState(""); // searchText (useState Hook), setSearchText (update search text)
  const { data: searchData, error, isLoading, } = useSearchNotesQuery(searchText); // destructuring return value
  const [ addNote, { data: addNoteData, error: addNoteError }] = useAddNoteMutation(); // destructuring note data
  const [deleteNote] = useDeleteNoteMutation();

  useEffect(() => { // useEffect hook
    if (addNoteData != undefined) {
      navigation.navigate("Edit", { data:  addNoteData }); // navigate to edit screen & pass data
    }
  }, [addNoteData]);

    const renderItem = ({ item }) => ( // navigate to edit screen when user presses button
      <TouchableOpacity onPress={() => navigation.navigate("Edit", { data: item })} style={tw`w-[99%] mb-2 bg-gray-300 rounded-sm px-2 py-1 justify-center`}>
        <Text  style={tw`text-lg font-bold`}>{item.title}</Text>
        <Text>{item.content}</Text> 
      </TouchableOpacity>
    );

  return ( // Home page styling
    <View style={tw`flex-1 bg-gray-900`}>
      <TextInput
        style={tw`w-auto justify-center p-2  m-2 bg-gray-800 text-white mb-2`}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText} // update text to search for
        />
      {searchData ? // if searchdata is available, display any matching text
        <MasonryList
          style= {tw`p-2`}
          data={searchData}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id} // unique key for each note
          showsVerticalScrollIndicator={false}
        /> : <></>
      }

      {/* Create a new note on button press */}
      <TouchableOpacity onPress={() => { addNote({ title: "New Note", content:  "" }); }} style={tw`bg-blue-500 rounded-full absolute bottom-[5%] right-8 items-center justify-center w-12 h-12`}>
        <Text style={tw`text-white text-3xl`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function EditScreen({ route, navigation }) {
  const { data } = route.params;
  const [title, setNoteTitle] = useState(data.title); // update title value
  const [content, setNoteContent] = useState(data.content); // update note content etc
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] =  useDeleteNoteMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () => ( // right side of screen delete button for selected note
        <TouchableOpacity onPress={() => deleteNoteAndGoBack()}>
        <Text style={tw`mr-7 text-3xl`}>🗑️</Text>
        </TouchableOpacity>
      ),
    });
  }, [title]);

  const saveCurrentNote = () => { // save current note
    updateNote({ // update the note (update properties)
      id: data.id,
      title: title,
      content:  content,
    }).then(() => { // after note
      navigation.navigate("Home");
    
    });
  };

  const deleteNoteAndGoBack = () => {
    deleteNote({ // delete current note & its data
      id:  data.id,
    }).then(() => {
      navigation.navigate("Home"); // navigate back to home page
    });
  };

  useEffect(() => { // when screen is unfocused, save current note
    const unsubscribe  = navigation.addListener('blur', saveCurrentNote);
    return unsubscribe;
  }, [title, content]);


// Editing note page
  return (
    <View style={tw`flex-1 p-4 bg-gray-900 `}>
      <TextInput
        style={tw`w-full bg-gray-800 text-white p-2 mb-2 rounded`}
        placeholder="Title"
        value= {title}
        onChangeText={setNoteTitle} // update note title
      />
      <TextInput
        style={tw`w-full bg-gray-800 p-2  text-white rounded mb-2`}
        placeholder="Enter your note..."
        value= {content}
        onChangeText={setNoteContent} // update note contnet
        multiline 
      /> 
      <TouchableOpacity onPress={saveCurrentNote} style={tw`bg-blue-500 rounded p-2 mt-2  items-center justify-center`}>
        <Text style={tw`text-white text-lg`}>Save</Text> 
      </TouchableOpacity>
    </View>
  );
}

  const Stack = createNativeStackNavigator();

export default function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"> 
          <Stack.Screen
            options={{ // Default home screen properties
              headerStyle: tw`bg-gray-900`,
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerTitleStyle: tw`font-bold text-4xl`
            } }
            name="Notes" 
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ // Editing page screen properties
              headerStyle: tw`bg-gray-900 border-0`,
              headerTintColor: 'white',
              headerShadowVisible: false, 
              headerTitleStyle: tw`font-bold`
            }}
            name="Edit"
            component={EditScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}