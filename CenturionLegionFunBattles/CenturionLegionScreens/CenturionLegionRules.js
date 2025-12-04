import CenturionLegionLayout from '../CenturionLegionComponents/CenturionLegionLayout';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const CenturionLegionRules = () => {
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
          <Text style={styles.centurionlegiontitle}>GAME RULES</Text>
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
                <Text
                  style={{
                    fontSize: 15,
                    color: '#FFF',
                    fontFamily: 'Jaro-Regular',
                    bottom: Platform.OS === 'ios' ? 2 : 0,
                  }}
                >
                  {`Add players
Minimum 2 people. Names are entered in any style.

Rounds
Standard 20 rounds

Choose a mode
There are 4 categories of tasks:
Shield - mini-battles between players
Helmet - tasks for courage
Colosseum - logic and memory
Chariot - dynamic actions

The mode does not drop out - you choose it yourself.

The game shows the name of the active player
Whoever is currently moving - completes the task.

Get the task from the selected mode
The task always corresponds to the category, there is nothing random between the modes.

Choose: complete or skip

"Completed" → the move goes to the next player.

"Missed" → you also pass the move on.

Moves take place in turn
The game determines the next one.

After the rounds are completed
All results are displayed.`}
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>
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

export default CenturionLegionRules;
