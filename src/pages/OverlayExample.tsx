import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from "../components/Button";
import { useOverlay } from '../components/Overlay';

export default function OverlayExample() {
  const {add, remove, removeAll, showLoading, closeLoading} = useOverlay();
  const elementIndex = React.useRef(0);

  return (
    <View style={styles.container}>
      <Button onPress={() => {
        const index = add(<Text style={{ marginTop: 100, fontSize: 24 }}>子视图{elementIndex.current}</Text>);
        console.log('当前添加的元素', index);
        elementIndex.current++;
      }}>
        <Text>添加一个子视图</Text>
      </Button>
      <Button onPress={() => {
        remove();
      }}>
        <Text>删除一个子视图</Text>
      </Button>
      <Button onPress={() => {
        removeAll();
      }}>
        <Text>删除全部子视图</Text>
      </Button>
      <Button onPress={() => {
        showLoading();
      }}>
        <Text>show loading</Text>
      </Button>
      <Button onPress={() => {
        closeLoading();
      }}>
        <Text>close loading</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
