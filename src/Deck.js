import React, { Component } from "react";
import { View, Animated, PanResponder } from "react-native";

class Deck extends Component {
  constructor(props) {
    super(props);

    // Default position
    const position = new Animated.ValueXY();

    // Self contained object, not updated
    const panResponder = PanResponder.create({
      //Executed anytime a user taps a screen

      onStartShouldSetPanResponder: () => true,
      //run this event
      //onStartShouldSetPanResponder:() =>true,

      //callback once a user moves an element onscreen
      //event  : contains which element the user is moving
      //gesture: pixel value, how quickly a user is moving an element on the screen

      onPanResponderMove: (event, gesture) => {
        // Uncomment to see gesture object values
        //console.log(gesture);

        // Manually update a value
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },

      //callback once a user stops a move/event
      onPanResponderRelease: () => {}
    });

    // Does not use setState
    this.state = { panResponder, position };
  }
  renderCards() {
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  }
  render() {
    // Tie in a pan responder to a View
    return (
      <Animated.View
        // Reference position object then pass it to an animated view
        style={this.state.position.getLayout()}
        {...this.state.panResponder.panHandlers}
      >
        {this.renderCards()}
      </Animated.View>
    );
  }
}

export default Deck;
