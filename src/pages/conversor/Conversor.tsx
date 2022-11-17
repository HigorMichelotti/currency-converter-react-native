import { Image, Text, View } from 'react-native';
import Furmulario from "../../Components/formulario-conversor/Formulario";
import { StyleSheet } from 'react-native';

import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';

export default function Conversor() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerImagem}>
                    <Image
                        style={styles.imagemLog}
                        source={require('../../../assets/logo-conversor.png')}
                    />
                </View>

                <Furmulario></Furmulario>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        paddingTop: 3,
    },
    containerImagem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagemLog: {
        width: 120,
        height: 120
    },
});

