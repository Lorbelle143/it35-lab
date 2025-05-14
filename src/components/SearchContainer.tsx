import React, { useState } from 'react';
import {
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonText,
  IonIcon,
  IonButton,
  IonBadge,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { close } from 'ionicons/icons';

interface UtilityItem {
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  type?: string;
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
    { name: 'Outage Report Logging', status: 'Pending' },
    { name: 'Customer Complaint Resolution', status: 'In Progress' },
    { name: 'Schedule Equipment Maintenance', status: 'Pending' },
    { name: 'Energy Consumption Audit', status: 'Completed' },
    { name: 'Network Signal Check', status: 'In Progress' },
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
              onIonInput={(e) => setSearchText(e.detail.value!)}
              placeholder="Search utility tasks..."
              debounce={300}
              style={{ flex: 1 }}
            />
            {searchText && (
              <IonButton fill="clear" size="small" onClick={clearSearch}>
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
                <h2 style={{ fontWeight: 'bold', fontSize: '1rem' }}>{item.name}</h2>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>
                  Status: <IonBadge color={getBadgeColor(item.status)}>{item.status}</IonBadge>
                </p>
              </IonLabel>
            </IonItem>
          ))
        ) : (
          <IonText color="medium" className="ion-padding">
            No matching utility tasks found.
          </IonText>
        )}
      </IonList>
    </IonContent>
  );
};

export default UtiliTrackSearch;
