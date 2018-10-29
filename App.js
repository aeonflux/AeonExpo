import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "./src/Deck";

const DATA = [
  {
    id: 1,
    text: "Baby Steve Crain",
    uri:
      "https://imgix.bustle.com/uploads/image/2018/10/16/ecab2208-15d8-4266-8ddf-5fb529b87077-hill-house-young-steve.jpg?w=960&h=540&fit=crop&crop=faces&auto=format&q=70"
  },
  {
    id: 2,
    text: "Steve Crain",
    uri:
      "https://img3.looper.com/img/gallery/the-ending-of-the-haunting-of-hill-house-explained/master-of-stories-master-of-hill-houses-domain-1540474794.jpg"
  },
  {
    id: 3,
    text: "Baby Theo Crain",
    uri: "https://pbs.twimg.com/media/Dp6v3OyU4AA91sL.jpg"
  },
  {
    id: 4,
    text: "Theodora Crain",
    uri:
      "https://i1.wp.com/msinthebiz.com/wp-content/uploads/2016/04/Screen-Shot-2016-04-24-at-11.52.31-AM.png?fit=851%2C524"
  },
  {
    id: 5,
    text: "Baby Luke Crain",
    uri: "https://i.ytimg.com/vi/dn-9jX7mqyY/maxresdefault.jpg"
  },
  {
    id: 6,
    text: "Luke Crain",
    uri:
      "https://pmcdeadline2.files.wordpress.com/2017/08/oliver-jackson-cohen-2.jpg?w=446&h=299&crop=1"
  },
  {
    id: 7,
    text: "Baby Shirl Crain",
    uri:
      "https://www.washingtonpost.com/resizer/Uu406QadAMGJ22QgNLbpkewhbME=/480x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/JEDQHEWNOYI6REQP3VJODLSFOA.jpg"
  },
  {
    id: 8,
    text: "Shirley Crain",
    uri:
      "data:image/jpeg;base64,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"
  },
  {
    id: 9,
    text: "Nellie Crain",
    uri:
      "https://media1.popsugar-assets.com/files/thumbor/IczuE7WR5QWXZUbwSuqaJ4uHzgo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2018/10/11/249/n/1922283/394154379686997f_HOHH_104_Unit_00160R/i/Violet-McGraw-Young-Nell.jpg"
  },
  {
    id: 10,
    text: "Nell Crain",
    uri: "https://image.ibb.co/kjdN1V/Screen-Shot-2018-10-29-at-12-57-47-PM.png"
  }
];

export default class App extends Component {
  renderCard(item) {
    return (
      <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
        <Text> Description here</Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#66ccff"
          title="View Now"
        />
      </Card>
    );
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
