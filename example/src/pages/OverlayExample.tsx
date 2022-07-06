import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useOverlay, OverlayUtil, TranslateContainer, NormalContainer, OpacityContainer, Button } from 'react-native-maui';

const {width, height} = Dimensions.get('window');

export default function OverlayExample() {
  const {add, remove, removeAll} = useOverlay();
  const elementIndex = React.useRef(0);

  return (
    <View style={styles.container}>
      <Button onPress={() => {
        const index = add(
          <View style={{ marginTop: 100 }}>
            <Text style={{ marginTop: 100, fontSize: 24 }}>子视图{elementIndex.current}</Text>
            <Text onPress={() => {
              remove(index);
            }} style={{ marginTop: 20, fontSize: 24 }}>关闭</Text>
          </View>
        );
        elementIndex.current++;
      }}>
        <Text>添加一个自定义子视图</Text>
      </Button>
      <Button onPress={() => {
        const index = add(
          <NormalContainer
            pointerEvents='none'
            onAppear={() => {
              console.log('子视图已弹出');
            }}
            onDisappear={() => {
              console.log('子视图已消失');
            }}
          >
            <Text style={{ marginTop: 100, fontSize: 24 }}>子视图{elementIndex.current}</Text>
          </NormalContainer>
        );
        elementIndex.current++;
      }}>
        <Text>添加一个子视图-NormalContainer</Text>
      </Button>
      <Button onPress={() => {
        add(
          <OpacityContainer
            onAppear={() => {
              console.log('子视图已弹出');
            }}
            onDisappear={() => {
              console.log('子视图已消失');
            }}
          >
            <Text style={{ marginTop: 100, fontSize: 24 }}>子视图{elementIndex.current}</Text>
          </OpacityContainer>
        );
        elementIndex.current++;
      }}>
        <Text>添加一个子视图-OpacityContainer</Text>
      </Button>
      <Button onPress={() => {
        remove();
      }}>
        <Text>删除最近添加的一个子视图</Text>
      </Button>
      <Button onPress={() => {
        removeAll();
      }}>
        <Text>删除全部子视图</Text>
      </Button>
      <Button onPress={() => {
        OverlayUtil.add(
          <NormalContainer>
            <Text style={{ marginTop: 100, fontSize: 24 }}>Funtion子视图{elementIndex.current}</Text>
            <Text onPress={() => {
              remove();
            }} style={{ marginTop: 20, fontSize: 24 }}>关闭</Text>
          </NormalContainer>
        )
        elementIndex.current++;
      }}>
        <Text>添加一个子视图-Function</Text>
      </Button>
      <Button onPress={() => {
        OverlayUtil.add(
          <TranslateContainer gesture={true}>
            <View style={{ height: 500, width, backgroundColor: '#fff' }}>
              <Text style={{ marginTop: 100, fontSize: 24 }}>Funtion子视图{elementIndex.current}</Text>
            </View>
          </TranslateContainer>,
          'pop-view-bottom'
        )
        elementIndex.current++;
      }}>
        <Text>从Bottom弹出-可透过遮罩点击底层View</Text>
      </Button>
      <Button onPress={() => {
        OverlayUtil.add(
          <TranslateContainer from="top" onClickMask={() => {console.log('点击遮罩')}}>
            <View style={{ height: 200, width, backgroundColor: '#fff' }}>
              <Text style={{ marginTop: 100, fontSize: 24 }}>Funtion子视图{elementIndex.current}</Text>
            </View>
          </TranslateContainer>,
          'pop-view-top'
        )
        elementIndex.current++;
      }}>
        <Text>从Top弹出</Text>
      </Button>
      <Button onPress={() => {
        OverlayUtil.add(
          <TranslateContainer from='left' gesture={true} modal={true}>
            <View style={{ width: 200, height, backgroundColor: '#fff' }}>
              <Text style={{ marginTop: 100, fontSize: 24 }}>Funtion子视图{elementIndex.current}</Text>
            </View>
          </TranslateContainer>,
          'pop-view-left'
        )
        elementIndex.current++;
      }}>
        <Text>从Left弹出-不可触摸关闭</Text>
      </Button>
      <Button onPress={() => {
        OverlayUtil.add(
          <TranslateContainer from='right' mask={false} underView={{ isScale: true }}>
            <View style={{ width: 200, height, backgroundColor: '#fff' }}>
              <Text style={{ marginTop: 100, fontSize: 24 }}>Funtion子视图{elementIndex.current}</Text>
            </View>
          </TranslateContainer>,
          'pop-view-right'
        )
        elementIndex.current++;
      }}>
        <Text>从Right弹出-不需要遮罩</Text>
      </Button>
      <Button onPress={() => {
        OverlayUtil.add(
          <TranslateContainer from='bottom' gesture={true} underView={{ isScale: true }}>
            <View style={{ height: 500, width, backgroundColor: '#fff' }}>
              <Text style={{ marginTop: 100, fontSize: 24 }}>Funtion子视图{elementIndex.current}</Text>
            </View>
          </TranslateContainer>,
          'pop-view-bottom'
        )
        elementIndex.current++;
      }}>
        <Text>从Bottom弹出-缩放下层View</Text>
      </Button>
      <Button onPress={() => {
        OverlayUtil.add(
          <TranslateContainer from='right' modal={true} gesture={true} mask={false} underView={{ isTranslate: true }}>
            <View style={{ width: 300, height, backgroundColor: '#fff' }}>
              <Text style={{ marginTop: 100, fontSize: 24 }}>Funtion子视图{elementIndex.current}</Text>
            </View>
          </TranslateContainer>,
          'pop-view-left'
        )
        elementIndex.current++;
      }}>
        <Text>从Right弹出-平移下层View</Text>
      </Button>
      <Button onPress={() => {
        OverlayUtil.add(
          <TranslateContainer from='left' modal={true} gesture={true} mask={false} underView={{ isTranslate: true, isScale: true }}>
            <View style={{ width: 300, height, backgroundColor: '#fff' }}>
              <Text style={{ marginTop: 100, fontSize: 24 }}>Funtion子视图{elementIndex.current}</Text>
            </View>
          </TranslateContainer>,
          'pop-view-left'
        )
        elementIndex.current++;
      }}>
        <Text>从Left弹出-平移下层View并缩放</Text>
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
