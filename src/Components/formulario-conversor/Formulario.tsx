import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios'
import { Picker } from '@react-native-picker/picker';
import arrayMoedas from '../../Models/moeda.model';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';

export default function Furmulario() {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    });

    const [moedas, setMoedas] = useState(new Array<any>());

    const [deMoeda, setDeMoeda] = useState('BRL')
    const [paraMoeda, setParaMoeda] = useState('USD')

    const [valorDigitado, setValorDigitado] = useState('1')
    const [resultado, setResultado] = useState('0')

    const [valorDigitadoAnterior, setValorDigitadoAnterior] = useState('0')

    const [quantidadeRequest, setQuantidadeRequest] = useState('0')

    useEffect(() => {
        setMoedas(arrayMoedas)
        obterQuantidadeRequest();
    });

    async function converterReaisParaDolar() {
        if (!validarValoresAlterados()) return;

        const valorRealFormatado = Number(valorDigitado.replace(",", "."));
        const cotacaoAtual = await obterCotacaoAtualDaMoeda();
        const resultado = (valorRealFormatado * cotacaoAtual).toFixed(2)

        setResultado(resultado);
        obterQuantidadeRequest();

        return resultado;
    }

    function validarValoresAlterados(): boolean {
        if (valorDigitado == valorDigitadoAnterior) return false;
        setValorDigitadoAnterior(valorDigitado)
        return true;
    }

    function inverterParesMoedas() {
        var deMoedaGuardado = deMoeda;
        setDeMoeda(paraMoeda);
        setParaMoeda(deMoedaGuardado);

        setValorDigitadoAnterior('0');
    }

    async function obterCotacaoAtualDaMoeda() {
        const { data } = await axios.get(`https://free.currconv.com/api/v7/convert?q=${paraMoeda}_${deMoeda}&compact=ultra&apiKey=def48701d02ee3da9e93`)
        return data[`${paraMoeda}_${deMoeda}`]
    }

    async function obterQuantidadeRequest() {
        const { data } = await axios.get(`https://free.currconv.com/others/usage?apiKey=def48701d02ee3da9e93`)
        if (data.usage <= 100)
            setQuantidadeRequest(`Quantidade de requisições: ${data.usage}`)

        else if (data.usage > 100)
            setQuantidadeRequest(`Quantidade de requisições excedeu o limite: ${data.usage}`)
    }

    if (fontsLoaded) {
        return (
            <View style={styles.container}>
                <View style={styles.formEscolherMoedas}>
                    <View style={styles.formSelectEscolherMoedas}>
                        <Picker

                            selectedValue={paraMoeda}
                            onValueChange={(itemValue, itemIndex) => {
                                setValorDigitadoAnterior('0');
                                setParaMoeda(itemValue)
                            }}>
                            {
                                moedas.map(moeda => {
                                    return <Picker.Item style={styles.itemPicker} key={moeda.cc} label={`${moeda.name} (${moeda.simbolo})`} value={moeda.cc} />
                                })
                            }
                        </Picker>
                    </View>
                    <TouchableOpacity onPress={() => inverterParesMoedas()}>
                        <Text style={styles.formLabelEscolherMoedas}> PARA </Text>
                    </TouchableOpacity>

                    <View style={styles.formSelectEscolherMoedas}>
                        <Picker
                            selectedValue={deMoeda}
                            onValueChange={(itemValue, itemIndex) => {
                                setValorDigitadoAnterior('0');
                                setDeMoeda(itemValue)
                            }}>
                            {
                                moedas.map(moeda => {
                                    return <Picker.Item style={styles.itemPicker} key={moeda.cc} label={`${moeda.name} (${moeda.simbolo})`} value={moeda.cc} />
                                })
                            }
                        </Picker>
                    </View>
                    <View
                        style={styles.linhaOrizontal}
                    />
                </View>
                <View style={styles.form}>
                    <Text style={styles.formLabel}>Valor em {paraMoeda}</Text>
                    <TextInput
                        style={styles.formInput}
                        onChangeText={text => setValorDigitado(text)}
                        value={valorDigitado.toString()}
                        placeholder='10'
                        keyboardType='numeric'
                    />

                    <Text style={styles.formLabel}>Valor em {deMoeda}</Text>
                    <TextInput
                        style={styles.formInput}
                        onChangeText={text => setResultado(text)}
                        value={resultado.toString()}
                        placeholder='10'
                        keyboardType='numeric'
                        editable={false}
                    />
                    <TouchableOpacity style={styles.buttonCalcular} onPress={() => converterReaisParaDolar()}>
                        <Text style={styles.textButtonCalcular}>Converter</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.labelQuantidadeRequest}>{quantidadeRequest}</Text>
                </View>
            </View>
        );
    } else {
        return <View></View>
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        backgroundColor: '#fff',
        padding: 30,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        height: "100%",
    },

    formEscolherMoedas: {
        marginBottom: 20
    },

    formSelectEscolherMoedas: {
        borderRadius: 50,
        backgroundColor: '#f6f6f6',
    },

    itemPicker: {
        fontFamily: 'Montserrat_400Regular',
        color: '#4f4f4f' //#3b3b3b
    },

    formLabelEscolherMoedas: {
        margin: 10,
        color: '#60965a',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat_400Regular',
    },

    linhaOrizontal: {
        borderBottomColor: '#f6f6f6',
        borderBottomWidth: 1,
        marginTop: 20
    },

    labelQuantidadeRequest: {
        color: '#60965a',
        alignSelf: 'center',
        fontSize: 10,
        fontFamily: 'Montserrat_400Regular'
    },

    form: {
        height: 'auto',
    },

    formLabel: {
        color: '#000',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        fontFamily: 'Montserrat_400Regular'
    },

    formInput: {
        borderRadius: 50,
        backgroundColor: '#f6f6f6',
        padding: 10,
        fontFamily: 'Montserrat_400Regular'
    },

    buttonCalcular: {
        backgroundColor: '#60965a',
        borderRadius: 50,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    textButtonCalcular: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Montserrat_400Regular'
    }
});

