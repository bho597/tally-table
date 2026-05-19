import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@constants/colors';
import { Typography } from '@constants/typography';

export default function GroceryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Grocery</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.placeholder}>Your grocery list will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    ...Typography.heading1,
    color: Colors.text,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});
