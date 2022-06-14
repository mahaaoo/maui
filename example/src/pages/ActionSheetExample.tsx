import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, ActionSheet, ActionSheetUtil} from '@maui';

interface ActionSheetExampleProps {
};

const options = ['option1', 'option2', 'option3', 'option4', 'option5'];
const ActionSheetExample: React.FC<ActionSheetExampleProps> = props => {
  const {} = props;

  return (
    <View style={styles.container}>
      <Button onPress={() => {
        ActionSheetUtil.show(
          <ActionSheet 
            options={options} 
            onSelect={(item, index) => {
              console.log('选择了:', item);
            }}
            onDisappear={() => {
              console.log('关闭');
            }}
          />  
        )
      }}>
        <Text>默认样式</Text>
      </Button>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default ActionSheetExample;
