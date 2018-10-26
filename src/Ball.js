import React, { Component } from "react";
import { View, Animated } from "react-native";

class Ball extends Component {
  componentWillMount() {
    // starting position
    this.position = new Animated.ValueXY(0, 0);
    // move to a position
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 }
    }).start();
    //default value of speed = 1s
  }
  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        {/* element we are moving */}
        <View style={styles.ball} />;
      </Animated.View>
    );
  }
}

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black"
  }
};

export default Ball;
