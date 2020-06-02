import React, { useState } from "react";

import { Text, View, Button, Picker } from "react-native";

import { styles } from "../styles";

import { Card, Subheader } from "react-native-material-ui";

const calculate = (points, speed, timeDeadline, iterationDeadLine, P) => {
  let status = false;
  let iterations = 0;
  let startTime = Date.now();
  let y = 0;
  let delta = 0;
  let w1 = 0;
  let w2 = 0;

  let dotIndex = -1;

  while (
    iterations++ < iterationDeadLine &&
    Date.now() - startTime < timeDeadline * 1000
  ) {
    dotIndex = dotIndex == 3 ? -1 : dotIndex;
    dotIndex++;

    y = points[dotIndex][0] * w1 + points[dotIndex][1] * w2;

    if (checkWeights(P, points, w1, w2)) {
      status = true;
      break;
    }

    delta = P - y;
    w1 += delta * points[dotIndex][0] * speed;
    w2 += delta * points[dotIndex][1] * speed;
  }
  const time = Date.now() - startTime;
  if (status) {
    return ["Success", iterations, time, w1, w2];
  }

  return [
    iterations >= iterationDeadLine
      ? "Out of iteration boundaries"
      : "Teaching time has expired",
    iterations,
    time,
  ];
};

const checkWeights = (P, points, w1, w2) => {
  return (
    P < points[0][0] * w1 + points[0][1] * w2 &&
    P < points[1][0] * w1 + points[1][1] * w2 &&
    P > points[2][0] * w1 + points[2][1] * w2 &&
    P > points[3][0] * w1 + points[3][1] * w2
  );
};

export const Perceptron = () => {
  const points = [
    [0, 6],
    [1, 5],
    [3, 3],
    [2, 4],
  ];
  const speeds = [0.001, 0.01, 0.05, 0.1, 0.2, 0.3];
  const [speed, setSpeed] = useState(0.001);
  const timeDeadlines = [0.5, 1, 2, 5];
  const [timeDeadline, setTimeDeadline] = useState(0.5);
  const iterationDeadlines = [100, 200, 500, 1000];
  const [iterationDeadline, setIterationDeadline] = useState(100);

  const [result, setResult] = useState([]);
  const P = 4;

  const teachPerceptron = () => {
    const result = calculate(
      points,
      +speed,
      +timeDeadline,
      +iterationDeadline,
      P
    );
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.card}>
          <Subheader text="Perceptron" />

          <View>
            <View>
              <Text>Speed:</Text>
              <Picker
                selectedValue={speed}
                style={styles.select}
                onValueChange={setSpeed}
              >
                <Picker.Item label={`${speeds[0]}`} value={speeds[0]} />
                <Picker.Item label={`${speeds[1]}`} value={speeds[1]} />
                <Picker.Item label={`${speeds[2]}`} value={speeds[2]} />
                <Picker.Item label={`${speeds[3]}`} value={speeds[3]} />
                <Picker.Item label={`${speeds[4]}`} value={speeds[4]} />
                <Picker.Item label={`${speeds[5]}`} value={speeds[5]} />
              </Picker>
            </View>
            <View>
              <Text>Time Deadline:</Text>
              <Picker
                selectedValue={timeDeadline}
                onValueChange={setTimeDeadline}
                style={styles.select}
              >
                <Picker.Item
                  label={`${timeDeadlines[0]}`}
                  value={timeDeadlines[0]}
                />
                <Picker.Item
                  label={`${timeDeadlines[1]}`}
                  value={timeDeadlines[1]}
                />
                <Picker.Item
                  label={`${timeDeadlines[2]}`}
                  value={timeDeadlines[2]}
                />
                <Picker.Item
                  label={`${timeDeadlines[3]}`}
                  value={timeDeadlines[3]}
                />
              </Picker>
            </View>
            <View>
              <Text>Iterations Deadline:</Text>
              <Picker
                itemStyle={styles.item}
                selectedValue={iterationDeadline}
                style={styles.select}
                onValueChange={setIterationDeadline}
              >
                <Picker.Item
                  label={`${iterationDeadlines[0]}`}
                  value={iterationDeadlines[0]}
                />
                <Picker.Item
                  label={`${iterationDeadlines[1]}`}
                  value={iterationDeadlines[1]}
                />
                <Picker.Item
                  label={`${iterationDeadlines[2]}`}
                  value={iterationDeadlines[2]}
                />
                <Picker.Item
                  label={`${iterationDeadlines[3]}`}
                  value={iterationDeadlines[3]}
                />
              </Picker>
            </View>
          </View>
          <Button title="Calculate" onPress={teachPerceptron} />
        </View>
      </Card>
      <Card>
        <View style={styles.card}>
          <Subheader text="Results:" />
          <View>
            {result[0] && <Text>{result[0]}</Text>}
            <Text>{`Amount of iterations : ${result[1] || "-"}`}</Text>
            <Text>{`Time spent : ${result[2] || "-"}`}</Text>
            {result[0] == "Success" ? (
              <Text>{`W1 - ${result[3].toFixed(4)}; W2 - ${result[4].toFixed(
                4
              )}`}</Text>
            ) : null}
          </View>
        </View>
      </Card>
    </View>
  );
};
