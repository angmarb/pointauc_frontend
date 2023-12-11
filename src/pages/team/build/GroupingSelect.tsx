import {MenuItem, Select} from '@material-ui/core';
import React, {useState} from 'react';
import {getInitState} from './ls';
export enum Grouping {
    duel = '1x1',
    groupBy2 = '2x2',
    groupBy3 = '3x3',
    groupBy4 = '4x4'
}

function init() {
    return getInitState()?.grouping ?? Grouping.duel;
}

export function useGrouping() {
  const [grouping, setGrouping] = useState<Grouping>(init);
  return {
      grouping, setGrouping
  };
}

export function getGroupSize(g: Grouping): number {
    switch (g) {
        case Grouping.duel:
            return 1;
        case Grouping.groupBy2:
            return 2;
        case Grouping.groupBy3:
            return 3;
        case Grouping.groupBy4:
            return 4;
    }
}

const allOptions = Object.values(Grouping);

interface Props {
    value: Grouping;
    setValue(newValue: Grouping): void;
}

const GroupingSelect = ({value, setValue}: Props) => {
    return (
        <label>
            Группы:
            <Select
                className={'groupingSelect'}
                value={value}
                onChange={(e) => setValue(e.target.value as Grouping)}
            >
                {allOptions.map((o, i) => (
                    <MenuItem value={o} key={i}>
                        {o}
                    </MenuItem>
                ))}
            </Select>
        </label>
    )
};

export default GroupingSelect;