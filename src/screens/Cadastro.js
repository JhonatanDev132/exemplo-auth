import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

import { auth } from "../../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function Cadastro({ navigation }) {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = async () => { 
    if (!email || !senha) {
      Alert.alert("Atenção!", "Preencha e-mail e senha!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha)
    } catch (error) {
      console.error(error.code);
    }
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput keyboardType="email-address" placeholder="E-mail" style={estilos.input} onChangeText={(valor) => setEmail(valor)}/>
        <TextInput placeholder="Senha" style={estilos.input} secureTextEntry onChangeText={(valor) => setSenha(valor)} />
        <View style={estilos.botoes}>
          <Button onPress={cadastrar} title="Cadastre-se" color="blue" />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
