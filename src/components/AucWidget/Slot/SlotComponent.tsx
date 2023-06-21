import React, { memo } from 'react';
import { OutlinedInput } from '@material-ui/core';
import './Slot.scss';
import { useTranslation } from 'react-i18next';
import { Slot } from '../../../models/slot.model';

const SlotComponent: React.FC<Slot> = ({  amount, name }) => {
  const { t } = useTranslation();

  return (
    <>
      <OutlinedInput
        className="widget-slot-name widget-slot-input"
        placeholder={t('auc.lotName')}
        value={name}
        disabled={true}
      />
      <OutlinedInput
        className="widget-slot-money widget-slot-input"
        placeholder={t('common.currencySign')}
        type="number"
        value={amount}
        disabled={true}
      />
    </>
  );
};

export default memo(SlotComponent);
