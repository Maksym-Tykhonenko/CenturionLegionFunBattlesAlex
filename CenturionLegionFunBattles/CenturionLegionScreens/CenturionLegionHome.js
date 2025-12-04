import { Dimensions, Image, StyleSheet, View } from 'react-native';
import CenturionLegionLayout from '../CenturionLegionComponents/CenturionLegionLayout';
import CenturionLegionButton from '../CenturionLegionComponents/CenturionLegionButton';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const CenturionLegionHome = () => {
  const navigation = useNavigation();

  return (
    <CenturionLegionLayout>
      <View style={styles.centurionlegioncontainer}>
        <View>
          <Image
            source={require('../../assets/images/centurionleglogo.png')}
            style={{ position: 'absolute', top: -20, alignSelf: 'center' }}
          />
          <Image
            source={require('../../assets/images/centurionlegionon1.png')}
            style={{ top: 60 }}
          />
        </View>

        <View style={{ gap: 16, width: '100%' }}>
          <CenturionLegionButton
            btnText="START PLAY"
            onPress={() => navigation.navigate('CenturionLegionGame')}
          />
          <CenturionLegionButton
            btnText="GAME RULES"
            onPress={() => navigation.navigate('CenturionLegionRules')}
          />
          <CenturionLegionButton
            btnText="ABOUT THE APP"
            onPress={() => navigation.navigate('CenturionLegionAbout')}
          />
        </View>
      </View>
    </CenturionLegionLayout>
  );
};

const styles = StyleSheet.create({
  centurionlegioncontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: height * 0.06,
  },
  centurionlegiontitle: {
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Jaro-Regular',
  },
  centurionlegionsubtitle: {
    fontSize: 16,
    color: '#6E6E6E',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
    fontFamily: 'Jaro-Regular',
  },
});

export default CenturionLegionHome;
