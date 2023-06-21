import React, {useEffect, useState} from 'react';
import SaveLoadService from '../../services/SaveLoadService';
import {Slot} from '../../models/slot.model';
import './AucWidget.scss';
import {Grid} from '@material-ui/core';
import PageContainer from '../PageContainer/PageContainer';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import DisabledSlot from './Slot/DisabledSlot';

const AucWidget = () => {
    const [slots, setSlots] = useState<Slot[]>([]);
    useEffect(() => {
        const _slots = SaveLoadService.getSlots('Автосохранение');
        if (_slots) {
            setSlots(_slots);
        }
        const listener = (e: StorageEvent) => {
            console.log(e);
            if (e.key === 'saveConfig') {
                const _slots = SaveLoadService.getSlots('Автосохранение');
                if (_slots) {
                    setSlots(_slots);
                }
            }
        };
        window.addEventListener('storage', listener);
        return () => {
            window.removeEventListener('storage', listener);
        }
    }, []);
      const { background } = useSelector((root: RootState) => root.aucSettings.settings);
      const backgroundStyles = {
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
          padding: 0,
      };

    return (
        <PageContainer className="widget-slots" style={backgroundStyles} maxWidth={false}>
            <div className="widget-view">
              {slots.map((slot, index) => (
                <Grid key={slot.id} item xs={12}>
                  <DisabledSlot index={index + 1} {...slot} />
                </Grid>
              ))}
            </div>
        </PageContainer>
    );
};

export default AucWidget;