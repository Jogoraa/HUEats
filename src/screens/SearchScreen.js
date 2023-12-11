import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../globals/style';
import { firebase } from '../../Firebase/firebaseConfig';

const SearchScreen = ({ foodRef, search, setSearch }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (foodRef) {
      const unsubscribe = foodRef.onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setSearchResults(data);
      });

      return () => unsubscribe();
    }
  }, [foodRef]);

  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchicon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={(e) => setSearch(e)}
        />
      </View>
      {search !== '' && (
        <View style={styles.searchresultsouter}>
          <FlatList
            style={styles.searchresultsinner}
            data={searchResults}
            renderItem={({ item }) => {
              if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <View style={styles.searchresult}>
                    <AntDesign name="arrowright" size={24} color="black" />
                    <Text style={styles.searchresulttext}>{item.foodName}</Text>
                  </View>
                );
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
    height: '100%',
  },
  searchbox: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: 'center',
    padding: 10,
    margin: 20,
    elevation: 10,
  },
  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 18,
    color: colors.text1,
  },
  searchicon: {
    color: colors.text1,
  },
  searchresultsouter: {
    width: '100%',
    marginHorizontal: 30,
    height: '100%',
    backgroundColor: colors.col1,
  },
  searchresultsinner: {
    width: '100%',
  },
  searchresult: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
  },
  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
  },
});

export default SearchScreen;
