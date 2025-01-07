import { React, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const SignUpForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  return (
    <>
      <Spacer>
        <Text>{headerText}</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Spacer />
      <Input
        label="First Name"
        value={firstname}
        onChangeText={(newFname) => setFirstName(newFname)}
        autoCorrect={false}
      />
      <Spacer />

      <Spacer />
      <Input
        label="Last Name"
        value={lastname}
        onChangeText={(newLastname) => setLastName(newLastname)}
        autoCorrect={false}
      />
      <Spacer />

      <Spacer />
      <Input
        label="User Name"
        value={username}
        onChangeText={(newUsername) => setUserName(newUsername)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />

      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() =>
            onSubmit({ firstname, lastname, username, email, password })
          }
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default SignUpForm;
