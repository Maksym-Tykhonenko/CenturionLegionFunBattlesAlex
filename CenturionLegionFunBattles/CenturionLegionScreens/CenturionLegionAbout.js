import CenturionLegionLayout from '../CenturionLegionComponents/CenturionLegionLayout';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CenturionLegionButton from '../CenturionLegionComponents/CenturionLegionButton';

const { height } = Dimensions.get('window');

const CenturionLegionAbout = () => {
  const navigation = useNavigation();

  return (
    <CenturionLegionLayout>
      <View style={styles.centurionlegioncontainer}>
        <TouchableOpacity
          style={styles.centurionlegionwrap}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/centurionback.png')} />
          <Text style={styles.centurionlegiontitle}>ABOUT THE APP</Text>
        </TouchableOpacity>

        <View style={{ gap: 16, width: '100%' }}>
          <LinearGradient
            colors={['#FDD95A', '#CB6C05']}
            style={{
              borderRadius: 22,
            }}
          >
            <LinearGradient
              colors={['#8E0600', '#760200']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 20,
                padding: Platform.OS === 'ios' ? 2 : 0,
                margin: Platform.OS === 'ios' ? 0 : 2,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                <Image
                  source={require('../../assets/images/centurionaboutlogo.png')}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: '#FFF',
                    fontFamily: 'Jaro-Regular',
                    bottom: Platform.OS === 'ios' ? 2 : 0,
                    marginTop: 27,
                    lineHeight: 21,
                  }}
                >
                  {`Centurion Legion Fun Battles is a simple and fun game for a company, where you choose the mode yourself and complete short tasks: mini-battles, daring actions, logical challenges or dynamic movements.
The game shows whose turn it is now, gives tasks, and after the rounds determines the best player.

Everything is as simple as possible, without unnecessary screens and complicated rules - only the atmosphere of Rome and good company.`}
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>

          <CenturionLegionButton
            buttonWidth="100%"
            btnText="SHARE APP"
            onPress={() =>
              Linking.openURL(
                'https://apps.apple.com/us/app/centurion-legion-fun-battles/id6755958469',
              )
            }
          />
        </View>
      </View>
    </CenturionLegionLayout>
  );
};

const styles = StyleSheet.create({
  centurionlegioncontainer: {
    flex: 1,
    padding: 20,
    paddingTop: height * 0.06,
  },
  centurionlegiontitle: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Jaro-Regular',
  },
  centurionlegionwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 26,
  },
});

export default CenturionLegionAbout;
