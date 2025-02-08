import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import {collection, getDocs} from 'firebase/firestore';
import {ICONS} from '../../utils/Icons';
import CustomText from '../../components/CustomText';
import {COLORS} from '../../utils/Colors';
import {db} from '../../firebase/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

interface VideoItem {
  id: string;
  url: string;
  title: string;
  description: string;
  likes: string;
  forward_count: number
  favorite: number
}

interface Props {
  navigation: any;
  route: {
    params?: {
      videoId?: string;
      startTime?: number;
      videoUrl?: string;
    };
  };
}

const ShortsScreen = ({route, navigation}: Props) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState<{[key: string]: boolean}>({});
  const videoRefs = useRef<Array<any>>([]);
  const flatListRef = useRef<FlatList>(null);
  const hasSeekPerformed = useRef(false);

  // Add back viewability configuration
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 100,
  }).current;

  const onViewableItemsChanged = useRef(({viewableItems}: {viewableItems: any[]}) => {
    if (viewableItems.length > 0 && typeof viewableItems[0].index === 'number') {
      const newIndex = viewableItems[0].index;
      setPlayingIndex(newIndex);

      // Preload adjacent videos
      if (videoRefs.current[newIndex + 1]) {
        videoRefs.current[newIndex + 1].seek(0);
      }
      if (videoRefs.current[newIndex - 1]) {
        videoRefs.current[newIndex - 1].seek(0);
      }
    }
  }).current;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const fetchedVideos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as VideoItem[];
        setVideos(fetchedVideos);

        if (route.params?.videoId) {
          const initialIndex = fetchedVideos.findIndex(
            video => video.id === route.params?.videoId
          );
          if (initialIndex !== -1) {
            setPlayingIndex(initialIndex);
            // Use requestAnimationFrame for smoother initial scroll
            requestAnimationFrame(() => {
              flatListRef.current?.scrollToIndex({
                index: initialIndex,
                animated: false,
              });
            });
          }
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [route.params?.videoId]);

  // Add cleanup when screen is unfocused
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Pause all videos when leaving screen
      setPlayingIndex(null);
      // Reset all video positions
      videoRefs.current.forEach(ref => {
        if (ref) {
          ref.seek(0);
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item, index}: {item: VideoItem; index: number}) => {
    const isCurrentlyPlaying = playingIndex === index;
    const isInitialVideo = item.id === route.params?.videoId;
    const shouldLoad = Math.abs((playingIndex || 0) - index) <= 1; // Only load adjacent videos

    return (
      <View style={styles.container}>
        {shouldLoad && (
          <Video
            ref={ref => {
              videoRefs.current[index] = ref;
              // Set initial position for the selected video
              if (
                ref &&
                isInitialVideo &&
                !hasSeekPerformed.current &&
                typeof route.params?.startTime === 'number'
              ) {
                ref.seek(route.params.startTime);
                hasSeekPerformed.current = true;
              }
            }}
            source={{
              uri: isInitialVideo && route.params?.videoUrl 
                ? route.params.videoUrl 
                : item.url
            }}
            style={styles.video}
            resizeMode="contain"
            repeat={true} // Enable loop for each video
            playInBackground={false}
            playWhenInactive={false}
            paused={!isCurrentlyPlaying}
            muted={false}
            onBuffer={({isBuffering}) => {
              setIsBuffering(prev => ({...prev, [item.id]: isBuffering}));
            }}
            onError={error => console.warn('Video error:', error)}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            maxBitRate={Platform.OS === 'android' ? 2000000 : undefined}
          />
        )}
        {isBuffering[item.id] && (
          <View style={styles.bufferingContainer}>
            <ActivityIndicator color="white" size="large" />
          </View>
        )}
        <View style={styles.overlay}>
          {/* Right Sidebar Icons */}
          <View style={styles.rightSidebar}>
            <TouchableOpacity style={styles.iconButton}>
              {ICONS.loveIcon}
              <CustomText style={styles.iconText}>{item.likes}</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favIcon}>
              {ICONS.forwardIcon}
              <CustomText style={styles.iconText}>{item.favorite}</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fav2Icon}>
              {ICONS.favoriteIcon}
              <CustomText style={styles.iconText}>{item.forward_count}</CustomText>
            </TouchableOpacity>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <CustomText weightType="bold" style={styles.title}>
              {item.title}
            </CustomText>
            <CustomText truncateAt={60} numberOfLines={3} style={styles.description}>
              {item.description}
            </CustomText>
            <TouchableOpacity style={styles.watchButton}>
              <CustomText style={styles.watchButtonText}>
                ▶ Watch Now
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={videos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'android'}
      maxToRenderPerBatch={3}
      windowSize={5}
      initialNumToRender={2}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      onScrollToIndexFailed={info => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({
            index: info.index,
            animated: false,
          });
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: COLORS.secondary,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightSidebar: {
    position: 'absolute',
    right: 10,
    bottom: 90,
    alignItems: 'center',
    zIndex: 2,
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  favIcon: {
    alignItems: 'center',
  },
  fav2Icon: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  iconText: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 90,
    left: 10,
    right: 70, // Give space for the right sidebar
    zIndex: 1,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
  description: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  watchButton: {
    backgroundColor: '#F30745',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: width * 0.5,
    alignItems: 'center',
  },
  watchButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default ShortsScreen;
