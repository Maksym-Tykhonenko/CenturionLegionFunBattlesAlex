import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CenturionLegionLayout from './CenturionLegionLayout';

const CenturionLegionLoader = () => {
  return (
    <CenturionLegionLayout>
      <View style={styles.centurionlegioncont}>
        <Image source={require('../../assets/images/centurionlegionldr.png')} />
      </View>
    </CenturionLegionLayout>
  );
};

const styles = StyleSheet.create({
  centurionlegioncont: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CenturionLegionLoader;
