import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  UIManager,
  LayoutAnimation
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
//a minimum threshold to measure if movement categorize as LIKE or DISLIKE
// 1/4 screen
const SWIPE_THRESHOLD = 0.25 * Dimensions.get("window").width;
// animation length in milliseconds
const SWIPE_OUT_DURATION = 500;

class Deck extends Component {
  //default props
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };

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
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          // move an element to initial position
          this.resetPosition();
        }
      }
    });

    // Does not use setState
    // Use an initial index
    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    // component receives another data
    // compares if similar data
    if (nextProps.data !== this.props.data) {
      // resets index to initial
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    // specifically designed for android - UIManager
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    // ternary operator, shorthand expression
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;

    // Linear animation, move directly
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      // number of milliseconds
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      // Callback function
      //triggered after the animation only
      this.onSwipeComplete(direction);
    });
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    // index of the array
    const item = data[this.state.index];

    // action can trigger API calls etc.
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);

    // Set to default position
    this.state.position.setValue({ x: 0, y: 0 });

    // increment index by 1
    this.setState({ index: this.state.index + 1 });
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
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      // use spread operator to take all properties from getLayout then add to transform
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    // if index counter exceeds last counter of array
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    // index accesses the specific element
    return this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        // first card
        if (i === this.state.index) {
          return (
            <Animated.View
              // Reference position object then pass it to an animated view
              // transform element
              // styling could be joined using array [style1,style2]
              style={[this.getCardStyle(), styles.cardStyle]}
              key={item.id}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }

        return (
          // convert view to Animated View for smooth transition
          <Animated.View
            key={item.id}
            // i - this.state.index = number of spaces the current card becomes the top card
            style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
    //reverse() display array mapped items in reverse
  }
  render() {
    // Tie in a pan responder to a View
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {
  cardStyle: {
    // causes elements to stack up
    position: "absolute",
    width: SCREEN_WIDTH
  }
};

export default Deck;
