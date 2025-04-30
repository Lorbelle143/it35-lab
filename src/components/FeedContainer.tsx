import { useState, useEffect } from 'react';
import {
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButton, IonInput, IonLabel, IonModal, IonFooter, IonCard,
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonAlert, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon, IonPopover
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      if (!error) setPosts(data as Post[]);
    };
    fetchUser();
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!postContent || !user || !username) return;
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();
    if (userError) return;

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';
    const { data, error } = await supabase
      .from('posts')
      .insert([{ post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (!error && data) {
      setPosts([data[0] as Post, ...posts]);
    }

    setPostContent('');
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');
    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <IonContent
  style={{
    '--background': 'url(https://tse3.mm.bing.net/th?id=OIP.sZuTjUmOamt28Sz3EWgg5gHaEG&pid=Api&P=0&h=180)',  // Use the URL of your background image
    backgroundSize: 'cover',  // Makes the image cover the entire area
    backgroundPosition: 'center center',  // Centers the image
    backgroundAttachment: 'fixed',  // Keeps the image fixed during scroll
  }}
>
  {user ? (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle style={{ fontFamily: 'Poppins', fontSize: '1.2rem', fontWeight: '500' }}>
            Create Post
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput
            value={postContent}
            onIonChange={e => setPostContent(e.detail.value!)}
            placeholder="Write a post..."
            style={{
              fontFamily: 'Poppins',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '10px',
                backgroundColor: 'transparent',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IonButton
              onClick={createPost}
              color="primary"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: '0.95rem',
                borderRadius: '10px',
                padding: '8px 20px',
                backgroundColor: 'transparent',
              }}
            >
              Post
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>

      {/* Your posts display */}
      {posts.map(post => (
        <IonCard key={post.post_id} style={{ marginTop: '2rem', backgroundColor: 'transparent', boxShadow: 'none' }}>
          <IonCardHeader>
            <IonRow>
              <IonCol size="1.85">
                <IonAvatar>
                  <img alt={post.username} src={post.avatar_url} />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonCardTitle style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '1.1rem', color: '#ffffff' }}>
                  {post.username}
                </IonCardTitle>
                <IonCardSubtitle style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: '#cccccc' }}>
                  {new Date(post.post_created_at).toLocaleString()}
                </IonCardSubtitle>
              </IonCol>
              <IonCol size="auto">
                <IonButton fill="clear" onClick={(e) => setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })}>
                  <IonIcon color="secondary" icon={pencil} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardHeader>

          <IonCardContent>
            <IonText style={{ fontFamily: 'Poppins', fontSize: '1rem', lineHeight: '1.5', color: '#f0f0f0', backgroundColor: 'transparent' }}>
              <p>{post.post_content}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  ) : (
    <IonLabel>Loading...</IonLabel>
  )}
</IonContent>


        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar color="light">
              <IonTitle style={{ fontFamily: 'Poppins' }}>Edit Post</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonInput
              value={postContent}
              onIonChange={e => setPostContent(e.detail.value!)}
              placeholder="Edit your post..."
              style={{
                fontFamily: 'Poppins',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '10px',
                backgroundColor: 'transparent',
              }}
            />
          </IonContent>
          <IonFooter style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <IonButton onClick={savePost} color="success">Save</IonButton>
            <IonButton onClick={() => setIsModalOpen(false)} color="medium">Cancel</IonButton>
          </IonFooter>
        </IonModal>

        <IonAlert
          isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header="Success"
          message="Post updated successfully!"
          buttons={['OK']}
        />
    </>

  );
};

export default FeedContainer;
