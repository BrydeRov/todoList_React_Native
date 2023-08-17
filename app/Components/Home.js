import React from 'react';
import { SafeAreaView, StatusBar, ScrollView, StyleSheet, View } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';

const data = new Array(8).fill({
  title: 'Item',
});

const Home = () => {

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category='h6'>
        {`${info.item.title} ${info.index + 1}`}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps) => (
    <Text {...footerProps}>
      By Wikipedia
    </Text>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status='basic'
      header={(headerProps) => renderItemHeader(headerProps, info)}
      footer={renderItemFooter}
    >
      <Text>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.
      </Text>
    </Card>
  );

  return (
    <View>
      <Text category='h1' style={styles.title}>
        Tareas
      </Text>
      <SafeAreaView style={styles.safeArea}> 
        <ScrollView style={styles.scrollView}>
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={data}
            renderItem={renderItem}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // maxHeight: '76vh',
  },
  contentContainer: {
    // paddingHorizontal: 8,
    // paddingVertical: 4,
  },
  item: {
    // marginVertical: 4,
  },
  title: {
    marginVertical: '20px'
    // paddingTop: 0,
    // marginTop: 0  
  },
  scrollView: {

  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    maxHeight: '78vh'
  }
});

export default Home;
