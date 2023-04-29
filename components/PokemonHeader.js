import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PokemonHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('./../assets/pokemonLogo.png')}
        style={styles.logo}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    marginTop:40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 100,
    resizeMode: 'contain',
  },
});

export default PokemonHeader;
