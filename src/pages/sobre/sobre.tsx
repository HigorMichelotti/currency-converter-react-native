import { Image, Linking, Text, View } from 'react-native';
import Furmulario from "../../Components/formulario-conversor/Formulario";
import { StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Sobre() {
    useFonts({
        Montserrat_400Regular,
    });

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={['#2f9320', '#61c96d', '#2f9320']} style={styles.containerVerde}>
                <Text style={styles.titulo}>Conversor de moedas</Text>
                <Text style={styles.subTitulo}>By - Higor Michelotti</Text>
                <View style={styles.viewSobre}>
                    <Text style={styles.textSobre}>Está aplicação foi desenvolvida com o intuito de estudar os conceitos básicos do react-native com expo.</Text>
                    <View
                        style={styles.linhaOrizontal}
                    />

                    <Text style={styles.textSobreApi}>Para a conversão de moedas foi utilizado a versão gratuita da currencyconverterapi que permite uma quantidade máxima de 100 requisições por hora, leia mais
                        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://free.currencyconverterapi.com/')}> aqui</Text>
                    </Text>

                    <Text style={styles.textSobreDesenvolvedor}>Sobre o desenvolvedor</Text>

                    <TouchableOpacity style={styles.viewIcones} onPress={() => Linking.openURL('https://github.com/HigorMichelotti')}>
                        <AntDesign name="github" size={22} color="black" />
                        <Text style={styles.textIconesLink}>https://github.com/HigorMichelotti</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.viewIcones} onPress={() => Linking.openURL('https://www.linkedin.com/in/higormichelotti/')}>
                        <Entypo name="linkedin-with-circle" size={22} color="black" />
                        <Text style={styles.textIconesLink}>https://www.linkedin.com/in/higormichelotti/</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.viewIcones} onPress={() => Linking.openURL('https://www.instagram.com/higor_michelotti/')}>
                        <AntDesign name="instagram" size={22} color="black" />
                        <Text style={styles.textIconesLink}>https://www.instagram.com/higor_michelotti/</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.viewIcones} onPress={() => Linking.openURL('https://hdtecsolucoes.com.br/')}>
                        <Entypo name="network" size={22} color="black" />
                        <Text style={styles.textIconesLink}>https://hdtecsolucoes.com.br/</Text>
                    </TouchableOpacity>

                    {/* <Text>Abrir projeto no Github</Text> */}

                </View>
            </LinearGradient >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '60%'
    },
    titulo: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Montserrat_400Regular'
    },
    subTitulo: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Montserrat_400Regular',
    },
    containerVerde: {
        backgroundColor: '#60965a',
        paddingTop: 20,
        height: '100%'
    },
    viewSobre: {
        backgroundColor: "#fff",
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        height: '135%',
        borderRadius: 10,
        padding: 20
    },
    textSobre: {
        fontFamily: 'Montserrat_400Regular',
        color: '#868686'
    },
    textSobreApi: {
        fontFamily: 'Montserrat_400Regular',
    },
    linhaOrizontal: {
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 0.9,
        marginTop: 20,
        marginBottom: 20
    },
    textSobreDesenvolvedor: {
        fontFamily: 'Montserrat_400Regular',
        color: '#868686',
        fontSize: 20,
        marginTop: 25
    },
    viewIcones: {
        marginTop: 30,
        flexDirection: 'row'
    },
    textIconesLink: {
        color: '#868686',
        marginLeft: 10,
        marginTop: 2
    }
});

