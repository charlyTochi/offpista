import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {collection, getDocs} from 'firebase/firestore';
import {ICONS} from '../../utils/Icons';
import CustomText from '../../components/CustomText';
import {COLORS} from '../../utils/Colors';
import {db} from '../../firebase/firebaseConfig';
const {width, height} = Dimensions.get('window');

interface VideoItem {
  id: string;
  url: string;
  title: string;
  description: string;
}

const ShortsScreen = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<Array<any>>([]);

  // Fetch videos from Firebase
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const fetchedVideos: VideoItem[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as VideoItem[];
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Detect visible items & update playing video
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any[]}) => {
      if (
        viewableItems.length > 0 &&
        typeof viewableItems[0].index === 'number'
      ) {
        const newIndex = viewableItems[0].index;

        if (newIndex !== playingIndex) {
          // Reset the previous video
          if (playingIndex !== null && videoRefs.current[playingIndex]) {
            videoRefs.current[playingIndex].seek(0); // Restart previous video
          }

          // Update playing index
          setPlayingIndex(newIndex);

          // Reset the new video
          setTimeout(() => {
            if (videoRefs.current[newIndex]) {
              videoRefs.current[newIndex].seek(0); // Restart new video
            }
          }, 100); // Delay ensures ref is assigned before seeking
        }
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderItem = ({item, index}: {item: VideoItem; index: number}) => (
    <View style={styles.container}>
      {/* Video Background */}

      <Video
        ref={ref => (videoRefs.current[index] = ref)}
        source={{uri: item?.url}}
        style={styles.video}
        resizeMode="cover"
        repeat
        playInBackground={false}
        playWhenInactive={false}
        paused={playingIndex !== index}
      />

      {/* Right Sidebar Icons */}
      <View style={styles.rightSidebar}>
        <TouchableOpacity>
          {ICONS.loveIcon}
          <CustomText style={styles.iconText}>11.5K</CustomText>
        </TouchableOpacity>
        <TouchableOpacity>
          {ICONS.forwardIcon}
          <CustomText style={styles.iconText}>312</CustomText>
        </TouchableOpacity>
        <TouchableOpacity>
          {ICONS.favoriteIcon}
          <CustomText style={styles.iconText}>20</CustomText>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <CustomText weightType="bold" style={styles.title}>
          {item.title}
        </CustomText>
        <CustomText
        truncateAt={80}
          style={styles.description}>
          {item.description}
        </CustomText>
        <TouchableOpacity style={styles.watchButton}>
          <CustomText style={styles.watchButtonText}>▶ Watch Now</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      snapToInterval={height} // Ensure each video takes up full screen
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      initialNumToRender={2}
      maxToRenderPerBatch={3}
      windowSize={5}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      removeClippedSubviews={false} // Ensures smooth rendering
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: COLORS.secondary,
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  rightSidebar: {
    position: 'absolute',
    gap: 20,
    right: 7,
    bottom: 90,
    alignItems: 'center',
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
    right: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
  },
  description: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
  },
  watchButton: {
    backgroundColor: '#F30745',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: width * 0.6,
    alignItems: 'center',
  },
  watchButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default ShortsScreen;
