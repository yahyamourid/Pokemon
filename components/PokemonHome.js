import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PokemonHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>The Pokémon world is waiting for you</Text>
      <Image
        source={require('./../assets/pikacho.png')}
        style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PokemonList')}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3166ae',
    textAlign: 'center',
    paddingHorizontal: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginLeft: 90,

  },
  button: {
    backgroundColor: '#3166ae',
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 24,
    width: 200,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PokemonHome;
