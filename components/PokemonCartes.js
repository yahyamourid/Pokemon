import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SectionList, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';


const PokemonCartes = () => {
    const navigation = useNavigation();
    const [pokemons, setPokemons] = useState(null);
    const [cardColors, setCardColors] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);


    const typesColors = {
        Bug: '#8CB230',
        Dark: '#58575F',
        Dragon: '#0F6AC0',
        Electric: '#EED535',
        Fairy: '#ED6EC7',
        Fighting: '#D04164',
        Fire: '#FD7D24',
        Flying: '#748FC9',
        Ghost: '#556AAE',
        Grass: '#62B957',
        Ground: '#DD7748',
        Ice: '#61CEC0',
        Normal: '#9DA0AA',
        Poison: '#A552CC',
        Psychic: '#EA5D60',
        Rock: '#BAAB82',
        Steel: '#417D9A',
        Water: '#4A90DA',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
                setPokemons(response.data.pokemon);
                setCardColors(new Array(response.data.pokemon.length).fill(null).map(() => generateCardColors()));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const groupByType = (pokemonData) => {
        const groupedData = {};
        pokemonData.forEach((pokemon) => {
            pokemon.type.forEach((type) => {
                if (!groupedData[type]) {
                    groupedData[type] = [];
                }
                groupedData[type].push(pokemon);
            });
        });
        return groupedData;
    };
    const generateCardColors = (count) => {
        const colors = Object.values(typesColors);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return randomColor;
    };

    const renderCard = ({ item, index }) => {
        const pokemonId = item.num;
        const imageUrl = item.img;
        const backgroundColor = cardColors[index];
        const types = item.type;


        return (
            <TouchableOpacity onPress={() => setSelectedPokemon(item)}>
                <View style={[styles.cardContainer, { backgroundColor: backgroundColor }]}>

                    <Image source={{ uri: imageUrl }} style={styles.cardImage} />

                    <View style={styles.cardInf}>
                        <Text style={styles.cardNumber}>#{item.num}</Text>
                        <Text style={styles.cardName}>{item.name}</Text>
                        <View style={styles.cardWHContainer}>
                            <Text key={0} style={[styles.cardWH, { backgroundColor: '#f0c305' }, { marginRight: 50 }]}>{item.height}</Text>
                            <Text key={1} style={[styles.cardWH, { backgroundColor: '#3166ae' }]}>{item.weight}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity >
        );
    };
    const groupedData = pokemons ? groupByType(pokemons) : {};
    const renderModal = () => {
        if (!selectedPokemon) {
            return null;
        }

        return (
            
            
            
            <Modal isVisible={true} onBackdropPress={() => setSelectedPokemon(null)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>#{selectedPokemon.num}</Text>
                        <Image source={{ uri: selectedPokemon.img }} style={styles.modalImage} />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPokemon(null)}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView >
                    <View style={styles.modalBody}>
                        <Text style={styles.modalTitle}>{selectedPokemon.name}</Text>
                        <Text style={styles.modalText}>Type:</Text>
                        <View style={styles.modalTypeContainer}>
                            {selectedPokemon.type.map((type, i) => (
                                <Text key={i} style={[styles.modalType, { backgroundColor: typesColors[type] }]}>{type}</Text>
                            ))}
                        </View>
                        <Text style={styles.modalText}>Height & Weight :</Text>
                        <View style={styles.modalTypeContainer}>
                            <Text style={[styles.modalType, { backgroundColor: '#f0c305' }]}>{selectedPokemon.height}</Text>
                            <Text style={[styles.modalType, { backgroundColor: '#3166ae' }]}>{selectedPokemon.weight}</Text>
                        </View >
                        <Text style={styles.modalText}>Weaknesses:</Text>
                        <View style={styles.modalWeaknessesContainer}>
                            {selectedPokemon.weaknesses.map((weaknesses, i) => (
                                <Text key={i} style={[styles.modalWeaknesses, { backgroundColor: typesColors[weaknesses] }]}>{weaknesses}</Text>
                            ))}
                        </View>
                        <Text style={styles.modalText}>Next evolution:</Text>
                        <View style={styles.modalTypeContainer}>
                            {selectedPokemon.next_evolution && selectedPokemon.next_evolution.map((evolution, index) => (

                                <View key={index} style={styles.modalType}>
                                    <Image source={{ uri: `http://www.serebii.net/pokemongo/pokemon/${evolution.num}.png` }} style={styles.modalImageWek} />
                                    <Text style={[styles.modalText, { fontWeight: 'bold' }]}>{evolution.name}</Text>
                                </View>

                            ))}
                        </View>
                    </View>
                    </ScrollView>

                </View>
            </Modal>
        );
    };



    if (!pokemons) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {renderModal()}
            <View style={styles.container}>
                {pokemons && (
                    <SectionList
                        sections={Object.keys(groupedData).map((type) => ({
                            title: type,
                            data: groupedData[type],
                        }))}
                        keyExtractor={(item, index) => item.num + index}
                        renderItem={renderCard}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.sectionHeader}>{title} :</Text>
                        )}
                    />
                )}
            </View>
        </View>

    );
};
const styles = StyleSheet.create({
    //Cards Style
    container: {
        flex: 1,
        backgroundColor: '#ffcb05',
        paddingHorizontal: 0,
        width: '100%',
        
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardListContainer: {
        paddingBottom: 20,
    },
    cardContainer: {
        alignSelf: 'center',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        height: 350,
        marginTop: 30,
        elevation: 5,
        width: 350,
    },


    cardInf: {
        backgroundColor: '#F6F4F3',
        alignItems: 'center',
        alignSelf: 'center',
        width: '107%',
        height: '37%',
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,


    },
    cardNumber: {
        position: 'absolute',
        top: 5,
        left: 5,
        fontSize: 17,
        color: '#6D6C67',
    },
    cardName: {
        fontSize: 18,
        color: 'black',
        fontWeight: 900,
        position: 'absolute',
        top: 30,
        left: 5,
    },
    cardWHContainer: {
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    cardWH: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 17,
        marginHorizontal: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        top: 65,
        width: 100,

    },
    cardImage: {
        alignSelf: 'center',
        width: 220,
        height: 220,
    },

    sectionHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3166ae',
        width: 600,
        height: 50,
        padding: 7,
        marginBottom: -20,

    },
    //Modal Style
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom:50,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f0c305',
    },
    modalBody: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalTypeContainer: {
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    modalType: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',

    },
    modalText: {
        fontSize: 14,
        marginBottom: 5,
        color: 'black',
    },
    modalImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    modalImageWek: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    closeButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f44336',
    },
    modalWeaknessesContainer: {
        paddingVertical: 6,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    modalWeaknesses: {
        width: 100,

        paddingVertical: 5,
        borderRadius: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',

        marginBottom: 10,
    }
});

export default PokemonCartes;