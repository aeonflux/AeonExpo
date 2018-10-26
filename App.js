import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Deck from "./src/Deck";

const DATA = [
  {
    id: 1,
    text: "Black Panther",
    uri:
      "http://fr.web.img2.acsta.net/r_1920_1080/pictures/18/04/05/10/32/3136030.jpg"
  },
  {
    id: 2,
    text: "Spiderman",
    uri:
      "http://fr.web.img6.acsta.net/r_1920_1080/pictures/18/04/05/10/31/5675004.jpg"
  },
  {
    id: 3,
    text: "Iron Man",
    uri:
      "http://fr.web.img4.acsta.net/r_1920_1080/pictures/18/04/05/10/31/5762506.jpg"
  },
  {
    id: 4,
    text: "Black Widow",
    uri:
      "http://fr.web.img3.acsta.net/r_1920_1080/pictures/18/04/05/10/32/3171968.jpg"
  },
  {
    id: 5,
    text: "Black Panther",
    uri:
      "http://fr.web.img2.acsta.net/r_1920_1080/pictures/18/04/05/10/32/3136030.jpg"
  },
  {
    id: 6,
    text: "Shuri",
    uri:
      "http://fr.web.img6.acsta.net/r_1920_1080/pictures/18/04/05/10/32/1689581.jpg"
  },
  {
    id: 7,
    text: "Hulk",
    uri:
      "http://fr.web.img3.acsta.net/r_1920_1080/pictures/18/04/05/10/32/1661456.jpg"
  },
  {
    id: 8,
    text: "Scarlet",
    uri:
      "http://fr.web.img6.acsta.net/r_1920_1080/pictures/18/04/05/10/31/5803132.jpg"
  },
  {
    id: 9,
    text: "Magneto",
    uri:
      "http://fr.web.img5.acsta.net/r_1920_1080/pictures/18/04/05/10/32/1734895.jpg"
  },
  {
    id: 10,
    text: "Winter Soldier",
    uri:
      "http://fr.web.img4.acsta.net/r_1920_1080/pictures/18/04/05/10/32/1717707.jpg"
  },
  {
    id: 10,
    text: "Gamora",
    uri:
      "http://fr.web.img2.acsta.net/r_1920_1080/pictures/18/04/05/10/31/5689067.jpg"
  },
  {
    id: 11,
    text: "Thor",
    uri:
      "http://fr.web.img3.acsta.net/r_1920_1080/pictures/18/04/05/10/31/5785944.jpg"
  },
  {
    id: 12,
    text: "Doctor Strange",
    uri:
      "http://fr.web.img6.acsta.net/r_1920_1080/pictures/18/04/05/10/32/1778646.jpg"
  },
  {
    id: 13,
    text: "StarLord",
    uri:
      "http://fr.web.img6.acsta.net/r_1920_1080/pictures/18/04/05/10/32/1675518.jpg"
  },
  {
    id: 14,
    text: "StarLord",
    uri:
      "http://fr.web.img4.acsta.net/r_1920_1080/pictures/18/04/05/10/32/1748958.jpg"
  }
];

export default class App extends Component {
  renderCard(item) {
    return <Text> {item.text}</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck data={DATA} renderCard={this.renderCard} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
