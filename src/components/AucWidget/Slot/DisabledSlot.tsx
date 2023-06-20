import React, { useRef } from 'react';
import './Slot.scss';
import { Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';
import classNames from 'classnames';
import SlotComponent from './SlotComponent';
import { Slot } from '../../../models/slot.model';
import { RootState } from '../../../reducers';

interface DroppableSlotProps extends Slot {
  index: number;
}

const DisabledSlot: React.FC<DroppableSlotProps> = ({ index, ...slotProps }) => {
  const { background } = useSelector((root: RootState) => root.aucSettings.settings);

  const slotElement = useRef<HTMLDivElement>(null);

  const slotWrapperClasses = classNames('slot-wrapper', { 'custom-background': background });

  return (
    <div
      className={slotWrapperClasses}
    >
      <div className="slot" ref={slotElement}>
        <Typography className="slot-index">{`${index}.`}</Typography>
        <SlotComponent {...slotProps} />
      </div>
    </div>
  );
};

export default DisabledSlot;
