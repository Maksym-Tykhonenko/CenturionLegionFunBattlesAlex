import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import CenturionLegionLayout from '../CenturionLegionComponents/CenturionLegionLayout';
import CenturionLegionButton from '../CenturionLegionComponents/CenturionLegionButton';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const CenturionLegionOnboard = () => {
  const [welcomeCenturionIndex, setWelcomeCenturionIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <CenturionLegionLayout>
      <View style={styles.centurionlegioncontainer}>
        {welcomeCenturionIndex === 0 ? (
          <Image
            source={require('../../assets/images/centurionlegionon1.png')}
            style={{ top: 80 }}
          />
        ) : welcomeCenturionIndex === 1 ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 3,
                alignItems: 'center',
                top: 30,
              }}
            >
              <Image
                source={require('../../assets/images/centurionlegionon2.png')}
              />
              <Image
                source={require('../../assets/images/centurionlegionon6.png')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Image
                source={require('../../assets/images/centurionlegionon3.png')}
              />
              <Image
                source={require('../../assets/images/centurionlegionon4.png')}
              />
            </View>
          </View>
        ) : (
          <Image
            source={require('../../assets/images/centurionlegionon5.png')}
            style={{ marginBottom: 50 }}
          />
        )}

        <ImageBackground
          source={require('../../assets/images/centurionlegionframe.png')}
          style={{
            width: 360,
            minHeight: 250,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 26,
          }}
        >
          <Text style={styles.centurionlegiontitle}>
            {welcomeCenturionIndex === 0
              ? 'Welcome to the Arena!'
              : welcomeCenturionIndex === 1
              ? 'Choose a challenge mode'
              : 'Do it - or skip'}
          </Text>
          <Text style={styles.centurionlegionsubtitle}>
            {welcomeCenturionIndex === 0
              ? `Legionnaire, it’s time to test yourself.
Add players and get ready for fun Roman challenges!`
              : welcomeCenturionIndex === 1
              ? 'Shield, Helmet, Colosseum or Chariot - each symbol carries its own challenge.'
              : `Your turn, Legionnaire!
Complete the task, pass the baton, and may the bravest win in this battle of fun!`}
          </Text>
        </ImageBackground>

        <CenturionLegionButton
          btnText="Get Started"
          onPress={() => {
            welcomeCenturionIndex === 2
              ? navigation.replace('CenturionLegionHome')
              : setWelcomeCenturionIndex(welcomeCenturionIndex + 1);
          }}
        />
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

export default CenturionLegionOnboard;
