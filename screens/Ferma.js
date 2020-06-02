import React, { useState, Fragment } from "react";

import { View, Text, Button } from "react-native";

import { Card, Subheader } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";

import { styles } from "../styles";

const calcFactorization = (n, amount) => {
  const s = Math.ceil(Math.sqrt(n));

  if (s * s == n) {
    return [s, s, 0, n];
  }
  let a, b;
  let x = s;
  let l = 0;
  let k = 0;
  let gotResult = false;

  while (!gotResult) {
    x += k;
    l = x * x - n;
    k++;
    if (x >= n) {
      let err = false;
      if (amount !== 0 && k > amount) {
        const err = true;
        return [a, b, k, n, err];
      } else {
        return [n, 1, k, n, err];
      }
    }
    if (Number.isInteger(Math.sqrt(l))) {
      let y = Math.sqrt(l);
      a = x + y;
      b = n / a;
      let err = false;
      if (amount !== 0 && k > amount) {
        err = true;
        return [a, b, k, n, err];
      } else {
        return [a, b, k, n, err];
      }
    }
  }
};

export const Ferma = () => {
  const [n, setN] = useState(-1);
  const [amount, setAmount] = useState(0);
  const [err, setErr] = useState("");
  const [result, setResult] = useState({});
  const [errAmount, setErrAmount] = useState("");

  const inputN = (n) => {
    if (n === "") {
      setErr("");
      setN(-1);
      return;
    }
    if (!isNaN(+n)) {
      if (n > 1) {
        if (n % 2 == 1) {
          setErr("");
          setN(+n);
        } else {
          setErr("Enter an odd number");
          setN(-1);
        }
      } else {
        setErr("Enter n greater than 0");
        if (n == "") {
          setN(-1);
        }
      }
    } else {
      setErr("Enter a number");
      setN(-1);
    }
  };

  const fermaFactor = (n) => {
    const result = calcFactorization(n, amount);
    if (result && result[4]) {
      setErrAmount("error");
    } else {
      setErrAmount("");
    }
    setResult({
      a: result[0],
      b: result[1],
      steps: result[2],
      n: result[3],
    });
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.card}>
          <Subheader text="Ferma Factorization" />

          <TextField
            label="Input n"
            error={err}
            onChangeText={(text) => inputN(text)}
            keyboardType={"number-pad"}
          />

          <TextField
            label="Amount of steps"
            error={err}
            onChangeText={(text) => setAmount(text)}
            keyboardType={"number-pad"}
          />
          <Button
            title="Calculate"
            onPress={() => fermaFactor(n)}
            disabled={n < 1 || isNaN(+n) || n % 2 == 0}
          />
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={styles.card}>
          <Subheader text="Results:" />
          <View style={styles.output}>
            {errAmount ? (
              <Text
                style={{ color: "red" }}
              >{`Error : Your amount of steps > operation steps`}</Text>
            ) : (
              <Fragment>
                <Text>{`n : ${n === -1 ? "-" : n}`}</Text>
                <Text>{`A : ${result.a || "-"}`}</Text>
                <Text>{`B : ${result.b || "-"}`}</Text>
                <Text>{`Amount of steps : ${result.steps || "-"}`}</Text>
              </Fragment>
            )}
          </View>
        </View>
      </Card>
    </View>
  );
};
