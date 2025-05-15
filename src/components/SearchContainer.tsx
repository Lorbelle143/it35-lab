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
  IonCardContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { close } from 'ionicons/icons';

interface UtilityItem {
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

const UtiliTrackSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState<UtilityItem | null>(null);

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

  // When item clicked, show details view
  const handleItemClick = (item: UtilityItem) => {
    setSelectedItem(item);
  };

  // Back button in detail view goes back to search list
  const handleBack = () => {
    setSelectedItem(null);
  };

  if (selectedItem) {
    // Detail View
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleBack}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Task Details</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <IonText>
                <h2>{selectedItem.name}</h2>
                <p>Status: <IonBadge color={getBadgeColor(selectedItem.status)}>{selectedItem.status}</IonBadge></p>
                <p>This is the detailed content about <b>{selectedItem.name}</b>.</p>
              </IonText>
            </IonCardContent>
          </IonCard>
          <IonButton expand="block" onClick={handleBack}>
            Back to Search
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  // Search List View
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
            <IonItem button key={index} onClick={() => handleItemClick(item)}>
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
