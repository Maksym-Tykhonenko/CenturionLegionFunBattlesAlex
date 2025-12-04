import { Platform, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CenturionLegionButton = ({
  onPress,
  btnText,
  buttonHeight = 88,
  buttonWidth = '85%',
  buttonColors = ['#8E0600', '#760200'],
  buttonBorders = ['#FDD95A', '#CB6C05'],
  buttonTextColor = '#FFF',
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={{ alignSelf: 'center', width: buttonWidth }}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={() => {
        onPress();
      }}
    >
      <LinearGradient
        colors={buttonBorders}
        style={{
          borderRadius: 22,
        }}
      >
        <LinearGradient
          colors={buttonColors}
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
              height: buttonHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 32,
                color: buttonTextColor,
                fontFamily: 'Jaro-Regular',
                textTransform: 'uppercase',
                bottom: Platform.OS === 'ios' ? 2 : 0,
                textAlign: 'center',
              }}
            >
              {btnText}
            </Text>
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CenturionLegionButton;
