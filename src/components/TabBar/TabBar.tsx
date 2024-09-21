import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, ScrollView, LayoutChangeEvent, StyleSheet } from 'react-native';
import TabBarItem from './TabBarItem';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TabBarSlider from './TabBarSlider';
import Separator from './Separator';
import { TabBarProps, TabBarItemLayout } from './type';
import { useVerifyProps } from './hook';

interface TabBarRef {
  setTab: (index: number) => void;
}

const TabBar = forwardRef<TabBarRef, TabBarProps>((props, ref) => {
  const {
    tabs,
    style,
    flex = 'auto',
    spacing = 0,
    showSeparator = false,
    scrollEnabled = true,
    hideSlider = false,
    defaultSliderStyle,
    tabBarItemStyle,
    tabBarItemTitleStyle,
    separatorComponent,
    sliderComponent,
    onPress,

    initialTab = 0,
    defalutSliderWidth,
    contentSize,
  } = useVerifyProps(props);

  const sliderOffset = useSharedValue(0);
  const scrollSize = useRef(0);
  const scrollRef = useRef<ScrollView>(null);
  const layouts = useRef<TabBarItemLayout[]>([]).current;
  const sliderWidth = useRef(defalutSliderWidth);

  useImperativeHandle(
    ref,
    () => ({
      setTab: handleOnPress,
    }),
    []
  );

  const handleOnPress = (index: number) => {
    // setCurrentIndex(index);
    calculateSliderOffset(index);
    onPress && onPress(index);
  };

  const onTabBarItemLayout = (index: number, layout: TabBarItemLayout) => {
    layouts[index] = layout;
    const length = layouts.filter((layout) => layout.width > 0).length;

    if (length === tabs.length) {
      calculateSliderOffset(initialTab);
    }
  };

  const onContentSizeChange = (w: number) => {
    scrollSize.current = w;
  };

  const onSliderLayout = (event: LayoutChangeEvent) => {
    const { width = 0, height } = event.nativeEvent.layout;
    sliderWidth.current = width;
  };

  const calculateSliderOffset = (index: number) => {
    'worklet';
    if (index < 0 || index >= tabs.length) {
      throw new Error(
        'calculateSliderOffset can only handle index [0, tabs.length - 1]'
      );
    }

    const { x, y, width, height } = layouts[index];

    const toValue = x + (width - sliderWidth.current) / 2;
    if (toValue > contentSize / 2) {
      scrollRef.current &&
        scrollRef.current?.scrollTo({
          x: toValue - contentSize / 2,
          y: 0,
          animated: true,
        });
    } else {
      scrollRef.current &&
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
    sliderOffset.value = withTiming(toValue);
  };

  const tabBarItemWidth = useMemo(() => {
    return flex === 'auto'
      ? 'auto'
      : (contentSize - (tabs.length + 1) * spacing) / tabs.length;
  }, [flex, contentSize, tabs, spacing]);

  const animatedSlider = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: sliderOffset.value,
        },
      ],
    };
  });

  return (
    <View style={[{ height: 55 }, style]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {tabs?.length > 0 &&
          tabs.map((tab, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 ? <Separator spacing={spacing} /> : null}
                <TabBarItem
                  width={tabBarItemWidth}
                  style={tabBarItemStyle}
                  titleStyle={tabBarItemTitleStyle}
                  index={index}
                  title={tab}
                  onLayout={onTabBarItemLayout}
                  onPress={handleOnPress}
                />
                <Separator spacing={spacing}>
                  {index !== tabs.length - 1 &&
                    showSeparator &&
                    separatorComponent &&
                    separatorComponent(index)}
                </Separator>
              </React.Fragment>
            );
          })}
        {!hideSlider ? (
          <Animated.View style={[styles.sliderContainer, animatedSlider]}>
            {sliderComponent ? (
              <View onLayout={onSliderLayout}>{sliderComponent()}</View>
            ) : (
              <TabBarSlider style={defaultSliderStyle} />
            )}
          </Animated.View>
        ) : null}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
});

export default TabBar;
