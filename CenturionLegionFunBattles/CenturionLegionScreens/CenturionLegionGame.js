import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CenturionLegionLayout from '../CenturionLegionComponents/CenturionLegionLayout';
import CenturionLegionButton from '../CenturionLegionComponents/CenturionLegionButton';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  ImageBackground,
  Share,
} from 'react-native';

import {
  centurionLegionModes,
  centurionLegionTasksCourage,
  centurionLegionTasksMini,
  centurionLegionTasksMemory,
  centurionLegionTasksDynamic,
} from '../CenturionLegionData/centurionLegionGameData';

const { height } = Dimensions.get('window');

const centurionLegionMAX_PLAYERS = 4;
const centurionLegionMAX_ROUNDS = 5;

const centurionLegionModeToTasks = {
  mini: centurionLegionTasksMini,
  courage: centurionLegionTasksCourage,
  memory: centurionLegionTasksMemory,
  dynamic: centurionLegionTasksDynamic,
};

export default function CenturionLegionFullGame() {
  const [centurionLegionScreen, setCenturionLegionScreen] = useState('players');
  const [centurionLegionPlayers, setCenturionLegionPlayers] = useState([
    { name: '' },
  ]);
  const [centurionLegionMode, setCenturionLegionMode] = useState(null);
  const [centurionLegionTask, setCenturionLegionTask] = useState('');
  const [centurionLegionTurn, setCenturionLegionTurn] = useState(0);
  const [centurionLegionRound, setCenturionLegionRound] = useState(1);
  const [centurionLegionScores, setCenturionLegionScores] = useState({});
  const [
    centurionLegionPlayerTasksCounter,
    setCenturionLegionPlayerTasksCounter,
  ] = useState({});
  const [
    centurionLegionUsedTasksByPlayer,
    setCenturionLegionUsedTasksByPlayer,
  ] = useState({});

  const navigation = useNavigation();

  const centurionLegionAddPlayer = () => {
    if (
      Array.isArray(centurionLegionPlayers) &&
      centurionLegionPlayers.length < centurionLegionMAX_PLAYERS
    ) {
      setCenturionLegionPlayers([...centurionLegionPlayers, { name: '' }]);
    }
  };

  const centurionLegionRemovePlayer = index => {
    if (!Array.isArray(centurionLegionPlayers)) return;
    const updated = [...centurionLegionPlayers];
    updated.splice(index, 1);
    setCenturionLegionPlayers(updated);
  };

  const centurionLegionAssignTaskToPlayer = playerName => {
    if (!playerName || !centurionLegionMode) {
      setCenturionLegionTask('');
      return;
    }

    const pool = centurionLegionModeToTasks[centurionLegionMode] || [];
    if (pool.length === 0) {
      setCenturionLegionTask('');
      return;
    }

    setCenturionLegionUsedTasksByPlayer(prev => {
      const prevUsed = prev[playerName] || [];
      const available = pool.filter(t => !prevUsed.includes(t));
      const source = available.length > 0 ? available : pool;
      const newTask = source[Math.floor(Math.random() * source.length)];

      setCenturionLegionTask(newTask);

      return {
        ...prev,
        [playerName]: [...prevUsed, newTask],
      };
    });
  };

  const centurionLegionStartGame = () => {
    setCenturionLegionScreen('loader');

    setTimeout(() => {
      const safePlayers = centurionLegionPlayers || [];

      setCenturionLegionScores(
        Object.fromEntries(safePlayers.map(p => [p.name, 0])),
      );
      setCenturionLegionPlayerTasksCounter(
        Object.fromEntries(safePlayers.map(p => [p.name, 0])),
      );
      setCenturionLegionUsedTasksByPlayer({});
      setCenturionLegionTurn(0);
      setCenturionLegionRound(1);

      const firstName = safePlayers[0]?.name;
      if (firstName) centurionLegionAssignTaskToPlayer(firstName);
      else setCenturionLegionTask('');

      setCenturionLegionScreen('game');
    }, 3000);
  };

  const centurionLegionCompleteTask = () => {
    const current = centurionLegionPlayers?.[centurionLegionTurn]?.name;
    if (!current) return;

    setCenturionLegionScores(prev => ({
      ...prev,
      [current]: (prev[current] || 0) + 1,
    }));

    centurionLegionNextTurn();
  };

  const centurionLegionSkipTask = () => {
    centurionLegionNextTurn();
  };

  const centurionLegionNextTurn = () => {
    if (
      !Array.isArray(centurionLegionPlayers) ||
      centurionLegionPlayers.length === 0
    )
      return;

    const current = centurionLegionPlayers[centurionLegionTurn]?.name;
    if (!current) return;

    setCenturionLegionPlayerTasksCounter(prev => {
      const updated = {
        ...prev,
        [current]: (prev[current] || 0) + 1,
      };

      const allDone = centurionLegionPlayers.every(
        p => (updated[p.name] || 0) >= centurionLegionMAX_ROUNDS,
      );

      if (allDone) {
        setCenturionLegionScreen('result');
        return updated;
      }

      setCenturionLegionTurn(prevTurn => {
        let nextIndex = prevTurn + 1;
        let wrapped = false;

        if (nextIndex >= centurionLegionPlayers.length) {
          nextIndex = 0;
          wrapped = true;
        }

        if (wrapped) {
          setCenturionLegionRound(prevRound =>
            prevRound < centurionLegionMAX_ROUNDS ? prevRound + 1 : prevRound,
          );
        }

        const nextName = centurionLegionPlayers[nextIndex]?.name;
        if (nextName) centurionLegionAssignTaskToPlayer(nextName);
        else setCenturionLegionTask('');

        return nextIndex;
      });

      return updated;
    });
  };

  const centurionLegionBestPlayer = () => {
    if (
      !centurionLegionScores ||
      Object.keys(centurionLegionScores).length === 0
    )
      return '';
    const arr = Object.entries(centurionLegionScores).sort(
      (a, b) => b[1] - a[1],
    );
    return arr[0][0];
  };

  const centurionLegionCurrentMode = centurionLegionModes.find(
    m => m.id === centurionLegionMode,
  );

  const centurionLegionRestartGame = () => {
    const safePlayers = centurionLegionPlayers || [];

    setCenturionLegionScores(
      Object.fromEntries(safePlayers.map(p => [p.name, 0])),
    );
    setCenturionLegionPlayerTasksCounter(
      Object.fromEntries(safePlayers.map(p => [p.name, 0])),
    );
    setCenturionLegionUsedTasksByPlayer({});
    setCenturionLegionRound(1);
    setCenturionLegionTurn(0);

    const firstName = safePlayers[0]?.name;
    if (firstName) centurionLegionAssignTaskToPlayer(firstName);
    else setCenturionLegionTask('');

    setCenturionLegionScreen('game');
  };

  if (centurionLegionScreen === 'players') {
    return (
      <CenturionLegionLayout>
        <View style={styles.centurionLegionWrap}>
          <TouchableOpacity
            style={styles.centurionLegionHeaderRow}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../../assets/images/centurionback.png')} />
            <Text style={styles.centurionLegionHeaderTitle}>ADD PLAYERS</Text>
          </TouchableOpacity>

          {Array.isArray(centurionLegionPlayers) &&
            centurionLegionPlayers.map((p, i) => (
              <View key={i} style={styles.centurionLegionPlayerRow}>
                <Text style={styles.centurionLegionLabel}>Player {i + 1}</Text>

                <View style={styles.centurionLegionInputRow}>
                  <TextInput
                    placeholder="Enter player name"
                    placeholderTextColor="#ccc"
                    style={styles.centurionLegionInput}
                    maxLength={10}
                    value={p.name}
                    onChangeText={t => {
                      const list = [...centurionLegionPlayers];
                      list[i].name = t;
                      setCenturionLegionPlayers(list);
                    }}
                  />

                  {i === centurionLegionPlayers.length - 1 &&
                  centurionLegionPlayers.length < 4 ? (
                    <TouchableOpacity
                      style={styles.centurionLegionAddBtn}
                      onPress={centurionLegionAddPlayer}
                    >
                      <Text style={styles.centurionLegionBtnPlus}>+</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.centurionLegionDelBtn}
                      onPress={() => centurionLegionRemovePlayer(i)}
                    >
                      <Text style={styles.centurionLegionBtnDel}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}

          {centurionLegionPlayers &&
            centurionLegionPlayers.length > 0 &&
            centurionLegionPlayers.every(p => p.name.trim() !== '') && (
              <CenturionLegionButton
                btnText="START PLAY"
                onPress={() => setCenturionLegionScreen('modes')}
                buttonWidth="100%"
              />
            )}
        </View>
      </CenturionLegionLayout>
    );
  }

  if (centurionLegionScreen === 'modes') {
    return (
      <CenturionLegionLayout>
        <View style={styles.centurionLegionWrap}>
          <TouchableOpacity
            style={styles.centurionLegionHeaderRow}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../../assets/images/centurionback.png')} />
            <Text style={styles.centurionLegionHeaderTitle}>CHOOSE A MODE</Text>
          </TouchableOpacity>

          {centurionLegionModes.map(m => (
            <LinearGradient
              colors={['#FDD95A', '#CB6C05']}
              key={m.id}
              style={styles.centurionLegionModeOuter}
            >
              <LinearGradient
                colors={['#8E0600', '#760200']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.centurionLegionModeInner}
              >
                <View style={styles.centurionLegionModeContent}>
                  <Image source={m.icon} />

                  <View style={styles.centurionLegionModeTextBlock}>
                    <View>
                      <Text style={styles.centurionLegionModeTitle}>
                        {m.title}
                      </Text>
                      <Text style={styles.centurionLegionModeDesc}>
                        {m.desc}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.centurionLegionModeSelectBtn}
                      activeOpacity={0.7}
                      onPress={() => {
                        setCenturionLegionMode(m.id);
                        centurionLegionStartGame();
                      }}
                    >
                      <LinearGradient
                        colors={['#FDD95A', '#CB6C05']}
                        style={styles.centurionLegionModeSelectInner}
                      >
                        <Text style={styles.centurionLegionModeSelectTxt}>
                          SELECT
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </LinearGradient>
          ))}
        </View>
      </CenturionLegionLayout>
    );
  }

  if (centurionLegionScreen === 'loader') {
    return (
      <CenturionLegionLayout>
        <View style={styles.centurionLegionLoaderWrap}>
          <Image
            source={require('../../assets/images/centurionlegionldr.png')}
          />
        </View>
      </CenturionLegionLayout>
    );
  }

  if (centurionLegionScreen === 'game') {
    const centurionLegionCurrentPlayerName =
      centurionLegionPlayers?.[centurionLegionTurn]?.name || 'Player';

    return (
      <CenturionLegionLayout>
        <View style={styles.centurionLegionWrap}>
          <View style={styles.centurionLegionGameHeader}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../../assets/images/centurionhome.png')}
              />
            </TouchableOpacity>

            <LinearGradient
              colors={['#FDD95A', '#CB6C05']}
              style={styles.centurionLegionPlayerBoxOuter}
            >
              <LinearGradient
                colors={['#8E0600', '#760200']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.centurionLegionPlayerBoxInner}
              >
                <View style={styles.centurionLegionPlayerBox}>
                  <Text style={styles.centurionLegionModeTitle}>
                    {centurionLegionCurrentPlayerName}
                  </Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </View>

          <View style={styles.centurionLegionRoundContainer}>
            <Text style={styles.centurionLegionRoundText}>
              Round {centurionLegionRound}
            </Text>

            <Image source={require('../../assets/images/centurionarr.png')} />

            <Text style={styles.centurionLegionRoundText}>
              Round{' '}
              {centurionLegionRound === 5
                ? centurionLegionRound
                : centurionLegionRound + 1}
            </Text>
          </View>

          <ImageBackground
            source={require('../../assets/images/centurionlegionframe.png')}
            style={styles.centurionLegionTaskFrame}
          >
            {centurionLegionCurrentMode && (
              <Image
                source={centurionLegionCurrentMode.icon}
                style={{ marginBottom: 4 }}
              />
            )}

            <Text style={styles.centurionLegionTaskTitle}>
              TASK for {centurionLegionCurrentPlayerName}
            </Text>

            <Text style={styles.centurionLegionTaskText}>
              {centurionLegionTask}
            </Text>
          </ImageBackground>

          <CenturionLegionButton
            btnText="Done!"
            onPress={centurionLegionCompleteTask}
            buttonWidth="100%"
          />

          <TouchableOpacity
            onPress={centurionLegionSkipTask}
            style={styles.centurionLegionSkipTouchable}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FDD95A', '#CB6C05']}
              style={styles.centurionLegionSkipBtn}
            >
              <Text style={styles.centurionLegionSkipTxt}>SKIP TASK</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </CenturionLegionLayout>
    );
  }

  if (centurionLegionScreen === 'result') {
    return (
      <CenturionLegionLayout>
        <View style={styles.centurionLegionWrap}>
          <LinearGradient
            colors={['#FDD95A', '#CB6C05']}
            style={styles.centurionLegionResultHeaderOuter}
          >
            <LinearGradient
              colors={['#8E0600', '#760200']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.centurionLegionResultHeaderInner}
            >
              <View style={styles.centurionLegionResultHeaderBox}>
                <Text style={styles.centurionLegionModeTitle}>
                  RESULT OF GAME
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>

          <ImageBackground
            source={require('../../assets/images/centurionresboard.png')}
            style={styles.centurionLegionResultBoard}
          >
            <Text style={styles.centurionLegionResultTitle}>
              Glory to the one who showed himself best!
            </Text>

            <View style={styles.centurionLegionScoreUnderline} />
            {Object.entries(centurionLegionScores)
              .sort((a, b) => b[1] - a[1])
              .map(([name, score], i) => (
                <View key={i} style={styles.centurionLegionResultRow}>
                  <Text
                    style={[
                      styles.centurionLegionScoreRow,
                      i === 0 && styles.centurionLegionBestTextName,
                    ]}
                  >
                    {name}
                  </Text>

                  <Text
                    style={[
                      styles.centurionLegionScoreRow,
                      i === 0 && styles.centurionLegionBestTextName,
                    ]}
                  >
                    {score}
                  </Text>
                </View>
              ))}

            <View style={styles.centurionLegionScoreUnderline} />

            <View style={styles.centurionLegionBestPlayerWrapper}>
              <Text style={styles.centurionLegionBestText}>Best player:</Text>
              <Text style={styles.centurionLegionBestTextName}>
                {centurionLegionBestPlayer()}
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.centurionLegionResultButtonsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <ImageBackground
                source={require('../../assets/images/centurionresfr.png')}
                style={styles.centurionLegionHomeBtn}
              >
                <Image
                  source={require('../../assets/images/centurionrehome.png')}
                />
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={centurionLegionRestartGame}
            >
              <ImageBackground
                source={require('../../assets/images/centurionresfr.png')}
                style={styles.centurionLegionHomeBtn}
              >
                <Image
                  source={require('../../assets/images/centurionrestart.png')}
                />
              </ImageBackground>
            </TouchableOpacity>

            <CenturionLegionButton
              btnText="SHARE"
              onPress={() => {
                Share.share({
                  message: `Result of the game:\nBest player: ${centurionLegionBestPlayer()}\n\nscores:\n${Object.entries(
                    centurionLegionScores,
                  )
                    .map(([name, score]) => `${name}: ${score}`)
                    .join(
                      '\n',
                    )}\n\nPlay Centurion Legion Fun Battles app to challenge your friends!`,
                });
              }}
              buttonWidth="50%"
              buttonHeight={84}
            />
          </View>
        </View>
      </CenturionLegionLayout>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  centurionLegionWrap: {
    flex: 1,
    padding: 20,
    paddingTop: height * 0.07,
  },
  centurionLegionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 40,
  },
  centurionLegionHeaderTitle: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Jaro-Regular',
  },
  centurionLegionPlayerRow: {
    marginBottom: 20,
  },
  centurionLegionLabel: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Jaro-Regular',
    marginBottom: 12,
  },
  centurionLegionInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centurionLegionInput: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: 22,
    padding: 16,
    fontSize: 15,
    paddingVertical: 18,
    color: '#000',
    fontFamily: 'Jaro-Regular',
    minHeight: 66,
  },
  centurionLegionAddBtn: {
    width: 66,
    height: 66,
    backgroundColor: '#8E0600',
    marginLeft: 16,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FDD95A',
  },
  centurionLegionDelBtn: {
    width: 66,
    height: 66,
    backgroundColor: '#8E0600',
    marginLeft: 16,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FDD95A',
  },
  centurionLegionBtnPlus: {
    fontSize: 36,
    color: '#fff',
    bottom: 3,
  },
  centurionLegionBtnDel: {
    fontSize: 36,
    color: '#fff',
    bottom: 3,
  },
  centurionLegionModeOuter: {
    borderRadius: 22,
    marginBottom: 12,
  },
  centurionLegionModeInner: {
    borderRadius: 20,
    padding: Platform.OS === 'ios' ? 2 : 0,
    margin: Platform.OS === 'ios' ? 0 : 2,
  },
  centurionLegionModeContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centurionLegionModeTextBlock: {
    flex: 1,
    marginLeft: 20,
    gap: 14,
  },
  centurionLegionModeTitle: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Jaro-Regular',
  },
  centurionLegionModeDesc: {
    fontSize: 16,
    color: '#fff',
    marginTop: 6,
    fontFamily: 'Jaro-Regular',
    textTransform: 'uppercase',
  },
  centurionLegionModeSelectBtn: {
    borderRadius: 16,
    width: '100%',
  },
  centurionLegionModeSelectInner: {
    borderRadius: 16,
    width: 200,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  centurionLegionModeSelectTxt: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'Jaro-Regular',
  },
  centurionLegionLoaderWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centurionLegionGameHeader: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  centurionLegionPlayerBoxOuter: {
    borderRadius: 22,
  },
  centurionLegionPlayerBoxInner: {
    borderRadius: 20,
    padding: Platform.OS === 'ios' ? 2 : 0,
    margin: Platform.OS === 'ios' ? 0 : 2,
  },
  centurionLegionPlayerBox: {
    minWidth: 200,
    padding: 25,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  centurionLegionRoundContainer: {
    width: '100%',
    marginBottom: 28,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 22,
    borderWidth: 2,
    borderColor: '#760200',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centurionLegionRoundText: {
    fontSize: 28,
    color: '#000',
    fontFamily: 'Jaro-Regular',
  },
  centurionLegionTaskFrame: {
    width: 360,
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    alignSelf: 'center',
  },
  centurionLegionTaskTitle: {
    fontSize: 25,
    fontFamily: 'Jaro-Regular',
    color: '#000000',
    textAlign: 'center',
  },
  centurionLegionTaskText: {
    fontSize: 18,
    fontFamily: 'Jaro-Regular',
    color: '#6E6E6E',
    textAlign: 'center',
    marginTop: 6,
  },
  centurionLegionSkipTouchable: {
    width: '100%',
    height: 88,
    marginTop: 10,
  },
  centurionLegionSkipBtn: {
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    height: 88,
  },
  centurionLegionSkipTxt: {
    fontSize: 22,
    color: '#760200',
    fontFamily: 'Jaro-Regular',
  },
  centurionLegionResultHeaderOuter: {
    borderRadius: 22,
    width: 245,
    alignSelf: 'center',
    marginBottom: 20,
  },
  centurionLegionResultHeaderInner: {
    borderRadius: 20,
    padding: Platform.OS === 'ios' ? 2 : 0,
    margin: Platform.OS === 'ios' ? 0 : 2,
  },
  centurionLegionResultHeaderBox: {
    paddingVertical: 25,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  centurionLegionResultBoard: {
    width: 360,
    minHeight: 515,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    alignSelf: 'center',
    padding: 24,
  },
  centurionLegionResultTitle: {
    fontSize: 28,
    fontFamily: 'Jaro-Regular',
    color: '#760200',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  centurionLegionScoreUnderline: {
    width: '93%',
    height: 2,
    backgroundColor: '#760200',
    marginTop: 15,
  },
  centurionLegionResultRow: {
    flexDirection: 'row',
    width: '93%',
    justifyContent: 'space-between',
    marginTop: 14,
    alignItems: 'center',
  },
  centurionLegionScoreRow: {
    fontSize: 20,
    fontFamily: 'Jaro-Regular',
    color: '#000',
  },
  centurionLegionBestText: {
    fontSize: 28,
    marginBottom: 10,
    fontFamily: 'Jaro-Regular',
    color: '#6E6E6E',
  },
  centurionLegionBestTextName: {
    fontSize: 34,
    marginBottom: 10,
    fontFamily: 'Jaro-Regular',
    color: '#760200',
  },
  centurionLegionBestPlayerWrapper: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    width: '93%',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  centurionLegionResultButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  centurionLegionHomeBtn: {
    width: 78,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
