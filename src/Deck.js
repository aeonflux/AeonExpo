import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

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
      onPanResponderRelease: () => {
        // move an element to initial position
        this.resetPosition();
      }
    });

    // Does not use setState
    this.state = { panResponder, position };
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;

    // interpolation , amount of degree as compared to the size of horizontal movement
    const rotate = position.x.interpolate({
      // takes more distance (1.5x) to be able to rotate
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["120deg", "0deg", "120deg"]
    });

    return {
      // use spread operator to take all properties from getLayout then add to transform
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    // index accesses the specific element
    return this.props.data.map((item, index) => {
      // first card
      if (index === 0) {
        return (
          <Animated.View
            // Reference position object then pass it to an animated view
            // transform element
            style={this.getCardStyle()}
            key={item.id}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }
  render() {
    // Tie in a pan responder to a View
    return <View>{this.renderCards()}</View>;
  }
}

export default Deck;
