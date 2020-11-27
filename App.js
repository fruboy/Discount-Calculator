import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      originalPrice: 'Original Price',
      discountPerct: 'Discount Percentage',
      priceArray: [],
      discountArray: [],
      modalVisible: false,
    };
  }
  onChangeText = (text1, text2) => {
    this.setState({ originalPrice: text1, discountPerct: text2 });
  };
  calculateDiscount = () => {
    if (isNaN((this.state.originalPrice / 100) * this.state.discountPerct))
      return 0;
    else return (this.state.originalPrice / 100) * this.state.discountPerct;
  };
  calculatePrice = () => {
    if (
      isNaN(
        this.state.originalPrice -
          (this.state.originalPrice / 100) * this.state.discountPerct
      )
    )
      return 0;
    else
      return (
        this.state.originalPrice -
        (this.state.originalPrice / 100) * this.state.discountPerct
      );
  };
  saveRecord = () => {
    if (!isNaN(this.state.originalPrice) && !isNaN(this.state.discountPerct)) {
      this.setState({
        priceArray: [...this.state.priceArray, this.state.originalPrice],
        discountArray: [...this.state.discountArray, this.state.discountPerct],
      });
    }
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ position: 'absolute', top: 30, left: '20%', fontSize: 25 }}>
          Discount Calculator
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 20,
          }}
          onChangeText={(pricetext) =>
            this.onChangeText(pricetext, this.state.discountPerct)
          }
          onKeyPress={(e) => {
            if (e.nativeEvent.key == 'Backspace')
              this.setState({ originalPrice: '' });
          }}
          value={this.state.originalPrice}
          keyboardType={'number-pad'}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 20,
          }}
          onChangeText={(percentagetext) =>
            this.onChangeText(this.state.originalPrice, percentagetext)
          }
          onKeyPress={(e) => {
            if (e.nativeEvent.key == 'Backspace')
              this.setState({ discountPerct: '' });
          }}
          value={this.state.discountPerct}
          keyboardType={'number-pad'}
        />
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          You Save: {this.calculateDiscount() + ' Rs'}
        </Text>
        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 20 }}>
          Final Price: {this.calculatePrice() + ' Rs'}
        </Text>
        <View style={{ marginBottom: 20 }}>
          <Button
            onPress={() => this.saveRecord()}
            title="Save Record"
            color="#841584"
            accessibilityLabel="Save record"
          />
        </View>
        <View>
          <Button
            onPress={() => this.setState({ modalVisible: true })}
            title="Show History"
            color="#841584"
            accessibilityLabel="View History Button"
          />
        </View>
        <Modal animationType="slide" visible={this.state.modalVisible}>
          <Text
            style={{
              position: 'absolute',
              top: 30,
              left: '35%',
              fontSize: 25,
            }}>
            History
          </Text>
          <View style={styles.container}>
            <FlatList
              data={this.state.priceArray}
              extraData={this.state.discountArray}
              renderItem={({ item, index }) => (
                <View key={index}>
                  <Text style={{textAlign:"center"}}>Original Price: {item}</Text>
                  <Text style={{textAlign:"center"}}>
                    Discount Perecntage: {this.state.discountArray[index]}%
                  </Text>
                  <Text style={{ textAlign: 'center' }}>
                    Final Product Price:{' '}
                    {item - (item / 100) * this.state.discountArray[index]}
                  </Text>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              )}
            />
          </View>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              this.setState({ modalVisible: false });
            }}>
            <Text style={{ textAlign: 'center' }}>Go Back</Text>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
