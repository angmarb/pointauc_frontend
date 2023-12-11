import React, {FC, useCallback, useState} from 'react';
import PageContainer from '../../../components/PageContainer/PageContainer';
import GroupingSelect, {getGroupSize, Grouping} from './GroupingSelect';
import './TeamBuildPage.scss';
import {Button, Switch} from '@material-ui/core';
import {shuffle} from '../../../utils/common.utils';
import {GroupList, makeEmptyGroups, ResultPlayerGroup, usePlayerGroupItems} from './GroupList';
import {PlayerList, useAddBlankPlayer, usePlayerItems} from './PlayerList';
import {useAddBlankPlayerGroup} from './GroupList/funcs';
import {Add} from '@material-ui/icons';
import {useTeamBuildLS} from './ls';
import PastePlayers from './PastePlayers';
import ExportPlayersText from './ExportPlayersText';

const TeamBuildPage: FC = () => {
  const [grouping, setGrouping] = useState<Grouping>(Grouping.duel);
  const {_players, players, setPlayers} = usePlayerItems();
  const [randomize, setRandomize] = useState<boolean>(true);
  const hasError = !players.length || !!players.find(p => !p.name || p.error);

  const {_groups, playerGroups, setGroups} = usePlayerGroupItems();
  const addBlankPlayerGroup = useAddBlankPlayerGroup(setGroups);

  const makeGroups = useCallback(() => {
      let nowPlayers = players.slice();
      if (randomize) {
          nowPlayers = shuffle(nowPlayers);
      }
      const groupSize = getGroupSize(grouping);
      setGroups(nowPlayers.reduce<ResultPlayerGroup[]>((groups, player, i) => {
          groups[Math.floor(i / groupSize)].players[i % groupSize] = player;
          return groups;
      }, makeEmptyGroups(nowPlayers.length, groupSize)))
  }, [randomize, players, grouping, setGroups]);
  const addBlankPlayer = useAddBlankPlayer(setPlayers);

  useTeamBuildLS({
      players: _players, setPlayers,
      setGroups, playerGroups: _groups,
      grouping, setGrouping
  });

  return (
    <PageContainer title="Создание групп по игрокам" className={'teamBuildPage'}>
        <div className={'row1'}>
            <div className={'col1'}>
                <h2 className={'playerListAdd'}>
                    <Add onClick={addBlankPlayer} className={'clickable'} titleAccess={'Добавить игрока (горячая клавиша TAB на последнем элементе)'}/>
                    Игроки
                </h2>
                {/*<Button variant={'outlined'} className={'playerListAdd'} onClick={addBlankPlayer}>*/}
                {/*  Добавить игрока*/}
                {/*</Button>*/}
                <PlayerList players={players} setPlayers={setPlayers}/>
                <div className={'makeGroupsWrap'}>
                    <GroupingSelect value={grouping} setValue={setGrouping} />
                    <div>
                        <label>
                            Распределить случайно:
                            <Switch checked={randomize} onChange={() => setRandomize(o => !o)} />
                        </label>
                    </div>
                    <Button variant={'outlined'} onClick={makeGroups} className={'makeGroups'} disabled={hasError}>
                        Сформировать группы {grouping} из {players.length} игроков
                    </Button>
                </div>
            </div>
            <div className={'col1'}>
                <PastePlayers setPlayers={setPlayers}/>
            </div>
        </div>
        <h2 className={'groupListAdd'}>
            <Add onClick={addBlankPlayerGroup} className={'clickable'} titleAccess={'Добавить группу'} />
            Группы
        </h2>
        <GroupList groups={playerGroups} setGroups={setGroups}/>
        <ExportPlayersText playerGroups={playerGroups}/>
    </PageContainer>
  );
};

export default TeamBuildPage;
