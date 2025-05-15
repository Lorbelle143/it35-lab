import React, { useState } from 'react';
import {
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonIcon,
  IonBadge,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { close } from 'ionicons/icons';

interface UtilityItem {
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

const UtiliTrackSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const items: UtilityItem[] = [
    { name: 'Electric Meter Reading', status: 'Completed' },
    { name: 'Water Meter Inspection', status: 'In Progress' },
    { name: 'Gas Line Monitoring', status: 'Pending' },
    { name: 'Power Line Maintenance', status: 'Completed' },
    { name: 'Water Leak Detection', status: 'In Progress' },
    { name: 'Transformer Health Check', status: 'Pending' },
    { name: 'Utility Pole Survey', status: 'Completed' },
    { name: 'Fuel Usage Report', status: 'Pending' },
    { name: 'Battery Backup Check', status: 'In Progress' },
    { name: 'Smart Grid Sync', status: 'Completed' },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const clearSearch = () => setSearchText('');

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Pending':
        return 'medium';
      default:
        return 'light';
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonCard>
        <IonCardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IonSearchbar
              value={searchText}
              onIonInput={(e) => setSearchText(e.detail.value ?? '')}
              placeholder="Search utility tasks..."
              debounce={200}
              style={{ flex: 1 }}
            />
            {searchText && (
              <IonButton fill="clear" onClick={clearSearch}>
                <IonIcon icon={close} />
              </IonButton>
            )}
          </div>
        </IonCardContent>
      </IonCard>

      <IonList>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{item.name}</h2>
                <p>
                  Status:{' '}
                  <IonBadge color={getBadgeColor(item.status)}>{item.status}</IonBadge>
                </p>
              </IonLabel>
            </IonItem>
          ))
        ) : (
          <IonText className="ion-padding" color="medium">
            No matching tasks found.
          </IonText>
        )}
      </IonList>
    </IonContent>
  );
};

export default UtiliTrackSearch;
